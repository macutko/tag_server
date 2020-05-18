const config = require('config/config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('models/db');
const Location = db.UserLocation;
const l = require("../utils/logging");
module.exports = {
    getById,
    create,
    update,
    delete: _delete
};

async function getById(id) {
    return await Location.findById(id);
}

async function create(locationParam, userID) {
    // validate

    if (await Location.findOne({user_id: userID})) {
        throw 'This user already has a location object! We have a problem!';
    }
    l.log({longitude:locationParam.longitude, latitude:locationParam.latitude,user_id: userID});
    const location = new Location({longitude:locationParam.longitude, latitude:locationParam.latitude,user_id: userID});


    // save user
    await location.save();
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({username: userParam.username})) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}