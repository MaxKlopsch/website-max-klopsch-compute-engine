const express = require('express');
const router = express.Router();
const Question = require("../config/models").Question;

router.param("qID", (req, res, next, id) => {
    Question.findById(id, (err, doc) => {
        if(err) return next(err);
        if(!doc) {
            err = new Error("Not Found");
            err.status = 404;
            return next(err);
        }
        req.question = doc;
        return next();
    });
});

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
    res.json(req.question);
});

// POST /questions/:qID/answers
// Create an answer to a question
router.post("/:qID/answers", (req, res, next) => {
    req.question.answers.push(req.body);
    req.question.save((err, question) => {
        if(err) return next(err);
        res.status(201);
        res.json(question);
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