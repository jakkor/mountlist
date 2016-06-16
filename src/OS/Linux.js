'use strict';
var OS = require('../OS.js').OS;

var Linux = function() {
  this.osName = 'linux';
}

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

  return lineObject;
}

Linux.prototype.executeCommand = function() {
  return this.getCommandPromise('mount');
}


module.exports=Linux
