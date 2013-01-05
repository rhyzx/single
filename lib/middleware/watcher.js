//watch mode middleware
var fs = require('fs');

/* default option
var option = {
    persistent  : true,
    interval    : 5007 //default 5007, maybe too long
};
*/

module.exports = function watcher(module, next) {
    next(module);

    if (!this.config.watch) return;

    //start watch
    fs.watchFile(module.path, /*option, */function () {
        console.log('file "' +module.path +'" updated');
        next(module);
    });
};

//TODO watch asterisker path's dir
