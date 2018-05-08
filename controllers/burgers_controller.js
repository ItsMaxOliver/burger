var express = require("express");
var burger = require("../models/burger.js");

var router = express.Router();

router.get("/", function(req, res) {
    burger.selectAll(function(data) {
        var handleObj = {
            burgers : data
        };
        res.render("index", handleObj);
    });
});

router.post("/api/burgers", function(req, res) {
    burger.insertOne(["name", "devoured"], [req.body.burger, req.body.devoured], function(result) {
        res.json({ id : result.insertId });
    });
});

router.get("/api/burgers", function(req, res) {
    burger.selectAll(function(data) {
        var handleObj = {
            burgers : data
        };
        console.log(handleObj);
        res.json(handleObj);
    });
});

router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function(result) {
        if (result.changedRows == 0) {
            return res.status(404);
        }
        else {
            res.status(200);
        }
    });
});

module.exports = router;