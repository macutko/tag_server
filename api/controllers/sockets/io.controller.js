import {log} from "../../../utils/logging"

module.exports = function (socket, locations) {

    socket.on('terminate', (data) => {

        locations.removeUser(socket.decoded_token.sub)
        socket.broadcast.emit('user_disconnected', {
            userID: socket.decoded_token.sub
        });

        log(`Disconnecting: current users: ${locations.getUsernames()}`)
    })
};