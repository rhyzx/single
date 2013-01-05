//write final code middleware
var fs = require('fs')
  , template = require('../template')
;

//single's version for ouput
var version = require('../../package.json').version;


module.exports = function writer(module, next) {
    // set/update code and alias map
    if (typeof module.code === 'string') {
        this.codes[module.path] = module.code;
    }
    if (typeof module.alias === 'string') {
        this.aliases[module.alias] = module.path;
    }
    
    //check all is ready
    if (this.waiting !== 0) return;

    //generate final code
    var result = template.render(this.codes, this.aliases, version)
      , outfile= this.config.outfile;


    //ouput path not defined, just print the result
    if (typeof outfile !== 'string') {
        console.log(result);
        return;
    }


    //file is writing, write again after finished
    if (this.isWriting) {
        this.changed = true;
        return;
    }

    //async write, check change after finished
    var that = this;
    (function write() {
        that.isWriting = true;
        that.changed   = false;

        fs.writeFile(outfile, result, function() {
            console.log('combine success: ' +outfile);

            //result is changed, write again
            if (that.changed) {
                process.nextTick(write);
                return;
            }

            that.isWriting = false;
        });
    })();


    //END, last middleware
    //next(module);
};
