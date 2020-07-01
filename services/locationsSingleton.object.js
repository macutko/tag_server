import {error} from "../utils/logging";

let instance = null;

export class locationObject {
    constructor() {

        if (!instance) {
            this.users = {}
            instance = this;
        }
        return instance;
    }

    addUser = (data) => {
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

}
