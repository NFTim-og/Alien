import Game from './game.js';
import Player from './player.js';
import Computer from './computer.js';
import Deck from './deck.js';

const game = new Game(new Player("Player"), new Computer("Computer"), new Deck());

document.addEventListener("DOMContentLoaded", () => {
    game.initGame();

    document.getElementById("hit").addEventListener("click", () => {
        game.hit();
    });

    document.getElementById("stand").addEventListener("click", () => {
        game.stand();
    });

    document.getElementById("reset").addEventListener("click", () => {
        game.reset();
    });
});