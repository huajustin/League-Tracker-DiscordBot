const https = require('https');
const options = require('./config/config.json');

module.exports = (summonerID) => {
    return new Promise((resolve, reject) => {
        // http options for the REST API request 
        const httpOptions = {
            host: options.platform_url,
            path: `/lol/league/v4/entries/by-summoner/${summonerID}`,
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

                    // Not sure if it's better to resolve with JSON string or JSON object
                    resolve(json);
                } else {
                    console.log('Status: ', res.statusCode);
                    reject(new Error(`Status error: ${res.statusCode}`));
                }
            });
        });

        // http request error handler
        req.on('error', (e) => {
            console.error(e);
            reject(new Error(e));
        });
    });
};