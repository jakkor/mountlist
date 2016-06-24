/* jshint node: true */
/*global describe, it */

'use strict';
var assert = require('chai').assert,
    LinuxClass = require('../../../src/OS/Linux.js'),
    Linux = new LinuxClass();


describe('Unit - Os/Linux.js test', function() {

  it('Should parse correctly line from linux mount command', function() {
    var line = '/dev/sda1 on /RAIDS/RAID_1 type xfs (rw,noatime,usrquota,grpquota,inode64,logbsize=256k)';
    var lineObject = Linux.getObjectFromLine(line);

    assert.equal(lineObject.local, '/RAIDS/RAID_1');
    assert.equal(lineObject.res, '/dev/sda1');
    assert.equal(lineObject.separator, '/');
  });

});
