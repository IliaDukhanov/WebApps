const fs = require("fs");
const http = require('http');
var url = require("url");
var querystring = require("querystring");

function start()
{
    var server = http.createServer(function onRequest(request, response) {
            console.log("Request received");
            console.log(url.parse(request.url));
            if (request.method === 'POST') {
                
            }

            if (request.method === 'GET'){
                if (request.url === '/favicon.ico'){
                    response.writeHead(404);
                    response.end();
                } 
                else if (request.url === '/'){
                    const page = fs.readFileSync('index.html');
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.write(page);
                    response.end();
                }
                else{
                    var queryParams = querystring.parse(url.parse(request.url).search.slice(1));
                    if (queryParams != null) {
                        console.log(queryParams);
                        
                        var result = queryParams.a*queryParams.b;
                        if(isNaN(result)){
                            response.writeHead(400);
                            response.write( JSON.stringify({ 
                                ServResponse: "Error!"
                            })
                        );
                        }
                        else{
                            response.writeHead(200);
                            response.write(
                                JSON.stringify({ 
                                    ServResponse: "Результат умножения операндов: " + result
                                })
                            );
                        }
                    }
                    response.end();
                }
            }
        }
    );

    server.listen(8888);
    console.log("Server started!");
}

exports.start = start;