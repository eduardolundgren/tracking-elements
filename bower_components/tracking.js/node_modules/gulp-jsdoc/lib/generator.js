/**
 * This is the documentation generator.
 * Unfortunately, there is now way we can make it streamy - doc generation is entirely
 * delegated to the opaqure publish method of each template...
 * Also, jsdoc structure requires us to:
 * - manipulate global variables
 * - copy over templates into node_modules
 * ... and there is little to be done - apart maybe changing jsdoc organization radically?
 * :(
 */

(function(){
  'use strict';

  var path = require('path');
  var fs = require('fs');
  var wrench = require('wrench');
  var taffy = require('taffydb').taffy;

  // Unfortunately, jsdoc rely on globals for the templating output part
  var env = global.env = {};

  // Some templates may need these and crash for the lack of it :/
  (function(){
    var jsdocPkg = require('jsdoc/package.json');
    env.version = {
      number: jsdocPkg.version,
      revision: new Date( parseInt(jsdocPkg.revision, 10) ).toUTCString()
    };
  }());

  // Init other global objects
  env.opts = env.opts || {};
  env.conf = env.conf || {};
  env.conf.templates = env.conf.templates || {};
  env.conf.templates['default'] = env.conf.templates['default'] || {};

  // We need the location of jsboot module because we MUST copy custom templates there :(((
  // Also, part of jsdoc won't even boot without this :(
  var jsdocRoot = env.dirname = path.dirname(require.resolve('jsdoc/cli'));

  var Generator = function(destination, template, options){
    options = options || {};

    env.conf.tags = {
      allowUnknownTags: true
    };

    env.opts['private'] = !!options.showPrivate;

    env.conf.templates.monospaceLinks = !!options.monospaceLinks;
    env.conf.templates.cleverLinks = !!options.cleverLinks;
    env.conf.templates['default'].outputSourceFiles = ('outputSourceFiles' in options) ? options.outputSourceFiles : true;

    template = template || {};

    // Overload conf object with optional template
    Object.keys(template).forEach(function(key){
      if(key != 'path')
        env.conf.templates[key] = template[key];
    });

    // Magic do
    if(template.path == 'ink-docstrap'){
      template.path = path.join(__dirname, '..', 'node_modules', 'ink-docstrap', 'template');
    }

    if(template.path && fs.existsSync(template.path)){
      env.opts.template = path.join(jsdocRoot, path.basename(path.dirname(path.dirname(template.path))) + '-' + path.basename(path.dirname(template.path)) + '-godamnawful');
      // XXX this is god f damn awful jsdoc!!!
      // Templates SHOULD instead require a separate jsdoc-template module...
      // No one freakin uses rhino...
      wrench.copyDirSyncRecursive(template.path, env.opts.template, {
        forceDelete: true
      });
    }else
      env.opts.template = path.join(jsdocRoot, 'templates/default');

    env.opts.destination = destination || './doc/jsdoc';

    var tpl;
    try {
    // XXX this is a terrible hack, to fix #1
      (function(){
        var offendingTpl = require.resolve(env.opts.template + '/publish');
        if(offendingTpl in require.cache)
          delete require.cache[offendingTpl];
        var offending = require.resolve('jsdoc/lib/jsdoc/util/templateHelper');
        if(offending in require.cache)
          delete require.cache[offending];
      }());

      tpl = require(env.opts.template + '/publish');
    }catch(e){
      throw new Error('Unable to load template: ' + e.message || e);
    }

    // templates should include a publish.js file that exports a "publish" function
    if (!tpl.publish || typeof tpl.publish !== 'function')
      throw new Error(env.opts.template + ' does not export a "publish" function. Global ' +
            '"publish" functions are no longer supported.');

    this.render = function(vinyl){
      env.opts.readme = vinyl.readme;
      tpl.publish(
          taffy(vinyl.contents.toString('utf8')),
          env.opts,
          {children: []}
      );

      return {};
    };
  };

  module.exports = Generator;

}());
