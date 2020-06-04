require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('api/middlewares/jwt');
const errorHandler = require('api/middlewares/error-handler');
const config = require('config/config.json');
const l = require('utils/logging')
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./api/routes/users.controller'));
app.use('/location', require('./api/routes/userLocation.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : (config.PORT || 4000);
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const socketioJwt = require('socketio-jwt');

io.on('connection', socketioJwt.authorize({
    secret: config.secret,
    pingInterval: 10000,
    pingTimeout: 3000,
    timeout: 15000 // 15 seconds to send the authentication message
})).on('authenticated', function (socket) {
    //this socket is authenticated, we are good to handle more events from it.
    require('api/routes/IO_position.controller')(socket,io)
    require('api/routes/io.controller')(socket)
    l.log('User id connected ' + socket.decoded_token.sub);
})

server.listen(port, () => console.log("server running on port:" + port));

