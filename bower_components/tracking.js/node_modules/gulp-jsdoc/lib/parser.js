/**
 * @file Parser
 *
 * @summary This is a wrapper around jsdoc parsing infrastructure that generates doc description
 *
 * @version ${ pkg.version }
 * @author ${ pkg.author.name }
 *
 * @license ${ pkg.license }.
 * @copyright ${ pkg.author.name }
 * @name parser.js
 * @unknownTag tag
 */

(function(){
  'use strict';

  // Dependencies
  var augment = require('jsdoc/lib/jsdoc/augment');
  var borrow = require('jsdoc/lib/jsdoc/borrow');
  var parser = require('jsdoc/lib/jsdoc/src/parser');

  var path = require('path');

  var Parser = function(infs){
    // Start by resolving defaults for the infos object
    infs = infs || {};

    var informations = {
      name: '',
      kind: 'package',
      longname: '',
      description: '',
      version: '',
      licenses: [],
      tags: {
        allowUnknownTags: true
      },
      plugins: false
    };

    Object.keys(informations).forEach(function(key){
      if(key in infs)
        informations[key] = infs[key];
    });

    // Validator XXX
    global.env.conf = global.env.conf || {};
    global.env.conf.tags = informations.tags;
    global.app = {
      jsdoc: {
        name: require('jsdoc/lib/jsdoc/name')
      }
    };

    if(!informations.longname)
      informations.longname = informations.kind + ':' + informations.name;

    // Create actual jsdoc parser
    var innerParser = new parser.Parser();

    if (informations.plugins) {
      var plugins = require('jsdoc/lib/jsdoc/plugins');
      informations.plugins = informations.plugins.map(function(item){
        return path.resolve(path.join(__dirname, '..', 'node_modules', 'jsdoc'), item);
      });
      plugins.installPlugins(informations.plugins, innerParser);
    }

    // Attach handles
    var handlers = require('jsdoc/lib/jsdoc/src/handlers');
    handlers.attachTo(innerParser);

    // Set file list up
    var parsedFiles = informations.files = [];

    // Do parse
    this.parse = function(vinyl){
      var data = vinyl.contents.toString('utf8');
      // Don't treat empty files
      if (data.length) {
        // XXX butt-ugly hack - see #5 and 3.3.0-alpha5 release of jsdoc
        env.sourceFiles = [vinyl.base];
        innerParser._parseSourceCode(data, vinyl.path);
        parsedFiles.push(vinyl.path);
      }
    };

    this.complete = function(){
      // Get buffer
      var buf = innerParser._resultBuffer;

      // Push generic package infos
      buf.push(informations);

      // Borrow and augment shit
      borrow.indexAll(buf);
      augment.addInherited(buf);
      borrow.resolveBorrows(buf);

      // Return buf
      return buf;
    };
  };

  module.exports = Parser;

}());
