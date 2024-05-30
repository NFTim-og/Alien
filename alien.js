//alien.js

// Imports
import Deck from './deck.js';
import Player from './player.js';
import Game from './game.js';

// Wait for the document to finish loading before executing the code
document.addEventListener('DOMContentLoaded', () => {
    // Create a new game
    // eslint-disable-next-line no-unused-vars
    const game = new Game();

    // Create a new deck of cards
    const deck = new Deck();

    //Shuffle the deck
    deck.shuffle();

    // Create players
    const player1 = new Player(1);
    const player2 = new Player(2);
    
    // Get references to the HTML elements
    const player1Area = document.getElementById('player1-area');
    const player2Area = document.getElementById('player2-area');
    const dropZone = document.getElementById('drop-zone');
    const deckZone = document.getElementById('deck-zone');
    const deckTopCard = document.getElementById('deck-top-card');
    const endTurn1Button = document.getElementById('end-turn1');
    const endTurn2Button = document.getElementById('end-turn2');

    // Initialize variables to keep track of the current player and the deck of cards
    let currentPlayer = 1;
    let deckCards = deck.cards;

    // Function to switch the current player
    const switchPlayer = () => {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        updatePlayerTurn();
    };

    // Function to update the player turn indicators
    const updatePlayerTurn = () => {
        // Update the CSS classes for the player areas to indicate whose turn it is
        if (currentPlayer === 1) {
            player1Area.classList.add('active');
            player1Area.classList.remove('disabled');
            player2Area.classList.remove('active');
            player2Area.classList.add('disabled');
        } else {
            player1Area.classList.remove('active');
            player1Area.classList.add('disabled');
            player2Area.classList.add('active');
            player2Area.classList.remove('disabled');
        }
        toggleHiddenCards();
    };

    // Function to hide the inactive player's cards
    const toggleHiddenCards = () => {
        const player1Cards = player1Area.querySelectorAll('.card');
        const player2Cards = player2Area.querySelectorAll('.card');
        
        if (currentPlayer === 1) {
            player1Cards.forEach(card => card.classList.remove('hidden-content'));
            player2Cards.forEach(card => card.classList.add('hidden-content'));
        } else {
            player1Cards.forEach(card => card.classList.add('hidden-content'));
            player2Cards.forEach(card => card.classList.remove('hidden-content'));
        }
    };

    // Function to update the top card of the deck
    const updateDeckTopCard = () => {
        if (deckCards.length > 0) {
            const card = deckCards[0];
            const cardElement = createCardElement(card, 'deck-top');
            deckTopCard.innerHTML = '';
            deckTopCard.appendChild(cardElement);
        } else {
            deckTopCard.innerHTML = 'No queden més cartes';
            deckZone.style.backgroundColor = '#4CAF50';
        }
        deckTopCard.style.display = 'flex';
        deckTopCard.style.justifyContent = 'center';
        deckTopCard.style.alignItems = 'center';
    };

    // Function to play a random card from the deck to the middle
    const playRandomCardToMiddle = () => {
        // If there are cards in the deck, play a random one to the middle
        if (deckCards.length > 0) {
            const randomIndex = Math.floor(Math.random() * deckCards.length);
            const randomCard = deckCards.splice(randomIndex, 1)[0];
            const cardElement = createCardElement(randomCard, 'middle');
            dropZone.innerHTML = '';
            dropZone.appendChild(cardElement);
        }
    };

    // Function to get the values of the middle card
    const getMiddleCardValues = () => {
        // If there is a card in the middle, get its values
        if (dropZone.firstChild) {
            const value1 = parseInt(dropZone.firstChild.querySelector('.value1')?.textContent || dropZone.firstChild.querySelector('.value')?.textContent);
            const value2 = parseInt(dropZone.firstChild.querySelector('.value2')?.textContent || value1);
            return [value1, value2];
        }
        // If there is no card in the middle, return an empty array
        return [];
    };

    // Initialize the game state
    updatePlayerTurn();
    toggleHiddenCards();

    // Deal the cards to the players
    const player1Cards = deckCards.slice(0, 5);
    const player2Cards = deckCards.slice(5, 10);
    deckCards = deckCards.slice(10);

    // Function to create a card element
    const createCardElement = (card, id) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.draggable = true;
        cardElement.id = `card${id}`;
    
        if (card.type === 'cacarecompenses') {
            const cardImage = document.createElement('img');
            cardImage.src = card.image;
            cardImage.style.width = '100%';
            cardImage.style.height = '100%';
            cardImage.style.objectFit = 'cover';
            cardElement.appendChild(cardImage);
        } else {
            // Display the card values
            if (card.value1 === card.value2) {
                cardElement.innerHTML = `<div class="value">${card.value1}</div>`;
            } else {
                cardElement.innerHTML = `<div class="value1">${card.value1}</div><div class="value2">${card.value2}</div>`;
            }
        }
    
        return cardElement;
    };

    // Add the cards to the player areas
    player1Cards.forEach((card, index) => {
        const cardElement = createCardElement(card, index + 1);
        player1Area.appendChild(cardElement);
        cardElement.addEventListener('dragstart', dragStart);
        cardElement.addEventListener('dragend', dragEnd);
    });
    player2Cards.forEach((card, index) => {
        const cardElement = createCardElement(card, index + 6);
        player2Area.appendChild(cardElement);
        cardElement.addEventListener('dragstart', dragStart);
        cardElement.addEventListener('dragend', dragEnd);
    });

    // Initialize the deck top card and play a random card to the middle
    updateDeckTopCard();
    playRandomCardToMiddle();

    // Add event listeners for dropping cards
    dropZone.addEventListener('dragover', dragOver);
    dropZone.addEventListener('drop', drop);

    // Function to handle the start of a drag event
    function dragStart(e) {
        const middleCardValues = getMiddleCardValues();
        const cardElement = e.target;
        const cardValue1 = parseInt(cardElement.querySelector('.value1')?.textContent || cardElement.querySelector('.value')?.textContent);
        const cardValue2 = parseInt(cardElement.querySelector('.value2')?.textContent || cardValue1);

        // Check if the card can be played
        if ((currentPlayer === 1 && e.target.parentElement.id === 'player1-area') ||
            (currentPlayer === 2 && e.target.parentElement.id === 'player2-area')) {
            if (middleCardValues.includes(cardValue1) || middleCardValues.includes(cardValue2)) {
                e.dataTransfer.setData('text/plain', e.target.id);
                setTimeout(() => {
                    e.target.classList.add('dragging');
                }, 0);
            } else {
                // Prevent the default behavior if the card cannot be played
                e.preventDefault();
            }
        } else {
            // Prevent the default behavior if it's not the current player's turn
            e.preventDefault();
        }
    }

    // Function to handle the end of a drag event
    function dragEnd(e) {
        e.target.classList.remove('dragging');
        updateDeckTopCard();
    }

    // Function to handle the dragover event
    function dragOver(e) {
        e.preventDefault();
    }

    // Function to handle the drop event
    function drop(e) {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        const card = document.getElementById(id);
        if (dropZone.childElementCount > 0) {
            dropZone.removeChild(dropZone.firstChild);
        }
        dropZone.appendChild(card);

        // Add this block to capture the alien
        if (currentPlayer === 1) {
            player1.captureAlien(getCardFromElement(card), getMiddleCardValues());
        } else {
            player2.captureAlien(getCardFromElement(card), getMiddleCardValues());
        }

        updateDeckTopCard();
    }

    function getCardFromElement(cardElement) {
        const cardId = cardElement.id.split('-')[1];
        const playerId = cardElement.parentElement.id.split('-')[1];
    
        if (playerId === '1') {
            return player1.hand[cardId - 1];
        } else {
            return player2.hand[cardId - 1];
        }
    }

    // Function to draw cards for a player
    function drawCards(playerArea, playerId, count) {
        for (let i = 0; i < count; i++) {
            if (deckCards.length > 0) {
                const card = deckCards.shift();
                const cardElement = createCardElement(card, `new-${playerId}-${i}`);
                playerArea.appendChild(cardElement);
                cardElement.addEventListener('dragstart', dragStart);
                cardElement.addEventListener('dragend', dragEnd);
            }
        }
        updateDeckTopCard();
    }

    // Function to check and draw cards for the current player
    function checkAndDrawCards() {
        if (currentPlayer === 1) {
            const player1CardsCount = player1Area.getElementsByClassName('card').length;
            if (player1CardsCount < 5) {
                drawCards(player1Area, 1, 5 - player1CardsCount);
            }
        } else {
            const player2CardsCount = player2Area.getElementsByClassName('card').length;
            if (player2CardsCount < 5) {
                drawCards(player2Area, 2, 5 - player2CardsCount);
            }
        }
    }

    // Add event listeners for the end turn buttons
    endTurn1Button.addEventListener('click', () => {
        checkAndDrawCards();
        switchPlayer();
    });
    endTurn2Button.addEventListener('click', () => {
        checkAndDrawCards();
        switchPlayer();
    });

    // Add an event listener for the deck zone
    deckZone.addEventListener('click', () => {
        if (currentPlayer === 1) {
            drawCards(player1Area, 1, 1);
        } else {
            drawCards(player2Area, 2, 1);
        }
    });

    toggleHiddenCards(); 
});