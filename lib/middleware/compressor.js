//compress middleware
//compress code by UglifyJS
var minify = require('uglify-js').minify;


//compress option
var option = { fromString: true }; //compress from code string(default from file


//main
module.exports = function compressor(module, next) {
    //get compress swtich
    var toCompress = typeof module.compress === 'boolean'
                        ? module.compress
                        : this.config.compress ;
    
    //pass compressed js file
    if (module.path.slice(-7) === '-min.js') {
        toCompress = false;
    }

    //compress code
    if (toCompress) {
        module.code = minify(module.code, option).code;
    }

    next(module);
};
