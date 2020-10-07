import {Location as Location} from '../../models/db'

module.exports = {
    create,
};

// async function getById(id) {
//     return await Location.findById(id);
// }

async function create(locationParam, userID) {
    // validate

    if (await Location.findOne({user_id: userID})) throw 'This user already has a location object! We have a problem!'
    if (locationParam.longitude == null || locationParam.latitude == null) throw 'We need some notion of position!'

    const location = new Location({
        longitude: locationParam.longitude,
        latitude: locationParam.latitude,
        user: userID
    });

    // save
    await location.save();
}

// async function update(userID, locationParam) {
//     const location = await Location.findOne({user_id: userID});
//
//     // validate
//     if (!location) throw new NoKeyInDB("Update function on location: ID wasn't found in the DB!");
//
//     // copy userParam properties to user
//     Object.assign(location, ({
//         longitude: locationParam.longitude,
//         latitude: locationParam.latitude,
//         user_id: userID
//     }));
//
//     await location.save();
// }
//
// async function _delete(id) {
//     await User.findByIdAndRemove(id);
// }