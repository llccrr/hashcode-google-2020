const {parseOutput} = require('./parseOutput');

const { parse } = require('./inputParser');
const { log } = require('./common/logger');

let inputFileName;
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

parse(inputFileName).then(response =>{
    log(response);
    parseOutput(inputFileName, [{ libId: 3, books: [1,2,3,5]}, { libId: 4, books: [2,3,4,5]}])
} );
// solver.start(inputFileName).then(() => engine.calculatePoints(inputFileName)).then(points => console.log(points));
