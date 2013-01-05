/*!
 * SingleJS
 * https://github.com/rhyzx/single
 */

//middleware lib
var next = require('./next');


//push middlewares in executor
var process =  
   next(require('./middleware/starter'))
  .next(require('./middleware/asterisker'))
  .next(require('./middleware/pather'))
  .next(require('./middleware/watcher'))
  .next(require('./middleware/loader'))
  .next(require('./middleware/compressor'))
  .next(require('./middleware/writer'))
;

//default combine config
var defaultConfig = {
    compress    : false
  , charset     : 'utf8'
  , outfile     : false
  , watch       : false
};


/**
 * Single API
 *
 * @param {Array}   modules : [{ //@required: module list
 *          "path"      : "lib/tool.js" //@required: filepath of this module
 *        , "alias"     : "tool"        //alias of this module for require
 *        , "compress"  : true|false    //whether compress this module
 *        , "charset"   : "utf8"        //charset of this file
 *      }, ... ] 
 *
 * @param {Object}  config  : {  //combine config
 *          "outfile"   : "script.js"   //@recommand: write result to a file
 *        , "compress"  : true|false    //whether compress
 *        , "charset"   : "utf8"        //charset of files and to output
 *      }
 */
function combine(modules, config) {
    //pass config
    config          = config            || {};
    config.compress = config.compress   || defaultConfig.compress;
    config.charset  = config.charset    || defaultConfig.charset;
    config.outfile  = config.outfile    || defaultConfig.outfile;
    config.watch    = config.watch      || defaultConfig.watch;

    //data for middlewares using
    var data = {
        modules : modules || []
      , config  : config
      , codes   : {} //final code map for ouputing
      , aliases : {} //final alias map for ouputing
      , waiting : 0  //for writer, guarantee all middleware is finished
    };

    //go!
    process.call(data);
}


//export
exports.version = require('../package.json').version;
exports.combine = combine;
exports.config  = defaultConfig; //expose default config
