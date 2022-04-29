const express = require("express");
const router = express.Router();

const pagesRouter = require("./pages");
const usersRouter = require("./users");

router.use("/pages", pagesRouter);
router.use("/users", usersRouter);

module.exports = router
