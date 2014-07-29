(function(){
  'use strict';

  var through2 = require('through2'),
    path = require('path'),
    gutil = require('gulp-util');

  var File = gutil.File;
  var PluginError = gutil.PluginError;

  var marked = require('marked');

  var Parser = require('./lib/parser.js');
  var Generator = require('./lib/generator.js');

  /**
   * That's the plugin parser
   */

  var streamParser = function (infos, name) {
    name = name || 'jsdoc.json';

    var firstFile = null;
    var readme = null;

    var wp = new Parser(infos);

    var bufferFiles = function(file, enc, next){
      if (file.isNull()) return; // ignore
      if (file.isStream()) return this.emit('error', new PluginError('gulp-jsdoc',  'Streaming not supported'));

      // Store firstFile to get a base and cwd later on
      if (!firstFile)
        firstFile = file;

      if (/[.]js$/i.test(file.path))
        wp.parse(file);
      else if(/readme(?:[.]md)?$/i.test(file.path))
        readme = marked(file.contents.toString('utf8'));

      next();
    };

    var endStream = function(conclude){
      // Nothing? Exit right away
      if (!firstFile){
        conclude();
        return;
      }

      var data;
      try{
        data = JSON.stringify(wp.complete(), null, 2);
        // data = parser(options, filemap));
      }catch(e){
        return this.emit('error', new PluginError('gulp-jsdoc',
          'Oooooh! Failed parsing with jsdoc. What did you do?! ' + e));
      }

      // Pump-up the generated output
      var vinyl = new File({
        cwd: firstFile.cwd,
        base: firstFile.base,
        path: path.join(firstFile.base, name),
        contents: new Buffer(data)
      });

      // Possibly stack-up the readme, if there was any in the first place
      vinyl.readme = readme;

      // Add that to the stream...
      this.push(vinyl);

      conclude();
    };

    // That's it for the parser
    return through2.obj(bufferFiles, endStream);
  };

  var streamGenerator = function(destination, template, options){
    var gp = new Generator(destination, template, options);

    var processor = function(file, enc, next){
      if (file.isNull()) return; // ignore
      if (file.isStream()) return this.emit('error', new PluginError('gulp-jsdoc',  'Streaming not supported'));
      try{
        gp.render(file);
      }catch(e){
        return this.emit('error', new PluginError('gulp-jsdoc',
          'Oooooh! Failed rendering with jsdoc. What did you do?! ' + e));
      }
      next();
    };

    return through2.obj(processor);
  };

  // // Wrap reporter helper
  // var wrapReporter = function(reporter){
  //   return function(options){
  //     return through2.obj(function(file, enc, next){
  //       var warnings = JSON.parse(file.contents.toString('utf8')).warnings;
  //       if(warnings && warnings.length){
  //         // Don't trust the (yahoo) reporter too much
  //         try{
  //           reporter(warnings, options);
  //         }catch(e){
  //           return this.emit('error', new PluginError('gulp-jsdoc', 'Reporter crashed!' + e));
  //         }
  //       }
  //       this.push(file);
  //       next();
  //     });
  //   };
  // };

  var jsdoc = function(destination, template, infos, buildOptions){
    return gutil.combine(
      jsdoc.parser(infos),
      // jsdoc.reporter(),
      jsdoc.generator(destination, template, buildOptions)
    )();
  };

  // // Yui default, provided reporter
  // jsdoc.yuiReporter = wrapReporter(require('./lib/uglyreporter'));

  // // Our own reporter
  // jsdoc.chalkReporter = wrapReporter(require('./lib/chalkreporter'));

  // // Default to chalk, nicier :)
  // jsdoc.reporter = jsdoc.chalkReporter;

  jsdoc.generator = streamGenerator;

  jsdoc.parser = streamParser;

  module.exports = jsdoc;

}());

