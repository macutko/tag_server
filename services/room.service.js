import {Room as Room} from '../models/db'
import distance from "../utils/math";

module.exports = {
    create,
    getAvailable
};

async function create(params, userID) {
    // validate
    console.log(JSON.stringify(params))
    if (params.latitude == null) throw 'The latitude must be defined'
    if (params.longitude == null) throw 'The longitude must be defined'
    if (params.name == null) throw 'The name must be defined'

    if (await Room.findOne({name: params.name})) throw 'A room by this name already exists!'

    const room = new Room({
        owner: userID,
        latitude: params.latitude,
        longitude: params.longitude,
        name: params.name
    });

    // save
    await room.save();
    return room.toJSON()
}

async function getAvailable(params) {
    // validate

    if (params.latitude == null || params.longitude == null) throw 'The position must be defined'
    let distanceFromZero = distance(0, 0, params.latitude, params.longitude)

    // https://stackoverflow.com/questions/15258078/latitude-longitude-and-meters
    // 360*d/40075.04
    // d = 5km in our case
    let latAmount = 360 * 5 / 40075.04

    let boundsLat = [Number(params.latitude) - latAmount, Number(params.latitude) + latAmount]
// tbh: not too worried about these bounds
    if (boundsLat[0] > 90) throw `Error, this can't happen as t1hat would mean the ${params.latitude} is greater than 90 as well`
    if (boundsLat[0] < -90) throw `Error, this can't happen as t1hat would mean the ${params.latitude} is less than -90 as well`

    if (boundsLat[1] > 90) boundsLat[1] = 90
    if (boundsLat[1] < -90) boundsLat[1] = -90


    // 360*d/(40075.04*cos(latitude))
    let longAmount = Math.abs(360 * 5 / (40075.04 * Math.cos(Number(params.latitude))))

    let boundsLong = [Number(params.longitude) - longAmount, Number(params.longitude) + longAmount]

    if (boundsLong[0] > 180) boundsLong[0] = boundsLong[0] - 360
    if (boundsLong[1] > 180) boundsLong[1] = boundsLong[1] - 360
    if (boundsLong[0] < -180) boundsLong[0] = boundsLong[0] + 360
    if (boundsLong[1] < -180) boundsLong[1] = boundsLong[1] + 360


    if (boundsLong[0] > 175 && boundsLong[1] < -175) {

        return Room.find({
            $or: [{'longitude': {$gte: boundsLong[0]}}, {'longitude': {$lte: boundsLong[1]}}],
            latitude: {$gte: boundsLat[0], $lte: boundsLat[1]},
        })
    }


    return Room.find({
        latitude: {$gte: boundsLat[0], $lte: boundsLat[1]},
        longitude: {$gte: boundsLong[0], $lte: boundsLong[1]}
    });

}

