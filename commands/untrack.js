const SummonerObject = require('../resources/models/summoner_model.js');
const SummonerTrackingObject = require('../resources/models/summoner_tracking_model.js');

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

        console.log(`Tracking ${summonerName} stopped`);
        message.reply(`Tracking ${summonerName} stopped. Use '!track ${summonerName}' to start tracking again`);

        // TODO: The logic for this is backwards; we do not want to delete the summoner from the db and then remove the channel tracking it,
        // instead we want to reomve the channel tracking, and if there are no channels tracking, then we can delete the summoner from the db
        SummonerObject.deleteOne({name: summonerName}, async (err, res) => {
            if (err) {
                console.error(`Could not delete summoner!`);
                console.error(err);
            } else {
                if (res.deletedCounted === 0) {
                    console.log(`Profile for ${summonerName} does not exist and cannot be deleted`);
                } else {
                    await SummonerTrackingObject.findOneAndUpdate(
                        {name: summonerName}, 
                        {$pull: {channelsTracking: message.channel.id}}, 
                    );

                    console.log(`Profile for ${summonerName} succesfully deleted`);
                }
                console.log(`Database deletion result: ${res}`);
            }
        });
    }
};