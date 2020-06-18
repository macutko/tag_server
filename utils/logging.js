const chalk = require("chalk");
let d = Date(Date.now())
log = (text) => {

    console.log(chalk.bgWhite.bold(d.toString() + " LOG:") + (" " + text))
};
escaped_chase = (socketID, username) => {

    console.log(chalk.bgBlueBright.bold(d.toString() + " Escaped chase:") + (username + " escaped a chase on the socket ID:" + socketID))
};
start_chase = (chaser, target) => {

    console.log(chalk.bgBlueBright.bold(d.toString() + " Start chase:") + (chaser + " started a chase on user :" + target))
};
lost_chase = (loser, chaser) => {

    console.log(chalk.bgRedBright.bold(d.toString() + " Lost chase:") + (loser + " has lost to " + chaser))
}

won_chase = (loser, chaser) => {

    console.log(chalk.bgGreenBright.bold(d.toString() + " Won chase:") + (chaser + " has won over " + loser))
}


err = (text) => {
    let d = Date(Date.now())
    console.log(chalk.bgRed.bold(d.toString() + " ERROR:") + (" " + text))
};


module.exports = {log, err, start_chase, lost_chase, won_chase, escaped_chase};
