const fs = require('fs');

function generateRandomId(){
  return Math.floor(Math.random() * 10000);
}

function save(data){
  return new Promise((resolve, reject) => {
    fs.writeFile('./data/quotes.json', JSON.stringify(data, null, 2), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

/**
 * Gets all quotes
 * @param None
 */
function getQuotes(){
  return new Promise((resolve, reject) => {
    fs.readFile('./data/quotes.json', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const json = JSON.parse(data);
        resolve(json);
      }
    });
  });
}

/**
 * Gets a specific quote by ID
 * @param {number} id - Accepts the ID of the specified quote.
 */
async function getQuote(id){
  const quotes = await getQuotes();
  return quotes.quotes.find(quote => quote.id == id);
}
/**
 * Gets a random quote
 * @param None
 */
async function getRandomQuote(){
  const quotes = await getQuotes();
  const randNum = Math.floor(Math.random() * quotes.quotes.length);
  return quotes.quotes[randNum];
}

/**
 * Creates a new quote quote
 * @param {Object} newQuote - Object containing info for new quote: the quote text, author and year
 */
async function createQuote(newQuote) {
  const quotes = await getQuotes();

  newQuote.id = generateRandomId();
  quotes.quotes.push(newQuote);
  await save(quotes);
  return newQuote;
}

/**
 * Updates a single quote
 * @param {Object} newQuote - An object containing the changes to quote: quote, author, year (all optional)
 */
async function updateQuote(newQuote){
  const quotes = await getQuotes();
  let quote = quotes.quotes.find(item => item.id == newQuote.id);

  quote.quote = newQuote.quote;
  quote.author = newQuote.author;
  quote.year = newQuote.year;

  await save(quotes);
}

/**
 * Deletes a single quote
 * @param {Object} quote - Accepts quote to be deleted.
 */
async function deleteQuote(quote){
  const quotes = await getQuotes();
  quotes.quotes = quotes.quotes.filter(item => item.id != quote.id);
  await save(quotes);
}

module.exports = {
  getQuotes,
  getQuote,
  createQuote,
  updateQuote,
  deleteQuote,
  getRandomQuote
}
