class Card {
    constructor(suit, value) {
        this.suits = ["bastos", "copas", "espadas", "oros"];
        this.values = ["1", "2", "3", "4", "5", "6", "7", "10", "11", "12"];
        this.suit = this.suits[suit];
        this.value = this.values[value];
    }

    getHTML() {
        return `<img src="./baralla/${this.suit}_${this.value}.jpg" />`;
    }
    

    toString(){
        return `${this.suit}_${this.value}`;
    }

    getValue() {
        if (this.value === "10" || this.value === "11" || this.value === "12") {
            return 0.5;
        } else {
            return parseInt(this.value);
        }
    }
}

export default Card;