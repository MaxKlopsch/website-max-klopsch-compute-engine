const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const colors = [
        'red',
        'orange',
        'yellow',
        'green',
        'blue',
        'purple'
    ];
    //  res.locals.prompt = "Who is buried in Grant's tomb?";
    res.locals = {
        prompt: "Who is buried in Grant's tomb?",
        hint: "Think about whose tomb it is.",
        colors: colors
    };
    res.render('card');
    //  res.render('card', {prompt: "Who is buried in Grant's tomb?"});
});

module.exports = router;