const express = require('express');
const router = express.Router();
const Question = require("../config/models").Question;

// GET /questions
// Return question collection
router.get("/", (req, res, next) => {
    Question.find({}, null, {sort: {createdAt: -1}}, (err, questions) => {
        if(err) return next(err);
        res.json(questions);
    });
});

// POST /questions
// Create a question
router.post("/", (req, res, next) => {
    const question = new Question(req.body);
    question.save((err, question) => {
        if(err) return next(err);
        res.status(201);
        res.json(question);
    });
});

// GET /questions/:qID
// Return specific question
router.get("/:qID", (req, res, next) => {
    Question.findById(req.params.qID, (err, doc) => {
        if(err) return next(err);
        res.json(doc);
    });
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