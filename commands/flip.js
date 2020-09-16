const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'flip',
    aliases: ['f'],
    description: 'Flip a card over.',
    usage: '<row(letter)> <column(number)>',
    args: true,
    execute(message, args, games, users) {
        let userId = message.author.id;
        let roomMaster = users.get(userId);
        let game = games.get(roomMaster);

        if (!game) {
            return message.reply(new MessageEmbed().setDescription("You are not in a game."));
        }

        let currentPlayer = game.getCurrentPlayer();

        if (currentPlayer != userId) {
            return message.reply(new MessageEmbed().setDescription("It is not your turn."));
        }

        if (args.length != 2) {
            return message.reply(new MessageEmbed().setDescription("Incorrect usage."));
        }

        row = args[0];
        column = args[1];
        if (!game.flip(row, column)) {
            return message.reply(new MessageEmbed().setDescription("Coordinates are out of range."));
        }

        return message.channel.send(game.getOutput(game.getCurrentBoard()));
    }
}