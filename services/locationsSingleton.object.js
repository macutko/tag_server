import {error} from "../utils/logging";

let instance = null;

export class locationObject {
    constructor(io) {

        if (!instance) {
            this.users = {}
            this.io = io
            instance = this;
        }
        return instance;
    }

    addUser = (data) => {
        //first lets check somebody isnt trying to login twice
        // if the user is already in the list, and the old socketID is still connected and
        // the new socketID != old one
        if ((data.key in this.users) && (this.io.sockets.connected[this.users[data.key].socketID])
            && this.users[data.key].socketID !== data.socketID) {
            // then dump the old socketID
            this.io.sockets.connected[this.users[data.key].socketID].disconnect();
        }


        this.users[data.key] = {
            socketID: data.socketID,
            userID: data.userID,
            long: data.long,
            lat: data.lat,
            username: data.username
        }
    }
    removeUser = (userID) => {
        try {
            delete this.users[userID]
        } catch (e) {
            error(e)
        }
    }
    getUsers = () => {
        return this.users
    }
    getUsernames = () => {
        let r = []
        for (let key in this.users) {
            r.push(this.users[key].username)
        }
        return r
    }

}
