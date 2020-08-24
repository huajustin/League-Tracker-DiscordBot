// const summonerSchema = require('../resources/models/summoner_model.js');
// const SummonerObject = mongoose.model('Summoner', summonerSchema);
const SummonerObject = require('../resources/models/summoner_model.js');

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
        SummonerObject.deleteOne({name: summonerName}, (err, res) => {
            if (err) {
                console.error(`Could not delete summoner!`);
                console.error(err);
            } else {
                console.log(`Summoner succesfully deleted`);
                console.log(res);
            }
        });
    }
};