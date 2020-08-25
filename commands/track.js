const summonerCall = require('../endpoints/riot/summoner.js');
// const mongoose = require('mongoose');
// const summonerSchema = require('../resources/models/summoner_model.js');
// const SummonerObject = mongoose.model('Summoner', summonerSchema);
const SummonerObject = require('../resources/models/summoner_model.js');
const GuildInfoObject = require('../resources/models/guild_info_model.js');

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
        let summonerData = await summonerCall(summonerName);
        let summonerDocument = new SummonerObject({summoner: summonerData, name: summonerName});
        await summonerDocument.save();

        // keep track of the server's tracked summoners
        await GuildInfoObject.findOneAndUpdate(
            {guildID: message.guild.id}, 
            {$push: {trackedSummoners: summonerName}}, 
            {upsert: true}
        );

    },
};