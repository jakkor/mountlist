'use strict';
var exec = require('child_process').exec;

var OS = function() {

}

OS.prototype.getOsName = function() {
    return this.osName;
}

OS.prototype.setOsName = function(name) {
    return this.osName = name;
}

OS.prototype.getObjectFromReturnString = function(returnString) {
  var newObject = [];
  var lines = returnString.split(/\r?\n/);
  lines.forEach(function(line) {
    var lineObject = this.getObjectFromLine(line);
    if (lineObject) {
      newObject.push(lineObject);
    }
  }.bind(this));
  return newObject;
}

OS.prototype.getCommandPromise = function(commandToRun) {
  console.log("Get command promise", commandToRun);
  return new Promise(function(resolve, reject){
    var child = exec(commandToRun);
    var result = "";

    //child.stdout.pipe(process.stdout)
    child.stdout.on('data', function(data) {
      result += data;
    });

    child.on('close', function() {
        resolve(result);
    });
  });
}


var OSFactory = function(platform) {
  this.platform = platform;
}

OSFactory.prototype.getObject = function() {
  switch (this.platform) {
    case 'darwin':
      var Darwin = require('./OS/Darwin.js');
      return new Darwin();
    case 'linux':
      var Linux = require('./OS/Linux.js');
      return new Linux();
    case 'win32':
      var Win32 = require('./OS/Win32.js');
      return new Win32();
  }
  return false;
}

module.exports.OS=OS;
module.exports.OSFactory=OSFactory;

