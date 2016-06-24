'use strict';

/* jshint node: true */

var OS = require('../OS.js').OS;

var Linux = function() {
  this.osName = 'linux';
};

Linux.prototype = new OS();
Linux.prototype.constructor = Linux;

/**
 * Returns object with necessary variables from one line of code
 * @param  {String} line
 * @return {Object}
 */
Linux.prototype.getObjectFromLine = function(line) {
  var regexpMatches = line.match('(.*) on (.*) type (.*) \((.*)\)');

  var lineObject = {};

  if (!regexpMatches || regexpMatches.length <= 1) {
    return false;
  }

  if (regexpMatches[1]) {
    lineObject.res = regexpMatches[1];
  }
  if (regexpMatches[2]) {
    lineObject.local = regexpMatches[2];
  }

  lineObject.separator = "/";

  return lineObject;
};

/**
 * Execute and parse the command necessary to get the mounting data.
 * Returns a promise because we need to wait for the command to finish before moving on.
 * @return {Promise}
 */
Linux.prototype.executeCommand = function() {
  return this.getCommandPromise('mount');
};


module.exports=Linux;
