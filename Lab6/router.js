const fs = require("fs");

function route(handle, pathname, response, postData) {
    console.log("About to route a request for " + pathname);
    if (pathname.endsWith('.jpg')){
        response.write(fs.readFileSync(pathname.slice(1)));
        response.end();
        return;
    }

    if (typeof handle[pathname] === 'function') {
    handle[pathname](response, postData);
    } 
    else {
        console.log("No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");
        response.end();
    }
}
   
exports.route = route