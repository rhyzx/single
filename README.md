SingleJS
========

Build modules into **single** js for browser running.


Introduce
---------

If you use [nodejs](http://nodejs.org/), you already know how to export and require modules.

Only you need to learn is how to build these modules using singlejs.




Install
-------

Install singlejs by npm

    $ npm install -g single



Quick Start
-----------

File structs
```
./
├── lib/
│   └── tool.js
├── test.html
├── test.js
└── [others.js]
```


*tool.js*
```js
exports.square = function(num) {
    return num * num;
};
```


*test.js*
```js
var tool = require('./lib/tool');
document.write('success: 2*2 = ' + tool.square(2));
```


Build!
```sh
$ single index.js lib/*.js --main test.js -o build.js
```


Use `build.js` in `test.html`
```html
<script src="build.js"></script>
<!-- results: "success: 2*2 = 4" -->
```


Features
--------

- [CommonJS Modules/1.1.1 Spec](http://wiki.commonjs.org/wiki/Modules/1.1.1) implemented
- Watch mode(real-time update when files changed
- Build in compress(use [UglifyJS](https://github.com/mishoo/UglifyJS2)
- Asterisker path support(eg. `{ "path": "lib/*.js", "alias": "*" }`
- Exports compatible with CommonJS module/AMD module/Standard &lt;script&gt;
- Really **light weight**


Usage
-----

```
Usage: single [options] [ -o build.js ] files.js..
   or: single [options] [ -o build.js ] -i single.json

Options:
  --main            absolute path or alias of module to exports
                                                   [string]  [default: "single"]
  --name            exports main module with specified name(for window.name or
                    AMD define), equal to {main} if not set             [string]
  --outfile, -o     Place output in file, equal to {name} if not set    [string]
  --input-file, -i  Define options and file list in a json file
                    Use "single.json" when no files inputed
                                              [string]  [default: "single.json"]
  --watch, -w       Watch mode                       [boolean]  [default: false]
  --compress, -x    Compress with UglifyJS           [boolean]  [default: false]
  --charset         Charset of files                 [string]  [default: "utf8"]
  --version         Print version                                      [boolean]
  --help, -h        Print help                                         [boolean]
```

Input file
----------

**example**

*single.json*

```js
{
  "name"    : "my-tool",
  "main"    : "index",
  "compress": true,
  "charset" : "utf8",
  "watch"   : true,
  "modules" : [
    { "path": "lib/jquery-1.8.2-min.js", "alias": "jquery", "compress": false },
    { "path": "lib/underscore.js"},
    { "path": "page/*.js", "alias": "page-*"}
  ]
}
```

run `$ single`


Documentation(Client)
---------------------

### single(path), single.require(path)

Return a module with specified path or alias.
Throw an Error if not exist.

ps. It's a default module in `build.js`, if you don't set `--main` and `--name`,
SingleJS will export it as main with name "single"(`window.single`), so you can `single.require()` other 
moudles in `build.js`.



License
-------

See [LICENSE](https://github.com/rhyzx/single/blob/master/LICENSE "License") file.

> Copyright (c) 2012 rhyzx
