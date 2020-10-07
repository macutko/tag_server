const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true},
    latitude: {type: Number, required:true},
    longitude: {type: Number, required: true}
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
});

module.exports = mongoose.model('location', schema);