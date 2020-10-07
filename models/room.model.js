import {model, Schema} from 'mongoose'

const latitude = (val) => {
    return val >= -90 && val <= 90
}


const longitude = (val) => {
    return val >= -190 && val <= 180
}


const schema = new Schema({
    owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    latitude: {type: Number, required: true, validate: [latitude, 'Latitude can only be -90 to 90']},
    longitude: {type: Number, required: true, validate: [longitude, 'Longitude can only be -180 to 180']},

    name: {type: String, required: true, unique: true},
    createdDate: {type: Date, default: Date.now},
    official: {type: Schema.Types.Boolean, default: false},

});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = model('Room', schema);