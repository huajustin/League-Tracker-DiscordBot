const getSummonerID = require('../riot/summoner');
const getSummonerData = require('../riot/league-v4');
const SummonerObject = require('../../resources/models/summoner_model.js');
const app = require('../../index');
const _ = require('lodash/lang');

const DEFAULT_POLL_TIME = 5000;

const startPollService = (summonerName) => {
    // TODO: find a better way to use this as a singleton rather than having many object references to the client
    const discordClient = app.mainClient;

    const intervalID = setInterval(async () => {
        // if the summoner no longer exists in our db, stop tracking
        if (!(await SummonerObject.exists({ name: summonerName }))) {
            clearInterval(intervalID);
        };

        // TODO: Error handling for when the summoner no longer exists in db 
        console.log(`API update for ${summonerName}`);
        
        const currentSummonerData = (await SummonerObject.findOne({ name: summonerName})).get('summoner');

        let summonerData = await getSummonerID(summonerName);
        let summonerID = JSON.parse(summonerData).id;
        let summonerLevel = JSON.parse(summonerData).level;
        let leagueLookupData = (await getSummonerData(summonerID))[0];

        if (!_.isEqual(currentSummonerData, leagueLookupData)) {
            console.log(`Changes detected for ${summonerName}`);
            discordClient.emit('summoner_update', summonerName, leagueLookupData);
        } else if (summonerLevel !== currentSummonerData.level) {
            console.log(`Changes in level detected for ${summonerName}`)
            discordClient.emit('summoner_levelup', summonerName, summonerLevel);
        } else {
            console.log(`No changes detected for ${summonerName}`);
        };
    }, DEFAULT_POLL_TIME);
};

module.exports = startPollService;