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


/**
 * Single API
 * @param {Array}   modules : [{
 *          path        : "lib/tool.js"
 *        , alias       : "tool"
 *        , compress    : true
 *        , charset     : "utf8"
 *      }, ... ] 
 * @param {Object}  config  : {
 *          outfile     : "script.js"
 *        , watch       : true
 *        , compress    : true
 *        , charset     : "utf8"
 *      }
 */
function build(modules, config) {

    //data for middlewares using
    var data = {
        modules : modules || []
      , config  : config
      , codes   : {} //final code map for ouputing
      , aliases : {} //final alias map for ouputing
      , waiting : 0  //for writer, guarantee all middleware is finished

      , version : exports.version
    };

    //go!
    process.call(data);
}


//exports
module.exports  = exports.build = exports = build;
exports.version = require('../package.json').version;
