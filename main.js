import 'rootpath'

import express from 'express'

const app = express();
import cors from 'cors'
import bodyParser from 'body-parser'
import jwt from './api/middlewares/jwt'
import {errorHandler} from './api/middlewares/error-handler'
import {createServer} from "http"
import listen from "socket.io"
import {config} from './config/config.js'
import {authorize} from "socketio-jwt"
import {locationObject} from "./services/locationsSingleton.object";

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./api/controllers/users.controller'));
app.use('/location', require('./api/controllers/userLocation.controller'));
app.use('/client-error', require('./api/controllers/clientError.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 8080) : (config.PORT || 4000);
const server = createServer(app);
const io = listen(server);

let locations = new locationObject(io)
io.on('connection', authorize({
    secret: config.secret,
    pingInterval: 10000,
    pingTimeout: 3000,
    timeout: 15000 // 15 seconds to send the authentication message
})).on('authenticated', function (socket) {
    //this socket is authenticated, we are good to handle more events from it.

    require('./api/controllers/sockets/position.controller')(socket,locations)
    require('./api/controllers/sockets/chase.controller')(socket, io)
    require('./api/controllers/sockets/io.controller')(socket,locations)
    io.to(socket.id).emit('initial_location_status',{locations:locations.getUsers(socket.decoded_token.sub)})
})

server.listen(port, () => console.log("server running on port:" + port));

