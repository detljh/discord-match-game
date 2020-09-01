const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'join',
    description: 'Join a user\'s game.',
    usage: '<user>',
    cooldown: 2,
    users: true,
    execute(message, args) {
        const user = message.mentions.users.first();
        const embed = new MessageEmbed()
            .setDescription(`Mentioned: ${user.username}`);
        message.channel.send(embed);
    }
}