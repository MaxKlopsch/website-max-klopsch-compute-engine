const express = require('express');

const app = express();

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/flashcards', (req, res) => {
    res.render('flashcards');
});

app.get('/cards', (req, res) => {
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

app.get('/test', (req, res) => {
    res.status(200).send('<h1>This is the test page!</h1>').end();
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});