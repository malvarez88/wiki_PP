const express = require("express");
// const { send } = require("express/lib/response");
// const { where } = require("sequelize/types");
const pagesRouter = express.Router();
const db = require("../db");
const { Pages, Users } = require("../models");

pagesRouter.get("/", (req, res, next) => {
  Pages.findAll()
    .then((page) => res.send(page))
    .catch(next);
});

// pagesRouter.post("/", (req, res, next) => {
//     const user = req.body;
//     Users.findOrCreate({
//         where: user,
//     })
//   Pages.create(req.body)
//     .then((page) => res.send(page))
//     .catch(next);
//   // console.log("req.body", req.body)
// });

pagesRouter.post("/", (req, res, next) => {
    const { name, email } = req.body;
    Users.findOrCreate({
      where: { name, email },
    })
      .then((data) => {
        const user = data[0];
        Pages.create(req.body)
          .then((page) => page.setAuthor(user))
          .then((page) => res.send(page));
      })
      .catch(next);
  });

pagesRouter.get("/:urlTitle", function (req, res, next) {
  Pages.findOne({
    where: {
      urlTitle: req.params.urlTitle,
    },
  })
    .then((page) => res.send(page))
    .catch(next);
  // res.send(`Llegó a la ruta dinámica con: ${req.params.urlTitle}`);
});

pagesRouter.delete("/:id", function (req, res, next) {
  Pages.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.sendStatus(204).catch(next);
});

pagesRouter.put("/:urlTitle", function (req, res, next) {
  Pages.update(
    {
      title: req.body.title,
      content: req.body.content,
      urlTitle: req.body.urlTitle,
    },
    {
      where: {
        urlTitle: req.params.urlTitle,
      },
      returning: true,
    }
  ).then((page) => {
    // console.log("🚀 ~ file: pages.js ~ line 60 ~ page", page)
    res.send(page[1][0]);
  });
});




module.exports = pagesRouter;
