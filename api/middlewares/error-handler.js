const l = require("../../utils/logging");

module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        // custom application error
        l.err(err.message);
        return res.status(400).json({message:  "400" + err});
    }

    if (err.name === 'NoKeyInDB') {
        l.err(err.message);
        return res.status(500).json({message: "Internal server error! Please contact admin."});
    }

    if (err.name === 'ValidationError') {
        // mongoose validation error
        l.err(err.message);
        return res.status(400).json({message: "400" + err.message});
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        l.err(err.message);
        return res.status(401).json({message: 'Invalid Token or unknown URL'});

    }
    l.err(err.message);

    // default to 500 server error
    return res.status(500).json({message: err.message});
}