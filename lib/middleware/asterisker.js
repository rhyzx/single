//path asterisk support middleware
var ps      = require('path')
  , fs      = require('fs')
;

module.exports = function asterisker(module, next) {
    var parts = ps.basename(module.path).split('*');

    //no * exists
    if (parts.length < 2) {
        next(module);
        return;
    }

    if (parts.length > 2) {
        console.error(module.path +': only one * is supported now');
        return;
    }

    var head    = parts[0]
      , tail    = parts[1]
      , start   = head.length //start position of "*"
      , end //end position of "*", to be calculated
    ;

    // * support for alias
    var aparts   = (module.alias || '').split('*')
      , hasAlias = (aparts.length === 2);
    ;

    var dir  = ps.dirname(module.path);
    var files = fs.readdirSync(dir);
    var matches = [];

    for (var i=0, len=files.length, file; i<len; i++) {
        file = files[i];

        //calculate end pos of "*"
        end = file.length - tail.length;

        //matching file
        if (
            end < start || //matching length
            file.slice(0, start) !== head || //matching head
            file.slice(end) !== tail //matching tail
        ) continue;

        //file is matched
        matches.push(file);
    }

    var len = matches.length; this.waiting += len;
    for (var i=0, file; i<len; i++) {
        this.waiting--;

        //create new instance of module
        var newModule = Object.create(module);

        //set path
        newModule.path = ps.join(dir, file);

        //set alias
        newModule.alias = hasAlias ? aparts.join(file.slice(start, end)) : undefined;

        next(newModule);
    }
};
