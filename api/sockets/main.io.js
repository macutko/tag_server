import {log} from "../../utils/logging";

export class MainHandler {
    constructor(socket, locations) {
        this.socket = socket;
        this.locations = locations

        // Expose handler methods for events
        this.handler = {
            terminate: this.terminate,
        };
    }


    terminate = (data) => {
        log(`User ${ this.socket.decoded_token.sub} has terminated his connection.`)


        this.locations.removeUser(this.socket.decoded_token.sub)
        // socket.broadcast.emit('user_disconnected', {
        //     userID: socket.decoded_token.sub
        // });
        log(`Remaining users: ${this.locations.getUsernames()}`)


    }


}

