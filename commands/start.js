const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'start',
    description: 'Starts the game you are the owner of.',
    cooldown: 5,
    execute(message, args, rooms) {
        const embed = new MessageEmbed()
        let room = rooms.get(message.author.id);
        let players = room.getPlayers();
        let reply = "";
        if (players.length < 2) {
            reply += "There are not enough players.";
            embed.setDescription(reply);
            return message.reply(embed);
        } else {
            room.startGame();
            reply += "The game with players "
            reply += players.map(p => `<@${p}>`).join(" ");
            reply += " has started.";
        }

        embed.setDescription(reply);
        message.channel.send(embed);

        message.channel.send(room.getOutput());
    }    
}