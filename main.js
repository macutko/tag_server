import 'rootpath'

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import jwt from './api/middlewares/jwt'
import {errorHandler} from './api/middlewares/error-handler'
import {createServer} from "http"
import {config} from './config.js'
import {authorize} from "socketio-jwt";
import {LocationsSingletonObject} from "./services/location/locationsSingleton.object";
import {PositionHandler, positionChangeHandler} from "./api/sockets/position.io";
import {log} from "./utils/logging";
import {MainHandler} from "./api/sockets/main.io";
import {RoomHandler} from "./api/sockets/room.io";

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());


// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/user', require('./api/controllers/user.controller'));
app.use('/room', require('./api/controllers/room.controller'));
app.use('/client-error', require('./api/controllers/clientError.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 8080) : (config.PORT || 4000);
const server = createServer(app);
const io = require('socket.io')(server);

let locations = new LocationsSingletonObject(io) //TODO: make a rooms singleton that holds all the rooms which have the locations

io.on('connection', authorize({
    secret: config.secret,
    timeout: 15000, // 15 seconds to send the authentication message
    pingInterval: 3000,
    pingTimeout: 2000,
})).on('authenticated', function (socket) {
    log(`New user connnected ${socket.decoded_token.sub}`)
    // Create event handlers for this socket
    let eventHandlers = {
        room: new RoomHandler(socket,locations),
        position: new PositionHandler(socket, locations),
        main: new MainHandler(socket,locations),
    };

    // Bind events to handlers
    for (let category in eventHandlers) {
        let handler = eventHandlers[category].handler;
        for (let event in handler) {
            socket.on(event, handler[event]);
        }
    }

    // require('./api/controllers/sockets/chase.controller')(socket, io)
    // require('./api/controllers/sockets/io.controller')(socket,locations)
    // io.to(socket.id).emit('initial_location_status',{locations:locations.getUsers(socket.decoded_token.sub)})


});
server.listen(port, () => console.log("server running on port:" + port));