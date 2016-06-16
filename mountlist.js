'use strict';
var OSFactory = require('./src/OS.js').OSFactory;

var MountList = function() {

}

/**
 * Get the list of objects with mount data like.
 * For now only local location and resource.
 * @return {array} array of objects
 */
MountList.prototype.getList = function() {
  var osObject = this.osMountFactory(process.platform);
  return osObject.executeCommand()
  .then(function(message) {
    if (message) {
      return osObject.getObjectFromReturnString(message);
    }
  });
};

/**
 * Factory for creating OS specific object that will be later use to get the list.
 * @param  {string} platform usually from process.platform
 * @return {Object} for example Darwin
 */
MountList.prototype.osMountFactory = function(platform) {
  var factory = new OSFactory(platform);
  return factory.getObject();
}

module.exports=new MountList();
