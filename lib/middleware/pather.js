//path normalize middleware
var ps = require('path')
  , fs = require('fs')
;

//path seperator of windows
var winSep = /\\\\/g, isWin = winSep.test(ps.sep);

module.exports = function pather(module, next) {
    var path = ps.normalize(module.path); //normalize path (resolve ../.

    //replace windows style path separator to *nix
    if (isWin) path = path.replace(winSep, '/');

    module.path = path;

    //TODO default extension .js check
    /*fs.exists(path, function (flag) {
        fs.exist
    });*/

    next(module);
};
