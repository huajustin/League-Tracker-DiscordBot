const summonerCall = require('../endpoints/riot/summoner.js');
const summoners = require('../endpoints/riot/resources/tracked_summoners.js');

module.exports = {
	name: 'track',
	description: 'Begins to track a summoner whenever they start a new game',
	usage: 'track [summoner name]',
    cooldown: 5,
	execute(message, args) {
        if (args.length === 0) {
            return message.channel.send("Usage: !track <Summoner Name>", { reply: message.author });
        }
        
        // since summoner names may contain spaces, they may be counted as multiple arguments
        const summonerName = args.join(' ');

        console.log(`Now tracking ${summonerName}`);
        message.reply(`Now tracking ${summonerName}. Use \'!untrack ${summonerName}\' to stop tracking`);
        
        // TODO: Need to implement API monitor to watch for changes.. then add summoner
        // to be monitored

        // keep track of our summoners
        summoners.add(summonerName);
        summonerCall(summonerName);
    },
};