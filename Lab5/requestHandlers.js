const fs = require("fs");
const querystring = require("querystring");

function start(response, postData) {
    console.log("Request handler 'start' was called.");
    
    var body =  '<html>'+
                '<head>'+
                '<meta http-equiv="Content-Type" content="text/html; '+
                'charset=UTF-8" />'+
                '</head>'+
                '<body>'+
                'Лабораторная работа 5. Реализация ответа обработчиков и POST-запросы'+
                '<br /><br />'+
                '<form action="/upload" method="post">'+
                '<input type="text" id="textId" name="UI" type="text" placeholder="" size="40"></input>'+
                '<input type="submit" value="Submit text" />'+
                '</form>'+
                '</body>'+
                '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, postData) {
    console.log("Request handler 'upload' was called.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    
    var req = postData.split('=', 2)[1];
    var arr = req.split('+', 2);
    var name = arr[0];
    var id = arr[1];

    if(!id || id.length === 1){
        if(!id){
            id = Math.floor(Math.random()*9);
        }
        if('beaver' === name){
            beaver(response, id);
        }
        else if('bison' === name){
            bison(response, id);
        }
        else if('hippo' === name){
            hippo(response, id);
        }
        else{
            formatError(response);
        }
    }
    else{
        formatError(response);
    }
    response.end();
}

function favicon(response) {
    console.log("Request handler 'favicon' was called.");
    
    response.writeHead(404);
    response.end();
}

function beaver(response, idPic)
{
    response.write(fs.readFileSync('images/beaver/'+idPic+'.jpg'));
}

function bison(response, idPic)
{
    response.write(fs.readFileSync('images/bison/'+idPic+'.jpg'));
}

function hippo(response, idPic)
{
    response.write(fs.readFileSync('images/hippo/'+idPic+'.jpg'));
}

function formatError(response)
{
    var body =  '<html>'+
                '<head>'+
                '<meta http-equiv="Content-Type" content="text/html; '+
                'charset=UTF-8" />'+
                '</head>'+
                '<body>'+
                'Ошибка: неверный формат запроса'+
                '<br /><br />'+
                'Формат запроса: животное или животное номер'+
                '<br /><br />'+
                'Животные: beaver (бобер), bison (бизон), hippo (бегемот)'+
                '<br /><br />'+
                'Номер: цифры от 0 до 9'+
                '<br /><br />'+
                '</body>'+
                '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

exports.start = start;
exports.upload = upload;
exports.favicon = favicon;