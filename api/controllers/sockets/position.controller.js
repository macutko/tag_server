const l = require('utils/logging')

module.exports = function (socket, io) {

    socket.on('position_changed', (data) => {

        socket.broadcast.emit('position_update', {
            socketID: socket.id,
            userID: socket.decoded_token.sub,
            long: data.longitude,
            lat: data.latitude
        });
        l.log("Updating pos from socket ID: " + socket.id)
    });



};