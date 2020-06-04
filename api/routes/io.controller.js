const l = require('utils/logging')

module.exports = function(socket) {
    socket.on('terminate', (socket) => {
        l.log("Disconnecting")
    })
};