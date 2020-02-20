const readline = require('readline');
const fs = require('fs');
const util = require('util');
const { log } = require('./common/logger');

async function read(inputFileName) {
    return new Promise ((resolve => {
        const rdOut = readline.createInterface({
            input: fs.createReadStream(`./input/${inputFileName}.txt`),
        });

        const data = {};
        let stringOut = '';
        let lineCount = 0;
        let lineCounter = 0;
        rdOut.on('line', (lineIn) => {
            // first line
            if (!lineCount) {
                const [books, libraries, days] = lineIn.split(' ');
                data.booksCount = books;
                data.librariesCount = libraries;
                data.days = days;
                data.libraries = [];
                lineCount = 2 * libraries + 2;
            }
            // second line
            else if (lineCounter === 1) {
                data.books = lineIn.split(' ').map((score, i) => ({ id: i, score }));
            }
            // odd is lib info
            else if (lineCounter % 2 === 0) {
                const [booksCount, signupTime, bookScannedPerDay] = lineIn.split(' ');
                data.libraries.push({
                    booksCount,
                    signupTime,
                    bookScannedPerDay,
                });
            }
            // even is books info
            else {
                const books = lineIn.split(' ');
                data.libraries[data.libraries.length - 1].books = books.map(id => data.books[id]);
            }

            lineCounter++;
            if (lineCount === lineCounter) {
                resolve(data);
            }
        });
    }));
}

async function parse(inputFileName) {
    return await read(inputFileName);
}

// parse('a_example');
module.exports = {
    parse,
};
