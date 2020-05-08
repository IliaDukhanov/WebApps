function route(handle, pathname, response) {
    console.log("About to route a request for " + pathname);
    if (typeof handle[pathname] === 'function') {
    handle[pathname](response);
    } 
    else {
        console.log("No request handler found for " + pathname);
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end();
    }
}
   
exports.route = route