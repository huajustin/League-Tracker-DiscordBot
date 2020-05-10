const Discord = require('discord.js');
const {prefix, token} = require('./config.json');

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in!`);
});

client.on('message', (msg) => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) {
        return;
    }

    let query = msg.content.slice(prefix.length).split(' ');
    let command = query.shift().toLowerCase();

    
});

client.login(token);