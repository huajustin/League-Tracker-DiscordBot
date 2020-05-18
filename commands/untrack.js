const summoners = require('../endpoints/riot/resources/tracked_summoners.js');

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

        summoners.delete(summonerName);

        // TODO: Need to implement API monitor to watch for changes.. then remove summoner
        // from monitor

        console.log(`Tracking ${summonerName} stopped`);
        message.reply(`Tracking ${summonerName} stopped. Use '!track ${summonerName}' to start tracking again`);
    }
};