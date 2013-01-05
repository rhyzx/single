//start middleware

module.exports = function starter(next) {
    var modules = this.modules
      , len = modules.length
      , module
    ;

    this.waiting += len;
    for (var i=0; i<len; i++) {
        module = modules[i];

        this.waiting--;
        next(module);
    }

    if (this.config.watch) {
        console.log('Singlejs is watching...');
    }
};
