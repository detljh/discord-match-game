const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'score',
    description: 'Display the current scores of the game you are in.',
    cooldown: 7,
    execute(message, args, games, users) {
        let gameMaster = users.get(message.author.id);
        let reply = "";
        if (gameMaster) {
            let game = games.get(roomMaster);
            
        } else {
            reply += `You are not in a game.`;
        }

        const embed = new MessageEmbed()
        .setDescription(reply);
        return message.channel.send(embed);
    }
}