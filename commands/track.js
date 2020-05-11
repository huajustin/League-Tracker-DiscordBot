const summonerCall = require('../endpoints/riot/summoner.js');

module.exports = {
	name: 'track',
	description: 'Begins to track a summoner whenever they start a new game',
	usage: 'track [summoner name]',
    cooldown: 5,
    summoners: [],
	execute(message, args) {
        if (args.length === 0) {
            return message.channel.send("Usage: !track <Summoner Name>", { reply: message.author });
        }
        
        // since summoner names may contain spaces, they may be counted as multiple arguments
        let summonerName = args.join(' ');

        console.log(`Now tracking ${summonerName}`);
        message.reply(`Now tracking ${summonerName}. Use \'!untrack ${summonerName}\' to stop tracking`);
        
        // keep track of our summoners
        this.summoners.push(summonerName);
        summonerCall(summonerName);
    },
};