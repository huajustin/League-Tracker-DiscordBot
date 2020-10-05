const SummonerTrackingObject = require('../../resources/models/summoner_tracking_model');
const newDataMessageFormatter = require('../../resources/messages/new_data_message');

const sendMessageToChannels = async (client, message, summonerName) => {
    const serversTrackingSummonerObject = SummonerTrackingObject.findOne({ name: summonerName });
    const channelList = serversTrackingSummonerObject.get('channelsTracking');

    for (channelID of channelList) {
        const channel = await client.channels.cache.get(channelID);
        channel.send(message);
    };
};

const startMessageService = (client) => {
    client.on('summoner_update', (summonerName, summonerData) => { 
        const formattedMessage = newDataMessageFormatter(summonerName, summonerData);
        sendMessageToChannels(client, formattedMessage, summonerName);
    });

    client.on('summoner_levelup', (summonerName, summonerLevel) => {
        const formattedMessage = new LevelMessageFormatter(summonerName, summonerLevel);
        sendMessageToChannels(client, formattedMessage, summonerName);
    });
}

module.exports.startMessageService = startMessageService;

