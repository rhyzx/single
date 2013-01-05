//code load middleware
var fs = require('fs');

module.exports = function loader(module, next) {
    var that = this;

    var charset = module.charset || that.config.charset;

    that.waiting++;
    fs.readFile(module.path, charset, function (err, code) {
        if (err) throw err;

        that.waiting--;
        module.code = code;
        next(module);
    });
};
