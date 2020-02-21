const { log } = require('../common/logger');

const evaluateLibrariesValue = libraries => {
    return libraries
        .filter(lib => !(!lib.books || lib.books.length === 0))
        .map(library => {
            const totalBooksScore = library.books.reduce((totalScore, book) => totalScore + parseInt(book.score), 0);
            const efficiency = totalBooksScore * library.bookScannedPerDay;
            return {
                ...library,
                score: totalBooksScore,
                efficiency
            };
        });
};
const solver = (days, libraries) => {
    log('Solver Loïc is running..');
    log('There is ' + days + ' days');
    // Libraries sorted by efficiency
    const evaluatedLibraries = evaluateLibrariesValue(libraries).sort((a, b) => b.efficiency - a.efficiency);
    let remainingDays = days;
    console.time('a');
    let librariesEnrolled = [];
    let librariesToEnrollLater = [];
    let booksAlreadyUsed = [];
    while (remainingDays > 0) {
        // Si je trouve plus de librairies enregistrable en temps -> fini
        if (!evaluatedLibraries.find(lib => lib.signupTime < remainingDays)) {
            console.log('Tried every libraries, remaining days unused to signup: ', remainingDays);
            break;
        }
        // si la library peut-être prise car il y a le temps de signup au moins un livre
        if (evaluatedLibraries[0].signupTime < remainingDays) {
            const sortBooksByScoreAndRemoveDuplicate = evaluatedLibraries[0].books
                // .map(it => it.id)
                .filter(it => !booksAlreadyUsed.includes(it.id))
                .sort((a, b) => b.score - a.score);
            const booksToEnroll = sortBooksByScoreAndRemoveDuplicate.map(it => it.id);
            booksAlreadyUsed.push(...booksToEnroll);
            remainingDays -= evaluatedLibraries[0].signupTime;
            // console.log('remainingDays', remainingDays);
            librariesEnrolled.push({ ...evaluatedLibraries[0], books: booksToEnroll });
            // console.log('books to enroll', booksToEnroll);
        }
        // Ici on est sûr que de toute façon la première a été ou ne sera jamais enrolled
        evaluatedLibraries.shift();
    }
    console.timeEnd('a');

    // log(librariesEnrolled);
    return librariesEnrolled;
};

module.exports = solver;
