'use strict';

var assert = require('chai').assert,
    MountList = require('../MountList');

describe('Main tests', function() {
  it('Should detect operating system correctly and create correct os object', function() {
    var os = MountList.osMountFactory(process.platform);
    assert.equal(typeof os, 'object', "Should Return os object")

    os = MountList.osMountFactory('linux');
    assert.equal(os.getOsName(), 'linux');

    os = MountList.osMountFactory('darwin');
    assert.equal(os.getOsName(), 'darwin');

    os = MountList.osMountFactory('win32');
    assert.equal(os.getOsName(), 'win32');
  });

  it('Should get proper list from Windows net use command', function() {
    var message = 'Status  Local   Remote              Network' + "\n" +
              '--------------------------------------------' + "\n" +
              "     E:     \\\\vboxsrv\\someFolder     VirtualBox Shared Folders" + "\n" +
              '     F:     \\\\vboxsrv\\someOtherFolder    VirtualBox Shared Folders' + "\n" +
              'this command completed successfully.';
    var os = MountList.osMountFactory('win32');
    var returnObject = os.getObjectFromReturnString(message);

    assert.equal(returnObject.length, 2, "Should see two object");
    assert.equal(returnObject[0].local, 'E:');
    assert.equal(returnObject[1].local, 'F:');
    assert.equal(returnObject[1].res, '\\\\vboxsrv\\someOtherFolder');
  });

  it('Should get proper list from OSX mount command', function() {
    var message = 'dev/disk0s2 on / (hfs, local, journaled)' + "\n" +
                  'devfs on /dev (devfs, local, nobrowse)' + "\n" +
                  'map -hosts on /net (autofs, nosuid, automounted, nobrowse)' + "\n" +
                  'map auto_home on /home (autofs, automounted, nobrowse)' + "\n" +
                  '/dev/disk0s4 on /Volumes/BOOTCAMP (ntfs, local, read-only, noowners)';

    var os = MountList.osMountFactory('darwin');
    var returnObject = os.getObjectFromReturnString(message);

    assert.equal(returnObject.length, 5, "Should see file object");
    assert.equal(returnObject[0].local, '/');
    assert.equal(returnObject[1].local, '/dev');
    assert.equal(returnObject[1].res, 'devfs');
  });

  it('Should get proper list from Linux mount command', function() {
    var message = '/dev/md0 on / type ext4 (rw,errors=remount-ro)' + "\n" +
                  'proc on /proc type proc (rw,noexec,nosuid,nodev)' + "\n" +
                  'sysfs on /sys type sysfs (rw,noexec,nosuid,nodev)' + "\n" +
                  'none on /sys/kernel/debug type debugfs (rw)' + "\n" +
                  'none on /sys/kernel/security type securityfs (rw)' + "\n" +
                  'udev on /dev type devtmpfs (rw,mode=0755)' + "\n" +
                  'devpts on /dev/pts type devpts (rw,noexec,nosuid,gid=5,mode=0620)' + "\n" +
                  '/dev/md2 on /var/log type ext4 (rw)' + "\n" +
                  'nfsd on /proc/fs/nfsd type nfsd (rw)' + "\n" +
                  '//192.168.97.82/proxy on /mnt/flow/proxyworker/proxy type cifs (rw)';

    var os = MountList.osMountFactory('linux');
    var returnObject = os.getObjectFromReturnString(message);

    assert.equal(returnObject.length, 10, "Should see 10 objects in the array");
    assert.equal(returnObject[3].local, '/sys/kernel/debug');
    assert.equal(returnObject[3].res, 'none');

    assert.equal(returnObject[9].local, '/mnt/flow/proxyworker/proxy');
    assert.equal(returnObject[9].res, '//192.168.97.82/proxy');
  });

});


/*

Idea:
res: \\vboxsrv\editor or dev/disk0s2
Local: E: or /dev
options: - and array:
    Network:....
    hfs: true
    ...


Windows example

Status  Local   Remote              Network
--------------------------------------------
        E:      \\vboxsrv\editor    VirtualBox Shared Folders
this command completed successfully.

OSX:

dev/disk0s2 on / (hfs, local, journaled)
devfs on /dev (devfs, local, nobrowse)
map -hosts on /net (autofs, nosuid, automounted, nobrowse)
map auto_home on /home (autofs, automounted, nobrowse)
/dev/disk0s4 on /Volumes/BOOTCAMP (ntfs, local, read-only, noowners)
/dev/disk1s1 on /Volumes/vol_ntfs (ufsd_NTFS, local, noowners)
/dev/disk1s2 on /Volumes/vol_ntfs2 (ufsd_NTFS, local, noowners)


Linux

/dev/md0 on / type ext4 (rw,errors=remount-ro)
proc on /proc type proc (rw,noexec,nosuid,nodev)
sysfs on /sys type sysfs (rw,noexec,nosuid,nodev)
none on /sys/kernel/debug type debugfs (rw)
none on /sys/kernel/security type securityfs (rw)
udev on /dev type devtmpfs (rw,mode=0755)
devpts on /dev/pts type devpts (rw,noexec,nosuid,gid=5,mode=0620)
tmpfs on /run type tmpfs (rw,noexec,nosuid,size=10%,mode=0755)
none on /run/lock type tmpfs (rw,noexec,nosuid,nodev,size=5242880)
none on /run/shm type tmpfs (rw,nosuid,nodev)
cgroup on /sys/fs/cgroup type cgroup (rw)
/dev/sda1 on /RAIDS/RAID_1 type xfs (rw,noatime,usrquota,grpquota,inode64,logbsize=256k)
/dev/md4 on /home type ext4 (rw)
/dev/md1 on /var type ext4 (rw)
/dev/md2 on /var/log type ext4 (rw)
samba-cache on /var/cache/samba type ramfs (rw)
rpc_pipefs on /run/rpc_pipefs type rpc_pipefs (rw)
nfsd on /proc/fs/nfsd type nfsd (rw)
//192.168.97.82/proxy on /mnt/flow/proxyworker/proxy type cifs (rw)
*/

