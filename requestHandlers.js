function handleFTP(action) {
    var FTP_COMMAND = 'vsftpd';
    
    handleService(FTP_COMMAND, action);
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

exports.handleFTP = handleFTP;
exports.handleTorrents = handleTorrents;