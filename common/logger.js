const util = require('util');

function log(text) {
    console.log(util.inspect(text, { showHidden: true, depth: null, colors: true }));
}

module.exports = {
    log
};
