
const {CustomError} = require("../../utils/errors");

const l = require("../../utils/logging");
const errorService = require('../../services/error.service');

module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    let message, status;
    if (typeof (err) === 'string') {
        // custom application error
        status = 400
        message = "400" + err.message
    } else if (err.name === 'NoKeyInDB') {
        status = 500
        message = "Internal server error! Please contact admin."
    } else if (err.name === 'ValidationError') {
        // mongoose validation error
        status = 400
        message = "400" + err.message
    } else if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        status = 401
        message = 'Invalid Token or unknown URL'

    } else {
        // default to 500 server error
        status = 500
        message = err.message
    }
    l.err(err.message);

    const error = new CustomError(message, "EXCEPTION_SERVER")
    errorService.create(error)
        .then(() => {
            return res.status(status).json({message: message});
        })

}
