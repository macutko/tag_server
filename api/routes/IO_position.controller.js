const l = require('utils/logging')

module.exports = function (socket, io) {

    socket.on('position_changed', (data) => {
        socket.broadcast.emit('position_update', {uid: socket.decoded_token.sub, long: data.longitude, lat: data.latitude});
        l.log("Updating pos to everyone")
        l.log(JSON.stringify(data))
        l.log(JSON.stringify(socket.decoded_token))
    });

    // socket.on('eventName2', function() {
    //     //...
    // });

};