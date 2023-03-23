function CreateCardsArray() {
    //create array for holding the cards
    let cardsArray = new Array(totalFlips * 2);

    //reset the random cards array
    for (let i = 0; i < cardsArray.length; i++) {
        cardsArray[i] = null;
    }

    //random numbers for each card
    for (let i = 0, j = 1; i < cardsArray.length / 2; i++, j++) {
        let p1 = Math.round(Math.random() * 11);
        let p2 = Math.round(Math.random() * 11);
        while (p1 == p2 || cardsArray[p1] != null || cardsArray[p2] != null) {
            p1 = Math.round(Math.random() * 11);
            p2 = Math.round(Math.random() * 11);
        }
        cardsArray[p1] = `${j}.png`;
        cardsArray[p2] = `${j}.png`;
    }

    return cardsArray;
}

function Start() {
    //get the main area of the game
    const board = document.querySelector('#board');

    //get the cards array from the function above
    let cardsArray = CreateCardsArray();

    console.log(cardsArray)

    //for each card, create an element and add it to the board
    cardsArray.forEach(card => {
        let cardElement = document.createElement('img');
        cardElement.src = `./images/back.png`;

        //add the css class to set some styles
        cardElement.classList.add('card');

        //add event listener
        cardElement.addEventListener('click', (event) => { ShowCard(event.target, card) });

        //add the card to the board
        board.append(cardElement);
    })
}

function ShowCard(element, card) {

    //check if we can flip a card
    if (currentFlipedCards.length < 2) {
        element.src = `./images/${card}`;
        element.classList.add('disabled');
        currentFlipedCards.push(element);
    }

    //if we have 2 cards fliped over, check them
    if (currentFlipedCards.length == 2)
        Check();


}

function Check() {
    moves++;
    //check if the cards are not the same
    if (currentFlipedCards[0].src != currentFlipedCards[1].src) {
        ShowBack();
        return;
    }

    //the cards are the same so do that:

    //disable click event using css property
    for (let i = 0; i < currentFlipedCards.length; i++) {
        currentFlipedCards[i].classList.add('disabled');
    }

    //reset the current fliped cards array
    currentFlipedCards = new Array();

    //add 1 to fliped cards
    flippedCards++;

    //if we fliped all the cards -> show end game message
    if (flippedCards === totalFlips)
        GameOver();

}

function ShowBack() {
    //wait [timeToShow] seconds
    setTimeout(() => {
        currentFlipedCards.forEach(card => {
            //show the back of the card
            card.src = `./images/back.png`;
            //enable the click event by removing the 'disabled' class
            card.classList.remove('disabled');
        });

        //reset the array
        currentFlipedCards = new Array();
    }, 1000 * timeToShow);
}

function GameOver(){
    const header = document.querySelector('#header');
    let p = document.createElement('p');
    p.innerHTML = `${gameOverMsg}! <br>You win the game with ${moves} moves`;
    header.append(p);
}


