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

    socket.on('initiate_chase', (data) => {
        l.log("CHASE IS ON BIIIIITCH!")
        console.log(data)
        io.to(data.socketID).emit('give_me_your_position')
    });

};