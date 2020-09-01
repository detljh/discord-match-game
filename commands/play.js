const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'play',
    aliases: ['start', 'p'],
    description: 'Start a match game of a specified size.',
    usage: '<size>',
    cooldown: 4,
    args: true,
    execute(message, args) {
        let embed = new MessageEmbed();
        if (args.length > 2) {
            embed.setDescription(`Too many size dimensions provided. Please specify at most two dimensions.`);
            return message.reply(embed);
        }

        for (let i = 0; i < args.length; i++) {
            let arg = args[i];
            if (isNaN(arg) || arg < 0) {
                embed.setDescription(`Board dimensions must be a positive number.`);
                return message.reply(embed);
            }
        }
        
        let row = args[0];
        let column = 0;
        if (args.length == 1) {
            column = row;
        } else {
            column = args[1];
        }

        const numCards = row * column;
        if (numCards % 2 != 0) {
            embed.setDescription(`Please specify dimensions that create a board with an even number of cards.`);
            return message.reply(embed);
        }

        if (numCards > 50) {
            embed.setDescription(`Board dimensions are too large. Maximum number of cards is 50.`);
            return message.reply(embed);
        }

        const boardColors = [0xf57334, 0xf5ea73, 0xa0f573, 0x73f5ce, 0x73c7f5, 0x7773f5, 0xd073f5, 0xf573ba];
        embed.setTitle(`${row}x${column} Board`);
        embed.setColor(boardColors[Math.floor(Math.random() * boardColors.length)]);

        let cards = [];
        let chars = 'abcdefghijklmnopqrstuvwxyz';
        for (let i = 0; i < numCards / 2; i++) {
            cards.push(chars[i]);
            cards.push(chars[i]);
        }

        let board = "";
        for (let i = 0; i < column; i++) {
            for (let j = 0; j < row; j++) {
                board += cards.splice(Math.floor(Math.random() * cards.length), 1);   
            }
            board += "\n";
        }

        embed.setDescription(board);
        message.reply(embed);
    }
}