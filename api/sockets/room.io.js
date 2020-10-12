import {error} from "../../utils/logging";

export class RoomHandler {
    constructor(socket, locations) {
        this.socket = socket;
        this.locations = locations

        // Expose handler methods for events
        this.handler = {
            joinRoom: this.joinRoom,
        };
    }


    joinRoom = (data) => {
        // this.locations.addOrAmendLocation({
        //     currentPosition: data.currentPosition,
        //     socketID: this.socket.id,
        //     userID: this.socket.decoded_token.sub,
        // }).then().catch(err =>  error(`currentLocationChange ${err}`))

        console.log("got here")
        // this.socket.broadcast.emit('position_update', {
        //     socketID: socket.id,
        //     userID: socket.decoded_token.sub,
        //     long: data.longitude,
        //     lat: data.latitude,
        //     username: data.username
        // });

    }


}

