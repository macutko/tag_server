const chalk = require("chalk");
log = (text) => {
    console.log(chalk.bgWhite.bold("LOG:") + (" " + text))
};

err = (text) => {
    console.log(chalk.bgRed.bold("ERROR:") + (" " + text))
};


module.exports = {log, err};