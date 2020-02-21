function calculateScore(library, daysLeft, booksScanned = []) {
    const remainingBooks = library.books
        ? library.books.filter(book => !booksScanned.includes(book.id)).sort((a, b) => a.score < b.score)
        : [];
    const daysToScan = daysLeft - library.signupTime;
    const scannedBooks = remainingBooks.slice(0, daysToScan * library.bookScannedPerDay);

    return {
        score: scannedBooks.reduce((acc, book) => book.score + acc, 0),
        scannedBooks
    };
}

const memory = {};

function memo(library, daysLeft, booksScanned) {
    const index = [library.libId, daysLeft, booksScanned.join('.')].join('_');

    if (memory[index]) {
        return JSON.parse(memory[index]);
    } else {
        const result = calculateScore(library, daysLeft, booksScanned);
        memory[index] = JSON.stringify(result);
        return result;
    }
}

// function algo(libraryRemaining, daysLeft, bookScanned) {
//     let best;
//     for(let e of libraryRemaining){
//         const result = memo(e,daysLeft,bookScanned);
//
//         if(daysLeft - e.signupTime > 0){
//             const resultAlgo = algo(libraryRemaining.filter(lib => lib.id !== e.id, daysLeft - e.signupTime, [ ...bookScanned, ...result.scannedBooks]));
//         }
//     }
// }

function algo(libraryRemaining, daysLeft, bookScanned = []) {
    let best = null;
    for (let e of libraryRemaining) {
        const result = calculateScore(e, daysLeft, bookScanned);

        if (!(best && best.score) || result.score > best.score) best = { ...result, lib: e };
    }
    const otherLibs = libraryRemaining.filter(lib => lib.libId !== best.lib.libId);

    if (otherLibs.length && daysLeft - best.lib.signupTime > 0) {
        return [
            JSON.stringify(best),
            ...algo(otherLibs, daysLeft - best.lib.signupTime, [
                ...bookScanned,
                ...best.scannedBooks.map(book => book.id)
            ])
        ];
    } else {
        return [JSON.stringify(best)];
    }
}

function parseOutput(result) {
    return result
        .map(toParse => JSON.parse(toParse))
        .map(res => ({
            books: res.scannedBooks.map(book => book.id),
            numberOfBooks: res.scannedBooks.length,
            libId: res.lib.libId,
            score: res.score
        }));
}

module.exports = {
    algo,
    parseAlgoOutput: parseOutput
};
// console.log(
//     parseOutput(
//         algo(
//             [
//                 {
//                     id: 0,
//                     books: [
//                         { id: 1, score: 2 },
//                         { id: 2, score: 2 },
//                         { id: 0, score: 2 }
//                     ],
//                     signupTime: 2,
//                     bookScannedPerDay: 1
//                 },
//                 {
//                     id: 1,
//                     books: [
//                         { id: 5, score: 2 },
//                         { id: 12, score: 2 },
//                         { id: 13, score: 2 }
//                     ],
//                     signupTime: 2,
//                     bookScannedPerDay: 1
//                 },
//                 {
//                     id: 2,
//                     books: [
//                         { id: 6, score: 2 },
//                         { id: 8, score: 2 },
//                         { id: 11, score: 2 }
//                     ],
//                     signupTime: 2,
//                     bookScannedPerDay: 1
//                 },
//                 {
//                     id: 3,
//                     books: [
//                         { id: 8, score: 2 },
//                         { id: 9, score: 2 },
//                         { id: 1, score: 2 }
//                     ],
//                     signupTime: 2,
//                     bookScannedPerDay: 1
//                 },
//                 {
//                     id: 4,
//                     books: [
//                         { id: 7, score: 2 },
//                         { id: 6, score: 2 },
//                         { id: 18, score: 2 }
//                     ],
//                     signupTime: 2,
//                     bookScannedPerDay: 1
//                 }
//             ],
//             25
//         )
//     )
// );
