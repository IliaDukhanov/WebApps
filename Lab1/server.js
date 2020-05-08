//Подключение http-модуля,
//который поставляется вместе с Node.js и
//реализация доступа к нему через переменную http
var http = require("http");

//Подключение модуля для работы с файловой системой
var fs = require("fs");

//Создание http-сервера, использующего порт 8888
http.createServer( function(request, response) {
console.log("Request received");

//загрузкаhtmlстраницыизфайловойсистемы
var page = fs.readFileSync('index.html');

//запись в ответ заголовка с указанием кода состояния, и типа возвращаемого контента
response.writeHead(200, { 'Content-Type': 'text/html' });

//телоответа
response.write(page);

//отправка ответа
response.end();
}).listen(8888, "0.0.0.0");
console.log("Server has started");
