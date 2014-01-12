function defaultResponse(response)
{
    response.setHeader('Access-Control-Allow-Origin', 'http://192.168.0.13');
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("NodeJS API Home page");
    response.end();
}

function handleFTP(action, response) {
    var FTP_COMMAND = 'vsftpd';
    
    handleService(FTP_COMMAND, action);
    defaultResponse(response);
}

function handleSize(action, response) {

    // Constants
    var DISK_PATH = '/mnt/pendrive';
    var PIPE = ' | ';

    var actions = Array();
    actions['free'] = '$4';
    actions['used'] = '$5';

    var df = 'df -h ' + DISK_PATH;
    var grep = 'grep dev';
    var awk = ' awk \'{print(' + actions[action] + ')}\'';

    var exec = require('child_process').exec,
    child;

    var command = df + PIPE + grep + PIPE + awk;

    child = exec(command,
      function (error, stdout, stderr) {
        result = stdout.replace('%','');
        result = result.replace('\n','');
        if (error !== null) {
          console.log('exec error: ' + error);
        }

        response.setHeader('Access-Control-Allow-Origin', 'http://192.168.0.13');
        response.writeHead(200, {"Content-Type": "application/json"});
        var json = JSON.stringify({ value: result });
        response.end(json, null, 3);
    });

}

function handleTorrents(action, response)
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
    defaultResponse(response);
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
exports.handleSize = handleSize;