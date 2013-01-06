//compress middleware
//compress code by UglifyJS
var UglifyJS = require('uglify-js')
  , compress = UglifyJS.Compressor();


//print option
var option = {
    comments    : /^\!/ //preserve comments leading with !
  , max_line_len: 240   //break line
};


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
        var ast = UglifyJS.parse(module.code);

        //compress
        ast.figure_out_scope();
        ast = ast.transform(compress);

        //mangle variables name
        ast.figure_out_scope();
        //toplevel vars in module is safe for mangling
        ast.variables.each(function (v) {
            v.global = false;
        });
        ast.compute_char_frequency();
        ast.mangle_names();

        //print
        module.code = ast.print_to_string(option);
    }

    next(module);
};
