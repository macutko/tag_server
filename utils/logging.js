const chalk = require("chalk");
log = (text) => {

    console.log(chalk.bgWhite.bold(Date(Date.now()).toString() + " LOG:") + (" " + text))
};
escaped_chase = (senderUsername, username) => {

    console.log(chalk.bgCyanBright.bold(Date(Date.now()).toString() + " Escaped chase:") + (username + " escaped a chase with:" + senderUsername))
};
start_chase = (chaser, target) => {

    console.log(chalk.bgBlueBright.bold(Date(Date.now()).toString() + " Start chase:") + (chaser + " started a chase on user :" + target))
};
lost_chase = (loser, chaser) => {

    console.log(chalk.bgRedBright.bold(Date(Date.now()).toString() + " Lost chase:") + (loser + " has lost to " + chaser))
}

won_chase = (loser, chaser) => {

    console.log(chalk.bgGreenBright.bold(Date(Date.now()).toString() + " Won chase:") + (chaser + " has won over " + loser))
}


err = (text) => {
    console.log(chalk.bgRed.bold(Date(Date.now()).toString() + " ERROR:") + (" " + text))
};


module.exports = {log, err, start_chase, lost_chase, won_chase, escaped_chase};
