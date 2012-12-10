SingleJS
========

combine modules into **single** js for browser running


Introduce
---------

If you use [nodejs](http://nodejs.org/), you already know how to define and use modules.

Only one you need to learn is how to combine these modules using singlejs.




Install
-------

Install singlejs by npm

    $ npm install -g single



Quick Start
-----------

File structs

	./
    |- lib/
    |	|- tool.js
    |
	|- index.html
    |- index.js
    |- [others.js]


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

- CommonJS Modules/1.1.1 specification implemented
- Really **light weight**
- Watch mode
- and...?


Documention
-----------

Bala bala...



License
-------

See [LICENSE](https://github.com/rhyzx/single/blob/master/LICENSE "License") file.

> Copyright (c) 2012 rhyzx
