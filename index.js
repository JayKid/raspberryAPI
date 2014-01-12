var server = require("./server");
var router = require("./router");
var requestHandlers = require('./requestHandlers');

var handle = {}
handle['ftp'] = requestHandlers.handleFTP;
handle['torrents'] = requestHandlers.handleTorrents;
handle['size'] = requestHandlers.handleSize;

server.iniciar(router.route,handle);