var fs = require("fs");
const express = require("express");
const router = express.Router();
const Animal = require("./animal")

let jsonbody = null;
let imgerror = null;

router.get("/img", (req, res)=>{
    console.log(jsonbody);
    res.send(jsonbody);
});

router.post("/findimg", (req, res)=>{
    console.log("FIND");
    console.log(req.body);

    if(req.body.colour === ''){
        var id = Math.floor(Math.random() * Math.floor(3));
        switch (id) {
            case 0:
                req.body.colour = "white";
              break;
            case 1:
                req.body.colour = "black";
              break;
            case 2:
                req.body.colour = "purple";
              break;
            default:
              console.log("RandomcolourError");
          }
    }

    if(req.body.grouping === ''){
        var id = Math.floor(Math.random() * Math.floor(2));
        switch (id) {
            case 0:
                req.body.grouping = "single";
              break;
            case 1:
                req.body.grouping = "multiple";
              break;
            default:
              console.log("RandomGroupingError");
          }
    }

    if(!req.body.width){
        req.body.width = 0;
        while(req.body.width === 0)
            req.body.width = Math.floor(Math.random() * Math.floor(6)) * 100;
    }

    if(!req.body.height){
        req.body.height = 0;
        while(req.body.height === 0)
            req.body.height = Math.floor(Math.random() * Math.floor(6)) * 100;
    }

    console.log(req.body);
    Animal.findOne({name: req.body.name, colour: req.body.colour, grouping: req.body.grouping})
        .then(animal => {      
            if (animal != null)
            {
                console.log("FOUND")
                console.log({animal: animal, width: req.body.width, height: req.body.height});
                res.send({animal: animal, width: req.body.width, height: req.body.height});
            }
            else
            {
                imgerror = {error: "Image not found"};
                console.log(imgerror.error);
                res.send(imgerror);
            }
        })
});

router.post("/img", (req, res)=>{
    console.log("SEND");
    console.log(req.body);
    
    Animal.findOne({name: req.body.name, grouping: req.body.grouping, colour: req.body.colour})
        .then(animal => {      
            if (animal != null)
            {
                console.log("FOUND")
                console.log(animal);
                res.send(animal);
            }
            else
            {
                imgerror = {error: "Image not found"};
                console.log(imgerror.error);
                res.send(imgerror);
            }
    });
});

module.exports = router;