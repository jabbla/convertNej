const convertConfig = require('./convertConfig.js');
const path = require('path');
const Resolver = {};

const nejDefaultAlias = {
    lib: convertConfig.nejPathConfig.defineJs,
    pro: path.resolve(convertConfig.root, '../javascript/'),
    platform: path.resolve(convertConfig.nejPathConfig.defineJs, './base/platform'),
    base: path.resolve(convertConfig.nejPathConfig.defineJs, './base'),
    ui: path.resolve(convertConfig.nejPathConfig.defineJs, './ui'),
    util: path.resolve(convertConfig.nejPathConfig.defineJs, './util')
};

Resolver.do = function(nejPath, curModulePath){
    let sourcePath = Resolver.parseNejPath(nejPath, curModulePath);
    return sourcePath;
};

Resolver._isAliasPath = function(pathStr){
    let {dir} = path.parse(pathStr);

    return !/^(\.)|(\.\.)/.test(dir)
};

Resolver._deleteFirstSection = function(pathStr){
    let index = pathStr.indexOf('/');

    return pathStr.slice(index + 1);
};

Resolver.parseNejPath = function(nejPath, curModulePath){
    let result;
    /**nej路径解析 */
    if(this._isAliasPath(nejPath)){
        let {dir} = path.parse(nejPath);
        let root = convertConfig.root;
        let customNejPathConfig = convertConfig.nejPathConfig.custom;
        let rootPath = convertConfig.root;
        
        /**自定义别名 */
        for(let alias in customNejPathConfig){
            if(alias === dir){
                result = path.resolve(rootPath, customNejPathConfig[alias], this._deleteFirstSection(nejPath))
                return result;
            }
        }

        /**默认别名 */
        for(let alias in nejDefaultAlias){
            if(alias === dir){
                result = path.resolve(rootPath, nejDefaultAlias[alias], this._deleteFirstSection(nejPath))
                return result;
            }
        }
    }else{
        result = path.resolve(curModulePath, nejPath);
    }

    return result;
};





module.exports = Resolver;