import {start_chase, escaped_chase, lost_chase, won_chase} from "../../../utils/logging";

module.exports = function (socket, io) {

    socket.on('initiate_chase', (data) => {
        start_chase(data.chaserUsername, data.targetUsername)
        io.to(data.targetSocketID).emit('initiate_chase', {
            chaserSocketID: data.chaserSocketID,
            chaserUsername: data.chaserUsername
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