require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('api/middlewares/jwt');
const errorHandler = require('api/middlewares/error-handler');
const config = require('config/config.json');

app.use(bodyParser.urlencoded({ extended: false }));
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
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : ( config.PORT || 4000);
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
