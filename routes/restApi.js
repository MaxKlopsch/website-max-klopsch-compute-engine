const express = require('express');
const router = express.Router();

// GET /questions
// Return question collection
router.get("/", (req, res) => {
    res.json({response: "Received a GET request"});
});

// POST /questions
// Create a question
router.post("/", (req, res) => {
    res.json({
        response: "Received a POST request",
        body: req.body
    });
});

// GET /questions/:id
// Return specific question
router.get("/:id", (req, res) => {
    res.json({response: `Received a GET request for a specific ID ${req.params.id}`});
});

module.exports = router;