const db = require('models/db');
const Location = db.UserLocation;
const l = require("../utils/logging");
const NoKeyInDB = require("../utils/errors");

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

    const location = new Location({
        longitude: locationParam.longitude,
        latitude: locationParam.latitude,
        user_id: userID
    });

    // save
    await location.save();
}

async function update(userID, locationParam) {
    const location = await Location.findOne({user_id: userID});

    // validate
    if (!location) throw new NoKeyInDB("Update function on location: ID wasn't found in the DB!");

    // copy userParam properties to user
    Object.assign(location, ({
        longitude: locationParam.longitude,
        latitude: locationParam.latitude,
        user_id: userID
    }));

    await location.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}