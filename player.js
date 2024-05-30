//player.js

class Player {
    constructor(id) {
        this.id = id;
        this.hand = [];
        this.prison = [];
    }

    captureAlien(card, pistaCard) {
        if (this.canCaptureAlien(card, pistaCard)) {
            this.prison.push(card);
            this.removeCardFromHand(card);
        }
    }

    canCaptureAlien(card, pistaCard) {
        return (
            (card.value1 === pistaCard.value1 || card.value2 === pistaCard.value2) ||
            (card.value1 + card.value2 === pistaCard.value1 + pistaCard.value2) ||
            (Math.abs(card.value1 - card.value2) === Math.abs(pistaCard.value1 - pistaCard.value2))
        );
    }

    removeCardFromHand(cardIndex) {
        this.hand.splice(cardIndex, 1);
    }

    hasFourCapturedAliens() {
        return this.prison.length >= 4;
    }
}

export default Player;