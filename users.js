const express = require("express");
const usersRouter = express.Router();
const db = require("../db");
const { Pages, Users } = require("../models");

usersRouter.get('/', (req, res, next) => {
  Users.findAll()
  .then(user => res.send(user))
  .catch(next);
})

usersRouter.get('/:id', (req, res, next)=>{
  Pages.findAll({
    where: {
      authorId: req.params.id
    }})
    .then((pages) => {res.send(pages)})
    .catch(next)
  })


usersRouter.get('/:urlTitle', (req, res, next) => {
  Pages.findOne({
    where: {
      urlTitle: req.params.urlTitle
    },
    include: {
      model: Users , as: 'author'
      // include: { model: Tool, as: 'Instruments' }
    },
  })
  .then(page=> res.send(page))
  .catch(next);
})
  

// usersRouter.get("/:urlTitle", (req, res, next) => {
//   // Encontrando la página
//   Pages.findOne({
//     where: {
//       urlTitle: req.params.urlTitle,
//     },
//     include: { model: Users, as: "author" },
//   }).then((page) => {
//     if (!page) return next("No se encontró tu página");
//     res.send(page);
//   })
//   .catch(next)
// });

  
module.exports = usersRouter;