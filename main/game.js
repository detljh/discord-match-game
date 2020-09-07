const { MessageEmbed } = require('discord.js');

const boardColors = [0xf57334, 0xf5ea73, 0xa0f573, 0x73f5ce, 0x73c7f5, 0x7773f5, 0xd073f5, 0xf573ba];

module.exports = class Game {
    constructor(row, column) {
        this.row = row;
        this.column = column;
        this.color = boardColors[Math.floor(Math.random() * boardColors.length)];
        this.output = new MessageEmbed();
        this.numCards = row * column;
        this.boardLayout = [];
        this.currentBoard = Array.from({ length: row }, () => Array.from({ length: column }, () => 0));
        this.players = [];
        this.setupStarted = false;
        this.gameStarted = false;
        this.currentPlayer = null;
    }

    setup() {
        let cards = [];
        let chars = 'abcdefghijklmnopqrstuvwxyz';
        for (let i = 0; i < this.numCards / 2; i++) {
            cards.push(chars[i]);
            cards.push(chars[i]);
        }

        this.boardLayout = Array.from({ length: this.row }, () => Array.from({ length: this.column }, () => cards.splice(Math.floor(Math.random() * cards.length), 1)));
        this.currentPlayer = this.players[Math.floor(Math.random() * this.players.length)];
    }

    startSetup() {
        this.setupStarted = true;
        this.setup();
    }

    startGame() {
        this.gameStarted = true;
    }

    isSetupStarted() {
        return this.setupStarted;
    }

    isGameStarted() {
        return this.gameStarted;
    }

    getNumCards() {
        return this.numCards;
    }

    getCurrentBoard() {
        let boardOutput = "";
        for (let i = 0; i < this.column; i++) {
            for (let j = 0; j < this.row; j++) {
                boardOutput += this.currentBoard[i][j];
            }
            boardOutput += "\n";
        }

        return boardOutput;
    }

    getBoardLayout() {
        let boardOutput = "";
        for (let i = 0; i < this.column; i++) {
            for (let j = 0; j < this.row; j++) {
                boardOutput += this.boardLayout[i][j];
            }
            boardOutput += "\n";
        }

        return boardOutput;
    }

    getOutput(board) {
        this.output = new MessageEmbed()
        .setTitle(`${this.row}x${this.column} Board`)
        .setColor(this.color)
        .setDescription(board)
        .addField('Current Player', `<@${this.currentPlayer}>`, true)
        .addField('All Players', this.players.map(p => `<@${p}>`).join(" "), true);
        return this.output;
    }

    getPlayers() {
        return this.players;
    }

    setPlayers(players) {
        this.players = players;
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    }
}
