const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const summonerSchema = new Schema({
    summoner: String,
    name: String,
});

// module.exports.Summoner = summonerSchema;
module.exports = mongoose.model('Summoner', summonerSchema);