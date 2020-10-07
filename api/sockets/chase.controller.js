import {start_chase, escaped_chase, lost_chase, won_chase, log} from "../../utils/logging";

module.exports = function (socket, io) {

    socket.on('initiate_chase', (data, acknowledgmentFunction) => {

        log(`${data.chaserUsername} is attempting a chase on ${data.targetUsername}`)
        // TODO: wrap in try and catch in case of undefined socket -m eans we have a ghost
        io.sockets.connected[data.targetSocketID].emit('initiate_chase', {
            chaserSocketID: data.chaserSocketID,
            chaserUsername: data.chaserUsername
        }, (error, response) => {
            if (response === true) {
                // this means that the recieving end is happy to proceed
                acknowledgmentFunction(null, true)
                start_chase(data.chaserUsername, data.targetUsername)
            } else {
                acknowledgmentFunction(null, false)
                log(`${data.chaserUsername} chase didn't start on ${data.targetUsername}`)
            }
        })


    });
    socket.on('escaped_chase', (data) => {
        escaped_chase(data.meUsername, data.otherUsername)
        io.to(data.theOtherSocketID).emit('escaped_chase', {
            username: data.otherUsername,
            senderUsername: data.meUsername
        })
    })
    socket.on('lost_chase', (data) => {
        lost_chase(data.loserUsername, data.chaserUsername)
        io.to(data.chaserSocketID).emit('won_chase', {loserUsername: data.loserUsername})
    })
    socket.on('won_chase', (data) => {
        won_chase(data.loserUsername, data.chaserUsername)
        io.to(data.loserSocketID).emit('lost_chase', {chaser: data.chaserUsername})
    })
}