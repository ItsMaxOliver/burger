var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var handle = require("express-handlebars");

app.engine("handlebars", handle({ defaultLayout: "main" }));
app.set("view engine", "handlebars");