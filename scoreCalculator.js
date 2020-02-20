const { log } = require('./common/logger');

function calculateScore(librairies, booksData) {
    const books = librairies.reduce((books, lib) => [...books, ...lib.books], []);
    const scoringBooks = [...new Set(books)];
    return scoringBooks.reduce((acc, it) => parseInt(booksData[it].score) + acc, 0);
}

module.exports = {
    calculateScore
};
