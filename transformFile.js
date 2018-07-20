const fs = require('fs');
const acorn = require('acorn');
const path = require('path');
const jsBeautify = require('js-beautify').js;

const transformFile = function(path){
    let codeStr = fs.readFileSync(path, 'utf-8');
    let codeAst = acorn.parse(codeStr);
    
    let expressionArgs = codeAst.body[0].expression.arguments;
    let depPaths = expressionArgs[0].elements.map(node => node.value);
    let depNames = expressionArgs[1].params.map(node => node.name);

    /**commonJs依赖声明 */
    let depDeclear = depNames.map((depName, index) => `var ${depName} = require('${depPaths[index]}');`).join('\n');

    /**获取模块代码 */
    var moduleFuncBody;
    eval(
    `
    function define(deps, func){
        moduleFuncBody = func.toString();
    };
    const NEJ = {
        define
    };
    ${codeStr}`);
    
    let childStatements = acorn.parse(`(${moduleFuncBody})`).body[0].expression.body.body;
    let returnStatement = childStatements.find(node => node.type === 'ReturnStatement');

    /**替换return语句 */
    let {start, end} = returnStatement;
    moduleFuncBody = moduleFuncBody.slice(0, start - 1) + `module.exports = ${returnStatement.argument.name};` + moduleFuncBody.slice(end);
    let moduleBody = moduleFuncBody.substring(moduleFuncBody.indexOf("{") + 1, moduleFuncBody.lastIndexOf("}"));

    /**生成最终代码 */
    fs.writeFileSync('./test.js', jsBeautify(depDeclear + moduleBody));
};

module.exports = transformFile;