const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'start',
    description: 'Starts the game you are the owner of.',
    cooldown: 5,
    execute(message, args, games) {
        const embed = new MessageEmbed()
        let game = games.get(message.author.id);
        if (!game) {
            embed.setDescription("You have not created a game.");
            return message.reply(embed);
        }

        let players = game.getPlayers();
        let reply = "";
        if (players.length < 2) {
            reply += "There are not enough players.";
            embed.setDescription(reply);
            return message.reply(embed);
        } else {
            game.startGame();
            reply += "The game with players "
            reply += players.map(p => `<@${p}>`).join(" ");
            reply += " has started.";
        }

        embed.setDescription(reply);
        message.channel.send(embed);

        message.channel.send(game.getOutput());
    }    
}