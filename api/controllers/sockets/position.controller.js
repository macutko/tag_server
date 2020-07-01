import {log, error} from "../../../utils/logging";

module.exports = function (socket, locations) {
    socket.on('position_changed', (data) => {
        locations.addUser({
            key: socket.decoded_token.sub,
            socketID: socket.id,
            userID: socket.decoded_token.sub,
            long: data.longitude,
            lat: data.latitude,
            username: data.username
        })

        socket.broadcast.emit('position_update', {
            socketID: socket.id,
            userID: socket.decoded_token.sub,
            long: data.longitude,
            lat: data.latitude,
            username: data.username
        });

        log(`Showing the current list of active users: ${locations.getUsernames()}`)


    });


};