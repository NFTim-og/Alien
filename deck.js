import Card from './card.js';

class Deck {
    constructor() {
        this.cards = [];

        for (let suit = 0; suit < 4; suit++) {
            for (let value = 0; value < 10; value++) {
                this.cards.push(new Card(suit, value));
            }
        }
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    pop() {
        return this.cards.pop();
    }

    push(card) {
        this.cards.push(card);
    }

    toString() {
        return this.cards.join(', ');
    }
}

export default Deck;