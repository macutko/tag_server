const l = require('utils/logging')

module.exports = function (socket, io) {

    socket.on('position_changed', (data) => {

        socket.broadcast.emit('position_update', {
            socketID: socket.id,
            userID: socket.decoded_token.sub,
            long: data.longitude,
            lat: data.latitude,
            username: data.username
        });
        l.log(`Updating pos from socket ID: ${socket.id} username: ${data.username} user id: ${socket.decoded_token.sub}`)
    });


};