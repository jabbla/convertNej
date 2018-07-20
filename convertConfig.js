const path = require('path');

const sourceRootPath = path.resolve(__dirname, '../kaola_bi_portal/portal-web/src/main/webapp/src/javascript');
const targetRootPath = path.resolve(__dirname, './test/js');
const publicRootPath = path.resolve(__dirname, '../kaola_bi_portal/portal-web/src/main/webapp/');

const components2SourceRootPath = path.resolve(sourceRootPath, './components2');
const componentsTargetRootPath = path.resolve(targetRootPath, './components');

module.exports = {
    root: publicRootPath,
    nejPathConfig: {
        custom: {
            pro: 'src/javascript/',
            fedlib: 'src/javascript/lib/kaola-fed-lib/',
            nevPro: 'src/javascript/lib/nev/'
        },
        defineJs: 'src/javascript/lib/kaola-fed-lib/lib/nej/src/'
    },
    pathMaps: [
        {
            source: sourceRootPath,
            target: targetRootPath
        },
        {
            source: components2SourceRootPath,
            target: componentsTargetRootPath
        }
    ]
};