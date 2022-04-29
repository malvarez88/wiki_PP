const express = require("express");
const pagesRouter = express.Router();
const db = require("../db");
const { Pages } = require("../models");

pagesRouter.get("/", (req, res, next) => {

    Pages.findAll()
        .then(page => res.send(page))
        .catch(next);
});

pagesRouter.post("/", (req, res, next) => {
    //const title = req.body.title
    //const content = req.body.content

    Pages.create({
        title: req.body.title,
        content: req.body.content, 
        urlTitle: req.body.title
    
})
    .then(page => res.send(page))
    .catch(next);
    console.log("req.body", req.body)
    console.log("url", urlTitle)
});

module.exports = pagesRouter;

function generateUrlTitle (title) {
    if (title) {
      // Remueve todos los caracteres que no son alfanuméricos 
      // y convierte los espacios en guiones bajos. 
      return title.replace(/\s+/g, '_').replace(/\W/g, '');
    } else {
      // Genera de forma aleatoria un String de 5 caracteres
      return Math.random().toString(36).substring(2, 7);
    }
  }