const chalk = require("chalk");
log = (text) => {
    let d = Date(Date.now())
    console.log(chalk.bgWhite.bold(d.toString() + " LOG:") + (" " + text))
};

err = (text) => {
    let d = Date(Date.now())
    console.log(chalk.bgRed.bold(d.toString() + " ERROR:") + (" " + text))
};


module.exports = {log, err};