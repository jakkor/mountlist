'use strict';
var assert = require('chai').assert,
    DarwinClass = require('../../../src/OS/Darwin.js'),
    Darwin = new DarwinClass();


describe('Unit - Os/Darwin.js test', function() {

  it('Should parse correctly line from darwin mount command command', function() {
    var line = 'devfs on /dev (devfs, local, nobrowse)';
    var lineObject = Darwin.getObjectFromLine(line);

    assert.equal(lineObject.local, '/dev');
    assert.equal(lineObject.res, 'devfs');
  });

});
