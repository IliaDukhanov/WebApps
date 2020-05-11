const server = require("./server");
const router = require("./router");
const requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/favicon.ico"] = requestHandlers.favicon;
handle["/search"] = requestHandlers.search;


server.start(router.route, handle);
