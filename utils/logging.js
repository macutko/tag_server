const chalk = require("chalk");
log = (text) => {
    console.log(chalk.bgWhite.bold("LOG:") + (" " + text))
};


module.exports = {log};