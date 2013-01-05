//Template for generating final code

var template = (function () {

//TEMPLATE START ##
/*! Modules combined by SingleJS */
;(function (root, modules, aliases, wrap) {
    root.require = wrap(modules, aliases);
})(this, {
//===============
//    Modules
//===============
//# var path,code; for (path in codes) { code=codes[path];
'{{path}}' : function module(require, exports) {
{{code}}
}, ///{{path}}

//# }
'single.js' : function module(require, exports) {
//default module 'single'
exports.version = '{{version}}';
} ///single.js
//===============
//  Modules end 
//===============
}, {


//===========
//   Alias
//===========
//# var path,alias; for (alias in aliases) { path=aliases[alias];
'{{alias}}' : '{{path}}',
//# }
'singlejs' : 'single.js' //default alias for single
//===========
// Alias end
//===========



/** singlejs */
}, function (modules, aliases, undefined) {
    "use strict";

    //core
    function require(path, cpath) {
        //resolved path
        var rpath = resolvePath(path, cpath);

        //default extension '.js' check
        if (!(rpath in modules) && !((rpath +='.js') in modules)) {
            throw new Error('Cannot find module "' +path +'"');
        }
        
        var module = modules[rpath];
        if (!('exports' in module)) {
            //module is never been required
            //initilize
            module.id = path;
            module.exports = {};
            module(function (path) {
                //wrapper require 
                //with current module's path binded
                return require(path, rpath);
            }, module.exports);
        }
        
        return module.exports;
    }


    //resolve module's real path
    function resolvePath(path, cpath) {
        //path is alias
        if (path in aliases) {
            //alias path is resolved
            return aliases[path];
        }

        //split path
        var parts = path.split('/');

        //whether path is relative to current path
        if (parts[0] === '.' || parts[0] === '..') {
            parts = (cpath || '').split('/').slice(0, -1).concat(parts);
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
        return newParts.reverse().join('/');
    }

    return require;
});
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
