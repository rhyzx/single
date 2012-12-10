//Template for generating final code

var template = (function () {

//TEMPLATE START ##
/**
 * Modules combined by SingleJS
 */
;(function (m, a, s, g) { s(m, a, g); })({
//===============
//    Modules
//===============
//#var path,code; for (path in codes) { code=codes[path];
'{{path}}': function module(require, exports) {
{{code}}
},///{{path}}
//#}
'single.js': function module(require, exports) {
//default module 'single'
exports.version = '{{version}}';
}///single.js
//===============
//  Modules end 
//===============
}, {

//===========
//   Alias
//===========
//#var path,alias; for (alias in aliases) { path=aliases[alias];
'{{alias}}': '{{path}}',
//#}
'singlejs': 'single' //default alias for single
//===========
// Alias end
//===========


/*!
 * SingleJS
 */
}, function (modules, alias, g, undefined) {
    //bind global
    g.require = require;
    
    //TODO if main, if module module.exports = main, else g[main] = main

    //core
    function require(path) {
        path = resolvePath(path, (require.caller || arguments.callee.caller).id || '');

        if (typeof path !== 'string') return; //TODO throw Error accroding to CommonJS spec
        
        var module = modules[path];
        if (!('exports' in module)) {
            module.id = path;
            module.exports = {};
            module(require, module.exports);
        }
        
        return module.exports;
    }


    //resolve module's real path
    function resolvePath(path, rpath) {
        //path is alias
        if (alias[path]) {
            return alias[path];
        }

        //split path
        var parts = path.split('/');

        //whether path is relative to rpath
        if (parts[0] === '.' || parts[0] === '..') {
            parts = rpath.split('/').slice(0, -1).concat(parts);
        }

        //resolve relative dir
        var updir = 0, newParts = [];
        for (var i=parts.length, part; i--;) {
            part=parts[i];

            if (part === '.') continue; //clear current dir
            if (part === '..') { updir++; continue; } //store updir
            if (updir) { updir--; continue; } //resolve updir

            newParts.push(part);
        }
        //restore unresolved updir 
        while (updir--) {
            newParts.push('..');
        }

        //join normalized path
        path = newParts.reverse().join('/');

        //default extension '.js' check
        if ((path in modules) || ((path +='.js') in modules)) {
            return path;
        }

        return null;
    }
}, window);
//(°ω°〃)single ## TEMPLATE END

}).toString().replace(/^[\w\W]*##\n?([\w\W]+)##[\w\W]*$/, '$1'); //extract code as string



//compile template
exports.render = new Function('codes', 'aliases', 'version', 
    "var S = '"+ template
        .replace(/\\/g, "\\\\") //escape \
        .replace(/'/g, "\\'") //escape '
        .replace(/\{\{(\w+)\}\}/g, "' +$1 +'") //variables
        .replace(/\/\/#(.+)\n/g, "'; $1 S+='") //statements
        .replace(/\n/g, "\\n")+ //escape cr
    "'; return S;"
);
