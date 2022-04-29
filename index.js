const express = require("express");
const app = express();
const volleyball = require("volleyball");
const db = require("./db")
const routes = require("./routes")
const models = require("./models")

// logging middleware
app.use(volleyball);

app.use("/", express.static("build"))

// parsing middleware
app.use(express.json());

app.use("/api", routes)

app.use("/api", (req, res) => {
  res.sendStatus(404);
});

app.use((req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});

// error middleware -> https://expressjs.com/es/guide/error-handling.html
app.use((err, req, res, next) => {
  console.log("ERROR");
  console.log(err);
  res.status(500).send(err.message);usersRouter.get("/", (req, res, next) => {
    console.log("llegamos")
    res.status(200)
})
});

db.sync({ force: false }).then(() => {
 app.listen(3000, () => console.log("Servidor escuchando en el puerto 3000"));
})
.catch(console.error);


 
 