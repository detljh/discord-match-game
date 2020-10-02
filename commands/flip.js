const { MessageEmbed } = require('discord.js');
const { MATCH, NO_MATCH } = require('../constants/flip');

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
        } else if (!game.isGameStarted()) {
            return message.reply(new MessageEmbed().setDescription("You cannot flip yet."));
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
        flip = game.flip(row, column);
        if (flip == NO_MATCH) {
            message.channel.send(new MessageEmbed().setDescription("No match!"));
            message.channel.send(game.getOutput(game.getCurrentBoard()))
            .then(msg => {
                msg.delete({ timeout: 2000 })
                .then(() => {
                    message.channel.messages.fetch({limit: 100})
                    .then(fetched => {
                        fetched.forEach(msg => {
                            if (msg.author.bot) msg.delete();
                        });
                        game.resetFlip();
                        message.channel.send(new MessageEmbed().setDescription(`<@${game.getCurrentPlayer()}>'s turn`));
                        return message.channel.send(game.getOutput(game.getCurrentBoard()));
                    })
                    .catch(console.error);
                })
                .catch(console.error);
            })
            .catch(console.error);
        } else if (flip) {
            if (flip == MATCH) {
                message.channel.send(new MessageEmbed().setDescription("Match made!"));
            }
            message.channel.send(game.getOutput(game.getCurrentBoard()));
            let ended = game.checkEnd();
            if (ended) {
                message.channel.send(game.getScoreOutput());
                message.channel.send(ended);
            }
            return;
        } else {
            return message.reply(new MessageEmbed().setDescription("Coordinates are out of range or this has already been flipped."));
        }
    }
}