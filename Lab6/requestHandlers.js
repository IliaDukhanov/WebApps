const fs = require("fs");

function start(response, postData) {
    console.log("Request handler 'start' was called.");
    
    const page = fs.readFileSync('index.html');
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(page);
    response.end();
}

function favicon(response) {
    console.log("Request handler 'favicon' was called.");
    
    response.writeHead(404);
    response.end();
}

function formatError(response)
{
    response.write(JSON.stringify({error: "Неверный формат запроса"}));
    response.end();
}

function search(response, postData)
{
    var images = {
        WhiteBeaverS: {animal: "beaver", colour: "white", grouping: "single", url: "images/WhiteBeaverS.jpg"},
        WhiteBeaverM: {animal: "beaver", colour: "white", grouping: "multiple", url: "images/WhiteBeaverM.jpg"},
        BlackBeaverS: {animal: "beaver", colour: "black", grouping: "single", url: "images/BlackBeaverS.jpg"},
        BlackBeaverM: {animal: "beaver", colour: "black", grouping: "multiple", url: "images/BlackBeaverM.jpg"},
        PurpleBeaverS: {animal: "beaver", colour: "purple", grouping: "single", url: "images/PurpleBeaverS.jpg"},
        WhiteBisonS: {animal: "bison", colour: "white", grouping: "single", url: "images/WhiteBisonS.jpg"},
        BlackBisonS: {animal: "bison", colour: "black", grouping: "single", url: "images/BlackBisonS.jpg"},
        BlackBisonM: {animal: "bison", colour: "black", grouping: "multiple", url: "images/BlackBisonM.jpg"},
        PurpleBisonS: {animal: "bison", colour: "purple", grouping: "single", url: "images/PurpleBisonS.jpg"},
        PurpleBisonM: {animal: "bison", colour: "purple", grouping: "multiple", url: "images/PurpleBisonM.jpg"},
        WhiteHippoS: {animal: "hippo", colour: "white", grouping: "single", url: "images/WhiteHippoS.jpg"},
        WhiteHippoM: {animal: "hippo", colour: "white", grouping: "multiple", url: "images/WhiteHippoM.jpg"},
        BlackHippoS: {animal: "hippo", colour: "black", grouping: "single", url: "images/BlackHippoS.jpg"},
        BlackHippoM: {animal: "hippo", colour: "black", grouping: "multiple", url: "images/BlackHippoM.jpg"},
        PurpleHippoS: {animal: "hippo", colour: "purple", grouping: "single", url: "images/PurpleHippoS.jpg"},
        PurpleHippoM: {animal: "hippo", colour: "purple", grouping: "multiple", url: "images/PurpleHippoM.jpg"},
    }

    var properties = JSON.parse(postData);
    console.log(properties);
    if (properties.animal !== "beaver" && properties.animal !== "bison" && properties.animal !== "hippo"){
        formatError(response);
        return;
    }

    if(properties.colour === ''){
        var id = Math.floor(Math.random() * Math.floor(3));
        switch (id) {
            case 0:
                properties.colour = "white";
              break;
            case 1:
                properties.colour = "black";
              break;
            case 2:
                properties.colour = "purple";
              break;
            default:
              console.log("RandomColorError");
          }
    }

    if(properties.grouping === ''){
        var id = Math.floor(Math.random() * Math.floor(2));
        switch (id) {
            case 0:
                properties.grouping = "single";
              break;
            case 1:
                properties.grouping = "multiple";
              break;
            default:
              console.log("RandomGroupingError");
          }
    }

    if(!properties.width){
        properties.width = 0;
        while(properties.width === 0)
            properties.width = Math.floor(Math.random() * Math.floor(6)) * 100;
    }

    if(!properties.height){
        properties.height = 0;
        while(properties.height === 0)
            properties.height = Math.floor(Math.random() * Math.floor(6)) * 100;
    }

    console.log(properties);

    for (var image in images){
        if(properties.animal === images[image].animal &&
           properties.colour === images[image].colour &&
           properties.grouping === images[image].grouping){
                properties.filename = images[image].url.slice(7);
                properties.imgURL = images[image].url;
                byImage(response, properties);
                return;
        }
    }
    properties.error = "Изображение не найдено";

    byImage(response, properties);
}

function byImage(response, properties)
{
        response.writeHead(200);
        response.write(JSON.stringify(properties));
        response.end();
}

exports.start = start;
exports.favicon = favicon;
exports.search = search;
exports.byImage = byImage;