//deck.js

class Deck {
    constructor() {
        this.cards = [];
        this.generateDeck();
    }

    generateDeck() {
        //Cartes capturat
        for (let i = 0; i <= 9; i++) {
            this.cards.push({ type: 'capturat', value1: i, value2: i });
        }

        //Cartes pista
        for (let i = 9; i >= 1; i--) {
            for (let j = 0; j < i; j++) {
                this.cards.push({ type: 'pista', value1: i, value2: j });
            }
        }

        //Cartes caçarecompensa
        for (let i = 1; i <= 3; i++) {
            for (let j = 0; j < 5; j++) {
                let functionType;
                if (i === 1) {
                    functionType = 'robPlayerCard';
                } else if (i === 2) {
                    functionType = 'robCapturatFromPlayerPrison';
                } else {
                    functionType = 'robCapturatToYourPrison';
                }
                this.cards.push({
                    type: 'cacarecompenses',
                    function: functionType,
                    image: `/images/bounty${i}.png`
                });
            }
        }
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
}

export default Deck;