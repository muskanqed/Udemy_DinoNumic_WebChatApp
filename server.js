const express = require("express");
require("dotenv").config();
const config = require("./config/app");
const router = require("./router");
const bodyparser = require("body-parser");

app = express();

const port = config.appPort;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))

app.use(router);

app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
