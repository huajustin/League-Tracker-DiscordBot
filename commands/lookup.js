const Discord = require('discord.js');
const summonerCall = require('../endpoints/riot/summoner.js');
const leagueLookup = require('../endpoints/riot/league-v4.js');

module.exports = {
	name: 'lookup',
	description: 'Retrieves summoner information once without tracking',
	usage: 'lookup [summoner name]',
    cooldown: 5,
	async execute(message, args) {
        if (args.length === 0) {
            return message.channel.send("Usage: !lookup <Summoner Name>", { reply: message.author });
        }
        
        // since summoner names may contain spaces, they may be counted as multiple arguments
        const summonerName = args.join(' ');

        console.log(`Getting info for ${summonerName}...`);

        let summonerData = await summonerCall(summonerName);
        let summonerID = JSON.parse(summonerData).id;
        let leagueLookupData = await leagueLookup(summonerID);

        const richReply = new Discord.MessageEmbed()
            .setColor('#136fbf')
            .setTitle(`${summonerName}`)
            .addFields(
                { name: 'Level', value: `${JSON.parse(summonerData).summonerLevel}`},
                { name: 'Rank', value: `${JSON.parse(leagueLookupData)[0].tier} ${JSON.parse(leagueLookupData)[0].rank}`},
                { name: 'Wins', value: `${JSON.parse(leagueLookupData)[0].wins}`, inline: true},
                { name: 'Losses', value: `${JSON.parse(leagueLookupData)[0].losses}`, inline: true}
            );

        message.reply(richReply);
    },
};