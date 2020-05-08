const fs = require("fs");
const http = require('http');
var url = require("url");
var querystring = require("querystring");

function start(route, handle)
{
    var server = http.createServer(function onRequest(request, response) {
            var pathname = url.parse(request.url).pathname;
            console.log("Request for " + pathname + " recieved.");

            route(handle, pathname, response);
        }
    );

    server.listen(8888);
    console.log("Server started!");
}

exports.start = start;