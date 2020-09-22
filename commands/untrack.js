// const summonerSchema = require('../resources/models/summoner_model.js');
// const SummonerObject = mongoose.model('Summoner', summonerSchema);
const SummonerObject = require('../resources/models/summoner_model.js');
const GuildInfoObject = require('../resources/models/guild_info_model.js');

module.exports = {
    name: 'untrack',
	description: 'Stops tracking a summoner',
	usage: 'untrack [summoner name]',
    cooldown: 5,
    async execute(message, args) {
        if (args.length === 0) {
            return message.channel.send("Usage: !untrack <Summoner Name>", { reply: message.author });
        }

        const summonerName = args.join(" ");

        // TODO: Need to implement API monitor to watch for changes
        console.log(`Tracking ${summonerName} stopped`);
        message.reply(`Tracking ${summonerName} stopped. Use '!track ${summonerName}' to start tracking again`);

        // TODO: Currently, code is only valid assuming a summoner can only be tracked by one server. Code should be updated to fix this
        SummonerObject.deleteOne({name: summonerName}, (err, res) => {
            if (err) {
                console.error(`Could not delete summoner!`);
                console.error(err);
            } else {
                if (res.deletedCounted === 0) {
                    console.log(`Profile for ${summonerName} does not exist and cannot be deleted`);
                } else {
                    console.log(`Profile for ${summonerName} succesfully deleted`);

                    // we can guarantee that since the profile had an entry and was removed, we can also remove from server's tracked summoners
                    await GuildInfoObject.findOneAndUpdate(
                        {guildID: message.guild.id}, 
                        {$pull: {trackedSummoners: summonerName}}, 
                    );
                }
                console.log(`Database deletion result: ${res}`);
            }
        });
    }
};