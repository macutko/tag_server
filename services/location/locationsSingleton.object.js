import {User as User} from '../../models/db'
import {error, log} from "../../utils/logging";

let instance = null;

export class LocationsSingletonObject {
    constructor(io) {
        if (!instance) {
            this.users = {}
            this.io = io
            instance = this;
        }
        return instance;
    }


    addOrAmendLocation = async (data) => {
        // if the user is already playing but under a different socket id, kick the old socket

        if ((data.userID in this.users) && this.users[data.userID].socketID !== data.socketID && this.io.sockets.connected[this.users[data.userID].socketID]) {
            this.io.sockets.connected[this.users[data.userID].socketID].disconnect()
        }

        let user = await User.findById(data.userID)

        this.users[data.userID] = {
            socketID: data.socketID,
            userID: data.userID,
            currentPosition: data.currentPosition,
            username: user.username
        }
        log(`${user.username} updated position, amount of user locations: ${Object.keys(this.users).length} and amount of sockets opened: ${Object.keys(this.io.sockets.connected).length}`)
    }


    removeUser = (userID) => {
        try {
            delete this.users[userID]
        } catch (e) {
            error(e)
        }
    }
    // getUsers = (currentUser = undefined) => {
    //     if (currentUser !== undefined) {
    //         let cop = this.users
    //         delete cop[currentUser]
    //
    //         return cop
    //     }
    //     return this.users
    // }
    getUsernames = () => {
        let r = []
        for (let key in this.users) {
            r.push(this.users[key].username)
        }
        return r
    }
}


