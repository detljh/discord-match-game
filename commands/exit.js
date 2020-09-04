const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'exit',
    aliases: ['stop'],
    description: 'Exits the game you are currently in.',
    cooldown: 10,
    execute(message, args, rooms, users) {
        let roomMaster = users.get(message.author.id);    
        let reply = "";

        if (roomMaster) {
            let room = rooms.get(roomMaster);
            let players = room.getPlayers();
            
            if (players.length == 1) {
                rooms.delete(message.author.id);
                reply += `<@${message.author.id}>'s game has ended.`;
            } else {
                players = players.filter(p => p != message.author.id);
                room.setPlayers(players);
                rooms.set(players[0], room);
                rooms.delete(message.author.id);
                if (roomMaster == message.author.id) {
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