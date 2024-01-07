// Create web server application using ExpressJS
// This application will read comments from a JSON file
// and display them in the browser

// Import the express module
const express = require('express');

// Create an instance of the express module
const app = express();

// Set the port number
const port = 3000;

// Use the express.static middleware to serve static files
app.use(express.static('public'));

// Use the express.json() middleware to parse JSON
app.use(express.json());

// Import the comments.js module
const comments = require('./comments.js');

// GET /comments
// Respond with JSON object containing all comments
app.get('/comments', (req, res) => {
    // Set the HTTP status code of the response
    res.status(200);

    // Set the Content-Type of the response to JSON
    res.type('application/json');

    // Respond with the JSON data
    res.send(comments.getAll());
});

// GET /comments/:id
// Respond with JSON object containing comment with specified id
app.get('/comments/:id', (req, res) => {
    // Get the id parameter from the request
    const id = req.params.id;

    // Get the comment with the specified id
    const comment = comments.getComment(id);

    // If a comment with the specified id exists
    if (comment) {
        // Set the HTTP status code of the response
        res.status(200);

        // Set the Content-Type of the response to JSON
        res.type('application/json');

        // Respond with the JSON data
        res.send(comment);
    }
    // If a comment with the specified id does not exist
    else {
        // Set the HTTP status code of the response
        res.status(404);

        // Set the Content-Type of the response to JSON
        res.type('application/json');

        // Respond with an error message
        res.send({ message: `Comment with id ${id} does not exist` });
    }
});

// POST /comments
// Respond with JSON object containing comment with specified id
app.post('/comments', (req, res) => {
    // Get the comment object from the request body
    const comment = req.body;

    // Add the comment to the list of comments
    comments.addComment(comment);

    // Set the HTTP status code of the response
    res.status(201);

    // Set the Content-Type of the response to JSON
    res.type('application/json');
}); // Add a closing curly brace here
