const l = require('utils/logging')

module.exports = function (socket, io) {

    socket.on('initiate_chase', (data) => {
        l.log("CHASE IS ON BIIIIITCH!")
        console.log(data)
        io.to(data.socketID).emit('being_chased', {ID: data.socketID})

    });
    socket.on('escaped_chase', (data) => {
        console.log(data)
    })
    socket.on('lost_chase', (data) => {
        console.log(data)
    })
    socket.on('won_chase', (data) =>{
        console.log(data)
    })
}