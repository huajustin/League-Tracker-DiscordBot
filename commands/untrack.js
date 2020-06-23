const mongoose = require('mongoose');
const summonerSchema = require('../endpoints/riot/resources/models/summoner_mode.js');
const SummonerObject = mongoose.model('Summoner', summonerSchema);

module.exports = {
    name: 'untrack',
	description: 'Stops tracking a summoner',
	usage: 'untrack [summoner name]',
    cooldown: 5,
    execute(message, args) {
        if (args.length === 0) {
            return message.channel.send("Usage: !untrack <Summoner Name>", { reply: message.author });
        }

        const summonerName = args.join(" ");

        // TODO: Need to implement API monitor to watch for changes
        console.log(`Tracking ${summonerName} stopped`);
        message.reply(`Tracking ${summonerName} stopped. Use '!track ${summonerName}' to start tracking again`);

        // need to test
        SummonerObject.deleteOne({name: summonerName}, (err) => {
            console.error(`Summoner does not exist or an error has occured! ${err}`);
        });
    }
};