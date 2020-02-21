const { parseOutput } = require('./parseOutput');
const { parseAlgoOutput, algo } = require('./edouard');
const { algoDim } = require('./dim');
const { calculateScore } = require('./scoreCalculator');
const solverLoic = require('./solvers/solverLoic');
const { parse } = require('./inputParser');
const { log } = require('./common/logger');

let inputFileName;
let solver;
switch (process.argv[2]) {
    case 'a':
        inputFileName = 'a_example';
        break;
    case 'b':
        inputFileName = 'b_read_on';
        break;
    case 'c':
        inputFileName = 'c_incunabula';
        break;
    case 'd':
        inputFileName = 'd_tough_choices';
        break;
    case 'e':
        inputFileName = 'e_so_many_books';
        break;
    default:
        inputFileName = 'f_libraries_of_the_world';
}
switch (process.argv[3]) {
    case 'loic':
        solver = solverLoic;
        break;
    case 'edouard':
        solver = (days, libraries) => parseAlgoOutput(algo(libraries, days));
        break;
    case 'dim':
        solver = algoDim;
        break;
}

parse(inputFileName).then(inputParsed => {
    // log(inputParsed);
    const libs = solver(inputParsed.days, inputParsed.libraries);
    // console.log(res);
    log(calculateScore(libs, inputParsed.books, inputParsed.days));
    parseOutput(inputFileName, libs);
});
