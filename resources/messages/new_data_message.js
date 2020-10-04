const Discord = require('discord.js');

let messageFormatter = (summonerName, summonerData) => {
    const richReply = new Discord.MessageEmbed()
        .setColor('#136fbf')
        .setTitle(`${summonerName}`)
        .setDescription('has updated data!')
        .addFields(
            { name: 'Rank', value: `${JSON.parse(summonerData).tier} ${JSON.parse(summonerData).rank}`},
            { name: 'Wins', value: `${JSON.parse(summonerData).wins}`, inline: true},
            { name: 'Losses', value: `${JSON.parse(summonerData).losses}`, inline: true}
        );

    return richReply;
}

module.exports = messageFormatter;