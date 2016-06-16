'use strict';
var OS = require('../OS.js').OS;

function Darwin() {
  this.osName = 'darwin';
}

Darwin.prototype = new OS();
Darwin.prototype.constructor = Darwin;

/**
 * Returns object with necessary variables from one line of code
 * @param  {String} line
 * @return {Object}
 */
Darwin.prototype.getObjectFromLine = function(line) {
  var regexpMatches = line.match('(.*) on (.*) [(]{1}(.*)[)]{1}');

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

  return lineObject;
}

/**
 * Execute and parse the command necessary to get the mounting data.
 * Returns a promise because we need to wait for the command to finish before moving on.
 * @return {Promise}
 */
Darwin.prototype.executeCommand = function() {
  return this.getCommandPromise('mount');
}

module.exports = Darwin;
