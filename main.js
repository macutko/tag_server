require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('api/middlewares/jwt');
const errorHandler = require('api/middlewares/error-handler');
const config = require('config/config.json');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const socketioJwt = require('socketio-jwt');
const l = require("utils/logging")

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

// set authorization for socket.io
io.sockets //TODO: double check the security of JWT here and whether it can be spoofed
    .on('connection', socketioJwt.authorize({
        secret: config.secret,
        timeout: 5000 // 15 seconds to send the authentication message
    }))
    .on('authenticated', (socket) => {
        //this socket is authenticated, we are good to handle more events from it.
        l.log(`User id ${socket.decoded_token.sub} joined the game`);
    });

const server = http.listen(port, function () {
    console.log('Server listening on port ' + port);
});
