//========== Selecting Elements ==========//

//--- All Cards' containers ---//
const cards = document.querySelectorAll(".container > div"); // -> Nodelist
const cardEmojis = document.querySelectorAll(".container > div > p") // -> Nodelist as well
// console.log(cards);

//--- Butons ---//
let resetButton = document.querySelector(".reset-button");
let testingButton = document.querySelector(".testing-button");

//--- Players ---//
let player1 = document.querySelector(".player_1");
let player2 = document.querySelector(".player_2");

//--- Container ---//
let boardPlayerActive = document.querySelector(".container");

//========== ...Selecting Elements ==========//

//========== Initial Conditions ==========//

let players = [
    {
        name: "player_1",
        isActive: true,
        score: 0
    },
    {
        name: "player_2",
        isActive: false,
        score: 0
    }
];

let activePlayer = players.filter((player) => player.isActive === true);
let inactivePlayer = players.filter((player) => player.isActive === false);
let activePlayerButton = document.querySelector(`.${activePlayer[0].name}`);
let inactivePlayerButton = document.querySelector(`.${inactivePlayer[0].name}`)

//========== ...Initial Conditions ==========//

let playerSelection = [];
let cardsFlipped = [];
let message = '';
//========== Helper Functions ==========//

//=== Put cards in random position in each new game ===//
cards.forEach((card) => {
  card.style.order = Math.floor(Math.random() * 16);
});

const togglePlayer = (activePlayer, inactivePlayer) => {
    /* Change the player's turn */
    activePlayer[0].isActive = false;
    inactivePlayer[0].isActive = true;

    activePlayer = players.filter((player) => player.isActive === true);
    inactivePlayer = players.filter((player) => player.isActive === false);
    activePlayerButton = document.querySelector(`.${activePlayer[0].name}`);
    inactivePlayerButton = document.querySelector(`.${inactivePlayer[0].name}`)

    if (boardPlayerActive.classList.contains(`${inactivePlayer[0].name}`)) {
        boardPlayerActive.classList.remove(`${inactivePlayer[0].name}`)
    }

    if (inactivePlayerButton.classList.contains('active')) {
        inactivePlayerButton.classList.remove('active')
    }
    
    activePlayerButton.classList.add('active')
    boardPlayerActive.classList.toggle(`${activePlayer[0].name}`)

}

const cardFlip = (e) => {

    activePlayer = players.filter((player) => player.isActive === true);
    inactivePlayer = players.filter((player) => player.isActive === false);

    /* Populate the an array of selected elements so in case they don't match, then we hide them */
    cardsFlipped.push(e.target)
    // console.log(cardsFlipped) // Test

    /* This gets the emoji's paragraph element */
    let cardFlipped = e.target.firstElementChild;
    // console.log(cardFlipped); // Test

    /* This gets the emoji out of the cards */
    let emoji = cardFlipped.innerText;
    // console.log(emoji); // Test

    /* Actually 'flip' the card */
    cardFlipped.classList.toggle("hidden");

    playerSelection.push(emoji);

    let equalEmojis = playerSelection.filter((item, index, playerSelection) => {
        return item === playerSelection[index + 1];
    });

    /* If a pair was found in the selection */
    if (playerSelection.length == 2 && equalEmojis.length > 0) {

        activePlayer[0].score++;
        playerSelection = [];
        cardsFlipped = [];

        /* Tests */
        // message = `The current player's info is: \nPlayer Name: ${activePlayer[0].name} \nPlayer State: ${activePlayer[0].isActive} \nPlayer Score: ${activePlayer[0].score}`
        // console.log(message);
        console.log("Success!")

        /* If no pairs were found in the selection */
    } else if (playerSelection.length == 2 && equalEmojis.length === 0) {

        playerSelection = [];

        togglePlayer(activePlayer, inactivePlayer);

        // console.log(activePlayer[0].name)

        /* When the elements don't match, then wait a bit for them to disappear */
        setTimeout(() => {
            cardsFlipped.forEach(card => {
                card.firstElementChild.classList.add("hidden")
            })
        }, 1000);

        console.log("Not success!") // Test

    }

    if (players[0].score + players[1].score === 8) {

        let endMessage = players[0].score > players[1].score ? `${players[0].name} won!` : `${players[1].name} won!`
        alert(endMessage)
        resetGame(e);
    }

};

const resetGame = e => {

    players[0].isActive = true;
    players[0].score = 0;

    players[1].isActive = false;
    players[1].score = 0;

    cardEmojis.forEach(card => {
        card.classList.add('hidden')
    })
}


//========== ...Helper Functions ==========//

//========== Game Functionality ==========//

cards.forEach((card) => {
    /* Adding params to event handlers was researched here https://stackoverflow.com/questioÏns/10000083/javascript-event-handler-with-parameters */
    card.addEventListener("click", (e) => cardFlip(e));
});

testingButton.addEventListener('click', (e) => {
    console.log(players)
})

resetButton.addEventListener("click", resetGame)
//========== ...Game Functionality ==========//
