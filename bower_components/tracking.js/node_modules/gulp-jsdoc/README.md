# gulp-jsdoc
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]  [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency Status][depstat-image]][depstat-url] [![Code Climate][codeclimate-image]][codeclimate-url]

> jsdoc plugin for [gulp](https://github.com/wearefractal/gulp)

TL;DR
-------------

Install `gulp-jsdoc` as a development dependency:

```shell
npm install --save-dev gulp-jsdoc
```

Then, use it:

```javascript
var jsdoc = require("gulp-jsdoc");

gulp.src("./src/*.js")
  .pipe(jsdoc('./documentation-output'))
```

API
-------------

### jsdoc.parser(infos, name)

```javascript
gulp.src("./src/*.js")
  .pipe(jsdoc.parser(infos, name))
  .pipe(gulp.dest('./somewhere'))
```

Will process any files it has been fed, and generate a new vinyl JSON usable by the generator to produce actual documentation.

By default, the filename is 'jsdoc.json' unless overriden by the name parameter.

Note that if you feed the parser a README.md file, this file will be rendered and used as a long description for your package.

eg:

```javascript
gulp.src(["./src/*.js", "README.md"])
  .pipe(jsdoc.parser(infos, name))
  .pipe(gulp.dest('./somewhere'))
```

The optional infos parameter is fed to jsdoc.

#### infos.name
Type: `String`  
Default: `''`

#### infos.description
Type: `String`  
Default: `''`

#### infos.version
Type: `String`  
Default: `''`

#### infos.licenses
Type: `Array`  
Default: `[]`

#### infos.plugins
Type: `Array`  
Default: `false`

jsDoc plugins to use. Example: `['plugins/markdown']`


### jsdoc.generator(destination, template, options)

```javascript
gulp.src("./somewhere/jsdoc.json")
  .pipe(jsdoc.generator('./destination'))
```

or directly from the parser pipe:

```javascript
gulp.src(["./src/*.js", "README.md"])
  .pipe(jsdoc.parser(infos, name))
  .pipe(jsdoc.generator('./destination'))
```

By default, the generator uses the default template.

#### destination
Type: `String`  
Default: `''`

Where the documentation will be outputed.
If an infos object with a version / name was provided to the parser, these will be used in the final path.

#### template

You may optionnally specify a custom template, using the following syntax

```
{
  path: 'path_to_template',
  anyTemplateSpecificParameter: 'whatever'
}
```

As a courtesy, gulp-jsdoc bundles ink-docstrap templates, that you may use directly this way:

```
{
    path: 'ink-docstrap',
    systemName      : 'Something'',
    footer          : "Something",
    copyright       : "Something",
    navType         : "vertical",
    theme           : "journal",
    linenums        : true,
    collapseSymbols : false,
    inverseNav      : false
  }
```

See [their site](https://github.com/terryweiss/docstrap) for more infos.


#### options

You may optionnally override default jsdoc behavior with this object:

```
  {
    'private': false,
    monospaceLinks: false,
    cleverLinks: false,
    outputSourceFiles: true
  }
 ```


### jsdoc(destination, template, infos, options)

```javascript
gulp.src(["./src/*.js", "README.md"])
  .pipe(jsdoc('./destination'))
```

... is simply a shortcut for

```javascript
gulp.src(["./src/*.js", "README.md"])
  .pipe(jsdoc.parser())
  .pipe(jsdoc.generator('./destination'))
```


Limitations
-------------

Only the parser is really using streams. While the generator will read from the result of the parser, it will also read and write templates files synchronously on its own.

There is nothing we can do about that, unless changing the jsdoc templating API entirely, and all existing templates...

Also, the following are currently not supported:

 * tutorials
 * sourcing configuration from jsdoc.conf files

If you have a use-case that you can't do with straight gulp in a better way, please say so.

License
-------------

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-jsdoc
[npm-image]: https://badge.fury.io/js/gulp-jsdoc.png

[travis-url]: http://travis-ci.org/jsBoot/gulp-jsdoc
[travis-image]: https://secure.travis-ci.org/jsBoot/gulp-jsdoc.png?branch=master

[coveralls-url]: https://coveralls.io/r/jsBoot/gulp-jsdoc
[coveralls-image]: https://coveralls.io/repos/jsBoot/gulp-jsdoc/badge.png?branch=master

[depstat-url]: https://david-dm.org/jsBoot/gulp-jsdoc
[depstat-image]: https://david-dm.org/jsBoot/gulp-jsdoc.png

[codeclimate-url]: https://codeclimate.com/github/jsBoot/gulp-jsdoc
[codeclimate-image]: https://codeclimate.com/github/jsBoot/gulp-jsdoc.png
