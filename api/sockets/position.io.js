export class PositionHandler {
    constructor(socket, locations) {
        this.socket = socket;
        this.locations = locations
        // Expose handler methods for events
        this.handler = {
            positionChanged: this.positionChanged, // use the bind function to access this.app
        };
    }


    positionChanged = (data) => {
        this.locations.addUser({
            key: socket.decoded_token.sub,
            socketID: socket.id,
            userID: socket.decoded_token.sub,
            long: data.longitude,
            lat: data.latitude,
            username: data.username
        })

        this.socket.broadcast.emit('position_update', {
            socketID: socket.id,
            userID: socket.decoded_token.sub,
            long: data.longitude,
            lat: data.latitude,
            username: data.username
        });

    }


}

