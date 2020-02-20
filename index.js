
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
console.log(inputFileName)
// solver.start(inputFileName).then(() => engine.calculatePoints(inputFileName)).then(points => console.log(points));
