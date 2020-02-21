const { log } = require('./common/logger');

function calculateScore(libraries, booksData, totalDays) {
    let remainingDays = totalDays;
    let score = 0;
    for (let i = 0; i < libraries.length; i++) {
        const usableBooks = libraries[i].books.slice(0, remainingDays - libraries[i].signupTime);
        remainingDays -= libraries[i].signupTime;
        for (let j = 0; j < usableBooks.length; j++) {
            score += parseInt(booksData[usableBooks[j]].score);
        }
    }
    return score;
}

module.exports = {
    calculateScore
};
