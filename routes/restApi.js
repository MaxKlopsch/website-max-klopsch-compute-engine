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

// GET /questions/:qID
// Return specific question
router.get("/:qID", (req, res) => {
    res.json({response: `Received a GET request for a specific ID ${req.params.qID}`});
});

// POST /questions/:qID/answers
// Create an answer to a question
router.post("/:qID/answers", (req, res) => {
    res.json({
        response: "Received a POST request to /answers",
        body: req.body,
        questionID: req.params.qID
    });
});

// PUT /questions/:qID/answers/:aID
// Edit a specific answer
router.put("/:qID/answers/:aID", (req, res) => {
    res.json({
        response: "Received a PUT request to /answers",
        body: req.body,
        questionID: req.params.qID,
        answerID: req.params.aID
    });
});

// DELETE /questions/:qID/answers/:aID
// Delete a specific answer
router.delete("/:qID/answers/:aID", (req, res) => {
    res.json({
        response: "Received a DELETE request to /answers",
        questionID: req.params.qID,
        answerID: req.params.aID
    });
});

// POST /questions/:qID/answers/:aID/vote-up
// POST /questions/:qID/answers/:aID/vote-down
// Vote for a specific answer
router.post("/:qID/answers/:aID/vote-:dir", (req, res, next) => {
    if(req.params.dir.search(/^(up|down)$/) === -1) {
        const err = new Error("Not Found");
        err.status = 404;
        next(err);
    } else {
        next();
    }
}, (req, res) => {
    res.json({
        response: `Received a POST request to /vote-${req.params.dir}`,
        questionID: req.params.qID,
        answerID: req.params.aID,
        vote: req.params.dir
    });
});

// Catch 404 error and forward to error handler
router.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// Error Handler
router.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

module.exports = router;