const Discord = require('discord.js');

let messageFormatter = (summonerName, summonerLevel) => {
    const richReply = new Discord.MessageEmbed()
        .setColor('#136fbf')
        .setTitle(`${summonerName}`)
        .setDescription('has leveled up!')
        .addFields(
            { name: 'From', value: `${summonerLevel - 1}`, inline: true},
            { name: 'To', value: `${summonerLevel}`, inline: true}
        );

    return richReply;
}

module.exports = messageFormatter;