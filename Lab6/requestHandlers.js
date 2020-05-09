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
    response.write(JSON.stringify({error: "Неверный формат запроса"}));
    response.end();
}

function byContent(response, postData)
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

    if(JSON.parse(postData).colour === ''){
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

    if(JSON.parse(postData).grouping === ''){
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

    console.log(properties);
    for (var image in images){
        if(properties.animal === images[image].animal &&
           properties.colour === images[image].colour &&
           properties.grouping === images[image].grouping){
                response.writeHead(200);
                console.log(JSON.parse(postData));
                response.write(JSON.stringify({ animal: properties.animal, colour: properties.colour, grouping: properties.grouping, imgURL: images[image].url}));
                response.end();
                return;
            }
    }
    response.write(JSON.stringify({ animal: properties.animal, colour: properties.colour, grouping: properties.grouping, error: "Изображение не найдено"}));
    response.end();
}

function byImage(response, postData)
{
    var images = {
        WhiteBeaverS: {filename: "WhiteBeaverS.jpg", width: 1280, height: 720},
        WhiteBeaverM: {filename: "WhiteBeaverM.jpg", width: 800, height: 533},
        BlackBeaverS: {filename: "BlackBeaverS.jpg", width: 800, height: 532},
        BlackBeaverM: {filename: "BlackBeaverM.jpg", width: 1952, height: 1281},
        PurpleBeaverS: {filename: "PurpleBeaverS.jpg", width: 900, height: 900},
        WhiteBisonS: {filename: "WhiteBisonS.jpg", width: 1600, height: 1599},
        BlackBisonS: {filename: "BlackBisonS.jpg", width: 3888, height: 2592},
        BlackBisonM: {filename: "BlackBisonM.jpg", width: 1140, height: 712},
        PurpleBisonS: {filename: "PurpleBisonS.jpg", width: 508, height: 495},
        PurpleBisonM: {filename: "PurpleBisonM.jpg", width: 533, height: 800},
        WhiteHippoS: {filename: "WhiteHippoS.jpg", width: 736, height: 736},
        WhiteHippoM: {filename: "WhiteHippoM.jpg", width: 2433, height: 1414},
        BlackHippoS: {filename: "BlackHippoS.jpg", width: 2000, height: 1648},
        BlackHippoM: {filename: "BlackHippoM.jpg", width: 1200, height: 675},
        PurpleHippoS: {filename: "PurpleHippoS.jpg", width: 800, height: 800},
        PurpleHippoM: {filename: "PurpleHippoM.jpg", width: 238, height: 250}
    }

    var properties = JSON.parse(postData);

    for (var image in images){
        if(properties.filename === images[image].filename &&
           properties.width === images[image].width &&
           properties.height === images[image].height){
                response.writeHead(200);
                console.log(JSON.parse(postData));
                response.write(JSON.stringify({ filename: properties.filename, width: properties.width, height: properties.height, imgURL: "images/" + properties.filename}));
                response.end();
                return;
            }
    }
    response.write(JSON.stringify({ animal: properties.animal, colour: properties.colour, grouping: properties.grouping, error: "Изображение не найдено"}));
    response.end();
}

exports.start = start;
exports.favicon = favicon;
exports.byContent = byContent;
exports.byImage = byImage;