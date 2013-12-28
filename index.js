var server = require("./server");
var router = require("./router");
var requestHandlers = require('./requestHandlers');

var handle = {}
handle['/ftp/start'] = requestHandlers.startFTP;
handle['/ftp/stop'] = requestHandlers.stopFTP;
handle['/torrents/start'] = requestHandlers.startTorrents;
handle['/torrents/stop'] = requestHandlers.stopTorrents;

server.iniciar(router.route,handle);