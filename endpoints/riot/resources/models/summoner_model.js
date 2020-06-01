const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const summonerSchema = new Schema({
    summoner: String,

});

module.exports.Summoner = summonerSchema;