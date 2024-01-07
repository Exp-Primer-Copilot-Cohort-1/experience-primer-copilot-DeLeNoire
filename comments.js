// create a server-side route for adding a comment to a post
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the comments
  app.get("/api/comments", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Comment.findAll({}).then(function(dbComment) {
      // We have access to the comments as an argument inside of the callback function
      res.json(dbComment);
    });
  });

  // POST route for saving a new comment
  app.post("/api/comments", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text and complete property
    db.Comment.create({
      text: req.body.text,
      complete: req.body.complete
    }).then(function(dbComment) {
      // We have access to the new comment as an argument inside of the callback function
      res.json(dbComment);
    });
  });

  // DELETE route for deleting comments. We can get the id of the comment to be deleted from
  // req.params.id
  app.delete("/api/comments/:id", function(req, res) {
    // We just have to specify which comment we want to destroy with "where"
    db.Comment.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbComment) {
      res.json(dbComment);
    });

  });

  // PUT route for updating comments. We can get the updated comment data from req.body
  app.put("/api/comments", function(req, res) {

    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Comment.update({
      text: req.body.text,
      complete: req.body.complete
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbComment) {
      res.json(dbComment);
    });
  });

};

