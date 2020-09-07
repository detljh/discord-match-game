const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'board',
    aliases: ['show'],
    description: 'Display the current board of the game you are in.',
    cooldown: 7,
    execute(message, args, games, users) {
        let gameMaster = users.get(message.author.id);
        let reply = "";
        if (gameMaster) {
            let game = games.get(roomMaster);
            return message.channel.send(game.getOutput());
        } else {
            reply += `You are not in a game.`;
        }

        const embed = new MessageEmbed()
        .setDescription(reply);
        return message.channel.send(embed);
    }
}