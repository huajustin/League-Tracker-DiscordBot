const summonerCall = require('../endpoints/riot/summoner.js');
const mongoose = require('mongoose');
const summonerSchema = require('../endpoints/riot/resources/models/summoner_mode.js');
const SummonerObject = mongoose.model('Summoner', summonerSchema);

module.exports = {
	name: 'track',
	description: 'Begins to track a summoner whenever they start a new game',
	usage: 'track [summoner name]',
    cooldown: 5,
	async execute(message, args) {
        if (args.length === 0) {
            return message.channel.send("Usage: !track <Summoner Name>", { reply: message.author });
        }
        
        // since summoner names may contain spaces, they may be counted as multiple arguments
        const summonerName = args.join(' ');

        console.log(`Now tracking ${summonerName}`);
        message.reply(`Now tracking ${summonerName}. Use '!untrack ${summonerName}' to stop tracking`);
        
        // TODO: Need to implement API monitor to watch for changes

        // keep track of our summoners in our mongodb database
        let summonerObject = await summonerCall(summonerName);
        let summonerDocument = new SummonerObject({summoner: summonerObject});
        await summonerDocument.save();
    },
};