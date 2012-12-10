//main
var single  = exports
  , fs      = require('fs')
  , ps      = require('path')
  , template= require('./lib/template')
;

    //default config
var config  = {
        charset : 'utf8'
      , output  : false
      , compress: false //compress use uglifyJS
    //,   
    }

    //modules' code map: path for key, code for value
  , codes   = {}
    
    //alias of modules' path
  , aliases   = {}
;


//read orignal codes
function loadCodes(paths, charset) {
    for (var i=0, path; path=paths[i++];) {
        if (path in codes) continue;

        if (!fs.existsSync(path)) { //check file exists
            console.error('file not found: ' +path);
            codes[path] = undefined;
            continue;
        }

        codes[path] = fs.readFileSync(path, charset);
    }
}


//get all module's normalized path and set aliases
var winSep = /\\\\/g, isWin = winSep.test(ps.sep);
function getPaths(modules) {
    var paths = [], path;
    for (var i=0, module; module=modules[i++];) {
        path = ps.normalize(module.path);

        //replace windows style path separator to *nix
        if (isWin) {
            path = path.replace(winSep, '/');
        }

        paths.push(path);

        //set module alias
        if (module.alias) {
            aliases[module.alias] = path;
        }
    }
    return paths;
}


//write or print final code
function output(charset, output) {
    //for watch mode output
    //Write file
    var result = template.render(codes, aliases, single.version);

    if (typeof output === 'string') { //output to file
        fs.writeFile(output, result, function() {
            console.log('combine success: ' +output);
        });
    } else { //just print the result
        console.log(result);
    }
}



/**
 * Main API
 * @param {Array}   modules     : module list {"path": "path of file" [,"alias": "alias for this module"]} //TODO compress conf of single file?
 * @param {Object}  userConfig  : combine config
 */
function combine(modules, userConfig) {
    var charset = userConfig.charset || config.charset
      , paths   = getPaths(modules)
    ;

    loadCodes(paths, charset);
    output(charset, userConfig.output);
}


//exports
single.version = require('./package.json').version;
single.combine = combine;
single.config  = config; //expose default config
