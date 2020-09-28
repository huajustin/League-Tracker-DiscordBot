const getSummonerID = require('../riot/summoner');
const getSummonerData = require('../riot/league-v4');
const SummonerObject = require('../../resources/models/summoner_model.js');
const _ = require('lodash/lang');

const startPollService = (summonerName) => {
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

        // TODO: emit an event to handle when there is a change detected
        if (!_.isEqual(currentSummonerData, leagueLookupData)) {
            console.log(`Changes detected for ${summonerName}`);
        } else if (summonerLevel !== currentSummonerData.level) {
            console.log(`Changes in level detected for ${summonerName}`)
        } else {
            console.log(`No changes detected for ${summonerName}`);
        };
    }, 5000);
};

module.exports = startPollService;