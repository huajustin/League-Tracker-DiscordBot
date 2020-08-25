const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guildInfoSchema = new Schema({
    guildID: String,
    trackedSummoners: [String],
});

module.exports = mongoose.model('GuildInfo', guildInfoSchema);