const readline = require('readline');
const fs = require('fs');

async function read(inputFileName) {
    return new Promise ((resolve => {
        const rdOut = readline.createInterface({
            input: fs.createReadStream(`../input/${inputFileName}.txt`),
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
                data.books = lineIn.split(' ').map((score) => ({ score }));
            }
            // odd is lib info
            else if (lineCounter % 2 === 1) {
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
                data.libraries[data.libraries.length - 1] = books;
            }

            // stringOut += `$|{lineOut}`;
            lineCounter++;
            if (lineCount === lineCounter) {
                resolve(data);
            }
        });
    }));
}

async function parse(inputFileName) {
    const string = await read(inputFileName);
    console.log(string);
}

parse('a_example');
module.exports = {
    parse,
};