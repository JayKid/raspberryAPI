var server = require("./server");
var router = require("./router");
var requestHandlers = require('./requestHandlers');

var handle = {}
handle['/ftp/start'] = requestHandlers.startFTP;
handle['/ftp/stop'] = requestHandlers.stopFTP;

server.iniciar(router.route,handle);