function startFTP() {
    
    var FTP_COMMAND = 'vsftpd';

    startService(FTP_COMMAND);
    console.log("FTP Server started");
}

function stopFTP() {

    var FTP_COMMAND = 'vsftpd';

    stopService(FTP_COMMAND);
    console.log("FTP Server stopped");
}

function startTorrents() {
    
    handleTorrents('start');
    console.log("Torrents Server started");
}

function stopTorrents() {

    handleTorrents('stop');
    console.log("Torrents Server stopped");
}

function handleTorrents(action)
{
    var transmision_bin = '/etc/init.d/transmission-daemon';
    var spawn       = require('child_process').spawn;
    var command     = spawn(transmision_bin, [action]);

    command.stdout.on('data', function (data) {
        console.log('stdout: '+data);
    });

    command.stderr.on('data', function (data) {
        console.log('stderr: '+data);
    });

    command.on('close', function (code) {
        if (code !== 0) {
            console.log('grep_cmd process exited with code ' + code);
        }
    });
}

function startService(command_name)
{
    handleService(command_name, 'start');
}

function stopService(command_name)
{
    handleService(command_name, 'stop');
}

function handleService(command_name, action)
{
    var SERVICE_CMD = 'service';
    var spawn       = require('child_process').spawn;
    var command     = spawn(SERVICE_CMD, [command_name, action]);

    command.stdout.on('data', function (data) {
        console.log('stdout: '+data);
    });

    command.stderr.on('data', function (data) {
        console.log('stderr: '+data);
    });

    command.on('close', function (code) {
        if (code !== 0) {
            console.log('grep_cmd process exited with code ' + code);
        }
    });
}

exports.startFTP = startFTP;
exports.stopFTP = stopFTP;
exports.startTorrents = startTorrents;
exports.stopTorrents = stopTorrents;