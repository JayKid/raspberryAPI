function startFTP() {
    
    var FTP_COMMAND = 'vsftpd';

    // if (!checkService(FTP_COMMAND))
    // {
        startService(FTP_COMMAND);
        console.log("FTP Server started");
    // }
}

function stopFTP() {

    console.log('enters stop');
    var FTP_COMMAND = 'vsftpd';

    // if (checkService(FTP_COMMAND))
    // {
        stopService(FTP_COMMAND);
        console.log("FTP Server stopped");
    // }
}

function startService(command_name)
{
    handleService(command_name, 'start');
}

function stopService(command_name)
{
    handleService(command_name, 'stop');
}

function handleService(command_name, mode)
{
    console.log('Entering in mode: ' + mode + ' with command: ' + command_name);
    var SERVICE_CMD = 'service';
    var spawn       = require('child_process').spawn;
    var command     = spawn(SERVICE_CMD, [command_name, mode]);

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

function checkService(command)
{
    // Constants
    var ON = '+';
    var GREP_CMD = 'grep';
    var SERVICE_CMD = 'service';
    var SERVICE_CMD_PARAMS = '--status-all';

    // service --status-all |& grep CMD |& grep +

    var spawn = require('child_process').spawn;
    var service_list_status     = spawn(SERVICE_CMD, [SERVICE_CMD_PARAMS]);
    var grep_cmd                = spawn(GREP_CMD, [command]);
    var grep_status             = spawn(GREP_CMD, [ON]);

    var result = false;

    service_list_status.stdout.on('data', function (data) {
        grep_cmd.stdin.write(data);
    });

    service_list_status.on('close', function (code) {
        // if (code !== 0) {
        //     console.log('service_list_status process exited with code ' + code);
        // }
        grep_cmd.stdin.end();
    });

    grep_cmd.stdout.on('data', function (data) {
        grep_status.stdin.write(data);
    });

    grep_cmd.on('close', function (code) {
        // if (code !== 0) {
        //     console.log('grep_cmd process exited with code ' + code);
        // }
        grep_status.stdin.end();
    });

    grep_status.stdout.on('data', function (data) {
        console.log('data is: ' + data);
        if (data != '')
            result = true;
    });

    grep_status.on('close', function (code) {
        // if (code !== 0) {
        //     console.log('grep_cmd process exited with code ' + code);
        // }
    });

    return result;
}

exports.startFTP = startFTP;
exports.stopFTP = stopFTP;