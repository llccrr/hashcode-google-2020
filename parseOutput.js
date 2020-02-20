const fs = require('fs');
const {log} = require('./common/logger')
const writeToFile = (path, value) =>
  new Promise(resolve => fs.writeFile(path, value, () => resolve()));


const parseOutput = (inputFileName, libraries) => {
    log(libraries);
    let content = '';
    const addLine = (str) => content += `${str}\n`;
    addLine(libraries.length);

    libraries.forEach(library => {
        addLine(library.libId + ' ' + library.books.length);
        addLine(library.books.join(' '));
    });
    writeToFile(`./output/${inputFileName}.out`,content)
};

module.exports = {
    parseOutput
};
