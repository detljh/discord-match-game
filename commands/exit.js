const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'exit',
    aliases: ['stop'],
    description: 'Exits the game you are currently in.',
    cooldown: 5,
    execute(message, args, rooms, users) {
        let roomMaster = users.get(message.author.id);    
        let room = rooms.get(message.author.id);
        let reply = "";
        if (room) {
            let players = room.getPlayers();
            if (players.length == 1) {
                rooms.delete(message.author.id);
                reply += `Game master <@${message.author.id}> has exited the game.`;
            } else {
                players = players.filter(p => p != message.author.id);
                room.setPlayers(players);
                rooms.set(players[0], room);
                rooms.delete(message.author.id);
                reply += `Game master <@${message.author.id}> has exited the game.`;
                reply += `<@${players[0]}> is now the game master.`;
            }
        } else if (roomMaster) {
            let room = rooms.get(roomMaster);
            let players = rooms.get(roomMaster).getPlayers();
            players = players.filter(p => p != message.author.id);
            room.setPlayers(players);
            users.delete(message.author.id);
            reply += `<@${message.author.id}> has exited the game.`;
        } else {
            reply += `You are not in a room.`;
        }

        const embed = new MessageEmbed()
        .setDescription(reply);
        return message.channel.send(embed);
    }
}