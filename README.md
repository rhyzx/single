SingleJS
========

combine modules into **single** js for browser running


Introduce
---------

If you use [nodejs](http://nodejs.org/), you already know how to export and require modules.

Only you need to learn is how to combine these modules using singlejs.




Install
-------

Install singlejs by npm

    $ npm install -g single



Quick Start
-----------

File structs

    ./
    ├── lib/
    │   └── tool.js
    ├── index.html
    ├── index.js
    └── [others.js]


`tool.js`

    exports.square = function(num) {
        return num * num;
    };


`index.js`

    var tool = require('./lib/tool');
    exports.test = function() {
        console.log('success: 2*2 = ' + tool.square(2));
    };


Combine it!

    $ singlec index.js lib/*.js -o script.js


Use the combined js in html `index.html`

    <script src="script.js"></script>
    <script>
        var index = require('index');
        index.test(); //log 'success'

        //require('others'); //other page use
        //require('lib/tool'); //tool.js is also available
    </script>



Features
--------

- [CommonJS Modules/1.1.1 Spec](http://wiki.commonjs.org/wiki/Modules/1.1.1) implemented
- Watch mode(real-time update when files changed
- Build in compress(use [UglifyJS](https://github.com/mishoo/UglifyJS2)
- Asterisker path support(eg. `{ "path": "lib/*.js", "alias": "*" }`
- Really **light weight**
- and...?


Usage
-----

    Usage: singlec [options] [ -o script.js ] files.js..
       or: singlec [options] [ -o script.js ] -i single.json

    Options:
      -o, --outfile <file> place output in file
      -i, --input <file>   define options and module list in a json
                           default use single.json as input if exist
      -w, --watch          watch mode
      -x, --compress       compress with UglifyJS
      --charset <string>   file\'s charset, default utf8

      -v, --version        print version
      -h, --help           print help'

Input file
----------

**example**

`single.json`

    {
      "outfile" : "script.js",
      "compress": true,
      "charset" : "utf8",
      "watch"   : true,
      "modules" : [
        { "path": "lib/jquery-1.8.2-min.js", "alias": "jquery", "compress": false },
        { "path": "lib/underscore.js"},
        { "path": "page/*.js", "alias": "page-*"}
      ]
    }

run `$ singlec`


UPCOMING
---------

 - combine and export main module as a normal script(eg. `singlec deps/*.js util.js --main util -o util.js`
 - input file reloader


License
-------

See [LICENSE](https://github.com/rhyzx/single/blob/master/LICENSE "License") file.

> Copyright (c) 2012 rhyzx
