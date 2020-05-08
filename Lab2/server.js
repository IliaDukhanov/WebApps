const fs = require("fs");
//const url = require('url');
const http = require('http');
//const qs = require('querystring');
//const path = require('path');

var server = http.createServer(
    function (request, response) {
        console.log("Request received");
        if (request.method === 'POST') {
            let body = '';
            request.on('data', function (data) {
               body += data;
                });
                
                request.on('end',function() {
                    console.log(body);
                    var ct = 0;
                    for (var i = 0; i < body.length; i++){
                        if (",.;:!?-".indexOf(body[i]) !== -1) ct++;
                    }
                    response.writeHead(200);
                    response.write(
                        JSON.stringify({ 
                            numberofcharacters: ct === 0 ? "NO" : ct
                        })
                    );
                    response.end();
                });
        }

        if (request.method === 'GET'){
            //var params = url.parse(request.url);
            console.log("Request received");
            //console.log(params);
            //загрузка html страницы из файловой системы
            const page = fs.readFileSync('index.html');
            //запись в ответ заголовка с указанием кода состояния, и типа возвращаемого контента
            response.writeHead(200, { 'Content-Type': 'text/html' });
            //телоответа
            response.write(page);
            //отправка ответа
            response.end();
        }
        
    }
);

server.listen(8888);
console.log("Server started!");