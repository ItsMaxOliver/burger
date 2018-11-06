const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.static(path.join(__dirname, "/public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const handle = require("express-handlebars");

app.engine("handlebars", handle({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const router = require("./controllers/burgers_controller.js");
app.use(router);

app.listen(PORT, function() {
    console.log("Server listening on port: " + PORT);
});