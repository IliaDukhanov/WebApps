const fs = require("fs");

function start(response) {
    console.log("Request handler 'start' was called.");

    const page = fs.readFileSync('index.html');
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(page);
    response.end();
}

function upload(response) {
    console.log("Request handler 'upload' was called.");

    const page = fs.readFileSync('upload.html');
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(page);
    response.end();
}

function favicon(response) {
    console.log("Request handler 'favicon' was called.");
    
    response.writeHead(404);
    response.end();
}

function placeHolder(response) {
    console.log("Request handler 'placeHolder' was called.");
    
    const page = fs.readFileSync('placeHolder.html');
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(page);
    response.end();
}

exports.start = start;
exports.upload = upload;
exports.favicon = favicon;
exports.placeHolder = placeHolder;