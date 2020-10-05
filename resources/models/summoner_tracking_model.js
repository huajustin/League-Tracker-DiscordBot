const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const summonerTrackingSchema = new Schema({
    name: String,
    channelsTracking: [String],
});

module.exports = mongoose.model('summonerTracking', summonerTrackingSchema);