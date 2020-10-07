import {config} from "../config";
import mongoose from 'mongoose'

const connectionOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};
mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions);
mongoose.Promise = global.Promise;

module.exports = {
    User: require('./user.model'),
    Location: require('./location.model'),
    Error: require('./error.model'),
    Room: require('./room.model'),

};
