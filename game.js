//game.js

import Player from './player.js';
import Deck from './deck.js';

class Game {
    constructor(numPlayers) {
        this.numPlayers = numPlayers;
        this.players = Array.from({ length: numPlayers }, (_, i) => new Player(i + 1));
        this.deck = new Deck();
        this.deck.shuffle();
    }

    start() {
        this.players.forEach(player => {
            for (let i = 0; i < 5; i++) {
                player.drawCard(this.drawCard());
            }
        });
    }
}

export default Game;