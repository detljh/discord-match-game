const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'exit',
    aliases: ['stop'],
    description: 'Exits the game you are currently in.',
    cooldown: 10,
    execute(message, args, games, users) {
        let gameMaster = users.get(message.author.id);    
        let reply = "";

        if (gameMaster) {
            let game = games.get(gameMaster);
            let players = game.getPlayers();
            
            if (players.length == 1) {
                games.delete(message.author.id);
                reply += `<@${message.author.id}>'s game has ended.`;
            } else {
                players = players.filter(p => p != message.author.id);
                game.setPlayers(players);
                games.set(players[0], game);
                games.delete(message.author.id);
                if (gameMaster == message.author.id) {
                    reply += `Game master <@${message.author.id}> has exited the game.`;
                    reply += `<@${players[0]}> is now the game master.`;
                } else {
                    reply += `<@${message.author.id}> has exited the game.`;
                }
            }

            users.delete(message.author.id);
        } else {
            reply += `You are not in a game.`;
        }

        const embed = new MessageEmbed()
        .setDescription(reply);
        return message.channel.send(embed);
    }
}