const bodyParser = require("body-parser");
const express = require('express')
const app = express()
const port = 3000
const request = require("request");
var router = require("./routes");

app.use(express.static(__dirname + "/public"));
app.set("view engine", "pug");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(router)
var server = app.listen(3000, function () {
   console.log(`Google Rankings listening at 3000`)
})

module.exports = server
