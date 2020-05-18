const https = require('https');
const options = require('./config/config.json');

module.exports = (summoner) => {

    // need to handle url encoding of summoner names with funny characters
    const summonerURLEncode = encodeURIComponent(summoner);

    // http options for the REST API request 
    const httpOptions = {
        host: options.platform_url,
        path: `/lol/summoner/v4/summoners/by-name/${summonerURLEncode}`,
        headers: {
            "X-Riot-Token": options.key
        },
        port: 443
    };

    console.log(httpOptions.host);

    // http request 
    const req = https.get(httpOptions, (res) => {
        let json = '';
        let data = '';

        res.setEncoding('utf8');

        // get data chunks
        res.on('data', (chunk) => {
            json += chunk;
        });
    
        // parse and log data
        res.on('end', () => {
            if (res.statusCode === 200) {
                data = JSON.parse(json);
                console.log(data ? data : 'Error parsing JSON!');
                console.log(data.id);
            } else {
                console.log('Status:', res.statusCode);
            }
        });
    });

    // http request error handler
    req.on('error', (e) => {
        console.error(e);
    });
};