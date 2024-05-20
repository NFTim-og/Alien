class Player {
    constructor(name) {
        this.name = name;
        this.cards = [];
        this.money = 0;
        this.points = 0;
    }

    calculatePoints() {
        let points = 0;

        for (let i = 0; i < this.cards.length; i++) {
            let card = this.cards[i];
            points += card.getValue();
        }
        this.points = points;

        return points;
    }
}

export default Player;