const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'join',
    description: 'Join a user\'s game.',
    usage: '<user>',
    cooldown: 2,
    users: true,
    execute(message, args, rooms, users) {
        const user = message.mentions.users.first();
        let players = rooms.get(user.id);
        const embed = new MessageEmbed();
        if (!players) {
            embed.setDescription(`This player has not created a game.`);
            return message.reply(embed);
        }

        if (users.get(message.author.id)) {
            embed.setDescription(`You have already joined a game.`);
            return message.reply(embed);
        }

        players = [...players, message.author.id];
        rooms.set(user.id, players);
        users.set(message.author.id, user.id);

        let reply = `You have joined ${user.toString()}'s game. Current Players:\n1. ${user.toString()}\n`;

        for (let i = 0; i < players.length; i++) {
            reply += `${i+2}. <@${players[i]}>\n`;
        }
        
        embed.setDescription(reply);
        message.reply(embed);
    }
}