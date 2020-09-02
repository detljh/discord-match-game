const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'join',
    description: 'Join a user\'s game.',
    usage: '<user>',
    cooldown: 2,
    users: true,
    execute(message, args, playerMap) {
        const user = message.mentions.users.first();
        let players = playerMap.get(user.id);
        const embed = new MessageEmbed();
        if (!players) {
            embed.setDescription(`This player has not created a game.`);
            return message.reply(embed);
        }

        players = [...players, message.author];
        playerMap.set(user.id, players);

        let reply = `You have joined ${user.toString()}'s game. Current Players:\n1. ${user.toString()}\n`;

        for (let i = 0; i < players.length; i++) {
            reply += `${i+2}. ${players[i].toString()}\n`;
        }
        
        embed.setDescription(reply);
        message.reply(embed);
    }
}