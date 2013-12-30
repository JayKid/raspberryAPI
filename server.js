var http = require("http");
var url = require("url");

function iniciar(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;

    route(handle, pathname);

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("NodeJS API Home page");
    response.end();
  }

  http.createServer(onRequest).listen(8080);
  console.log("Server running :)");
}

exports.iniciar = iniciar;