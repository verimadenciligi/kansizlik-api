const express = require("express");
const routes = require("./router.js");
const bodyParser = require("body-parser");
const connectToMongo = require("./database.js");

const app = express();
app.use(bodyParser.json());
app.use(routes);
app.get("/", (req, res) => res.send("OK"));

app.listen(3000, () => {
  connectToMongo();
  console.log("listen http://localhost:3000");
});
