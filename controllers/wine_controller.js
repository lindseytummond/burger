var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var wine = require("../models/wine.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  wine.all(function(data) {
    var hbsObject = {
      wine: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/wine", function(req, res) {
  wine.create([
    "name", "drank"
  ], [
    req.body.name, req.body.sleepy
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/wine/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  wine.update({
    drank: req.body.drank
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/wine/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  wine.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;