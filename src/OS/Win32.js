'use strict';
var OS = require('../OS.js').OS;

function Win32() {
  this.osName = 'win32';
}

Win32.prototype = new OS();
Win32.prototype.constructor = Win32;

/**
 * Returns object with necessary variables from one line of code
 * @param  {String} line
 * @return {Object}
 */
Win32.prototype.getObjectFromLine = function(line) {
  var regexpMatches = line.match('^\\s{2,}([A-Z]{1}[:]{1})\\s{2,}(.*)\\s{2,}(.*)$');
  var lineObject = {};
  if (!regexpMatches || regexpMatches.length <= 1) {
    return false;
  }
  if (regexpMatches[1]) {
    lineObject.local = regexpMatches[1].trim();
  }

  if (regexpMatches[2]) {
    lineObject.res = regexpMatches[2].trim();
  }

  return lineObject;
}

Win32.prototype.executeCommand = function() {
  return this.getCommandPromise('net use');
}

module.exports=Win32
