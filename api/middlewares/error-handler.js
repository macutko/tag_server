import {error} from "../../utils/logging"

export function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        // custom application error
        error(err.message);
        return res.status(400).json({message:  "400" + err});
    }

    if (err.name === 'NoKeyInDB') {
        error(err.message);
        return res.status(500).json({message: "Internal server error! Please contact admin."});
    }

    if (err.name === 'ValidationError') {
        // mongoose validation error
        error(err.message);
        return res.status(400).json({message: "400" + err.message});
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        error(err.message);
        return res.status(401).json({message: 'Invalid Token or unknown URL'});

    }
    error(err.message);

    // default to 500 server error
    return res.status(500).json({message: err.message});
}