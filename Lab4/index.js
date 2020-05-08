var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/favicon.ico"] = requestHandlers.favicon;
handle["/upload"] = requestHandlers.upload;
handle["/placeHolder"] = requestHandlers.placeHolder;

server.start(router.route, handle);
