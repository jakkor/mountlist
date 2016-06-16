'use strict';
var assert = require('chai').assert,
    Win32Class = require('../../../src/OS/Win32.js'),
    Win32 = new Win32Class();


describe('Unit - Os/Win32.js test', function() {

  it('Should parse correctly line from net use windows command', function() {
    var line = '      E:      \\\\vboxsrv\\someOtherFolder      VirtualBox Shared Folders';
    var lineObject = Win32.getObjectFromLine(line);

    assert.equal(lineObject.local, 'E:');
    assert.equal(lineObject.res, '\\\\vboxsrv\\someOtherFolder');


    var line = 'OK           Z:        \\\\192.168.97.82\\tickets_1  Microsoft Windows Network';
    var lineObject = Win32.getObjectFromLine(line);
    assert.equal(lineObject.local, 'Z:');
    assert.equal(lineObject.res, '\\\\192.168.97.82\\tickets_1');
  });

});


/*

New connections will be remembered.


Status       Local     Remote                    Network

-------------------------------------------------------------------------------
             E:        \\vboxsrv\editor          VirtualBox Shared Folders
The command completed successfully.


 */
