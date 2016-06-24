/* jshint node: true */
/*global describe, it */

'use strict';
var assert = require('chai').assert,
    Win32Class = require('../../../src/OS/Win32.js'),
    Win32 = new Win32Class();


describe('Unit - Os/Win32.js test', function() {

  it('Should parse correctly line from net use windows command', function() {
    var line = 'M:        \\\\192.168.1.10\\bar2 bar3 bar4';
    var lineObject = Win32.getObjectFromLine(line);

    assert.equal(lineObject.local, 'M:');
    assert.equal(lineObject.res, '\\\\192.168.1.10\\bar2 bar3 bar4');
    assert.equal(lineObject.separator, '\\');


    line = 'T:        \\\\192.168.1.10\\foo';
    lineObject = Win32.getObjectFromLine(line);
    assert.equal(lineObject.local, 'T:');
    assert.equal(lineObject.res, '\\\\192.168.1.10\\foo');
  });

});
