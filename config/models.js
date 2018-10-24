const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sortAnswers = function(a, b) {
    // - negative a before b
    // 0 no change
    // + postive a after b
    if(a.votes === b.votes) {
        if(a.updatedAt > b.updatedAt) {
            return -1;
        } else if(a.updatedAt < b.updatedAt) {
            return 1;
        } else {
            return 0;
        }
    }
    return b.votes - a.votes;
};

const AnswerSchema = new Schema({
    text: String,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    votes: {type: Number, default:0}
});

const QuestionSchema = new Schema({
    text: String,
    createdAt: {type: Date, default: Date.now},
    answers: [AnswerSchema]
});

QuestionSchema.pre("save", () => {
    this.answers.sort();
    next();
});

const Question = mongoose.model("Question", QuestionSchema);

module.exports.Question = Question;