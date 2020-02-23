const { log } = require('../common/logger');

const evaluateLibrariesValue = (libraries, remainingDays) => {
    return libraries.map(library => {
        const totalBooksScore = removeUnscannableBooks(library, remainingDays).reduce(
            (totalScore, book) => totalScore + parseInt(book.score),
            0
        );
        const libraryScore = totalBooksScore * parseInt(library.bookScannedPerDay);
        return {
            ...library,
            score: totalBooksScore,
            efficiency: libraryScore
        };
    });
};

const removeUnscannableBooks = (lib, remainingDays) => {
    const maxPotentialBook = (remainingDays - lib.signupTime) * lib.bookScannedPerDay;
    if (maxPotentialBook > lib.books.length - 1) return lib.books;
    return lib.books.slice(0, maxPotentialBook);
};

const removeAlrdyUsedBooks = (books, booksAlreadyUsed) => books.filter(it => !booksAlreadyUsed.includes(it.id));
const solver = (days, libraries) => {
    log('Solver Loïc is running..');
    log('There is ' + days + ' days');
    let remainingDays = days;

    const filteredLibs = libraries.filter(lib => !(!lib.books || lib.books.length === 0));
    // Libraries sorted by efficiency
    // let evaluatedLibraries = evaluateLibrariesValue(libraries).sort((a, b) => b.efficiency - a.efficiency);
    let evaluatedLibraries = evaluateLibrariesValue(filteredLibs, remainingDays).sort(
        (a, b) => b.efficiency - a.efficiency
    );

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
            const sortBooksByScoreAndRemoveDuplicate = removeAlrdyUsedBooks(
                evaluatedLibraries[0].books,
                booksAlreadyUsed
            ).sort((a, b) => b.score - a.score);

            remainingDays -= evaluatedLibraries[0].signupTime;
            const booksToEnroll = sortBooksByScoreAndRemoveDuplicate.map(it => it.id).slice(0, remainingDays);

            booksAlreadyUsed.push(...booksToEnroll);
            // console.log('remainingDays', remainingDays);
            librariesEnrolled.push({ ...evaluatedLibraries[0], books: booksToEnroll });
            // console.log('books to enroll', booksToEnroll);
        }
        // Ici on est sûr que de toute façon la première a été ou ne sera jamais enrolled
        evaluatedLibraries.shift();
    }
    console.timeEnd('a');
    return librariesEnrolled.filter(libs => libs.books.length > 0);
};

module.exports = solver;
