// Declare global variables
let numAttempts = -1;

let resetRecursion = false;

// Generates computer's move choice
function computerPlay() {
    let selector = Math.floor( Math.random() * 3 );
    switch (selector) {
        case 0:
            return "Rock";
            break;
        case 1:
            return "Paper";
            break;
        case 2:
            return "Scissors";
            break;
    }
}

// Format's player input to have only first letter capitalized
function capFirstLetter(input) {
    let firstLetterCap = input.charAt(0).toUpperCase();
    input = firstLetterCap + input.substring(1);
    return input;
}

// Prompts for and stores player move choice
// function playerInput() {
//     let input = prompt("Rock, Paper, or Scissors?").toLowerCase();
//     if ( (input !== "rock")
//         && (input !== "scissors")
//         && (input !== "paper") ) {
//         alert("Please make a valid selection!");
//     // Below is used to exit recursion and limit num of functions on call stack
//         ++numAttempts;
//         if (numAttempts < 5) { return playerInput(); }
//         else { resetRecursion = true; return }; 
//     }
//     else {
//     resetRecursion = false;
//     numAttempts = -1;
//     return capFirstLetter(input);
//     }
// }

// Function to manage a single round of play and return results
function playRound() {
    let comp = computerPlay();
    let player = playerInput();
    while (resetRecursion) {
        numAttempts = -1;
        player = playerInput();
    }
    if ( comp === player ) {
        ++playerScore;
        ++compScore;
        return `Computer: ${comp}  Player: ${player}\n This round is a tie!`;
    }
    else if ( (comp === "Rock") && (player === "Scissors")
            || (comp === "Scissors") && (player === "Paper")
            || (comp === "Paper") && (player === "Rock") ) {
            ++compScore;
            return `Computer: ${comp}  Player: ${player}\n You lose this round! ${comp} beats ${player}`;
    }
    else {
        ++playerScore;
        return `Computer: ${comp}  Player: ${player}\n You win this round! ${player} beats ${comp}`;
    }
}

// create gameplay loop, add to global score, and print results after five matches
function game() {
    for ( let i = 0; i < 5; i++ ) {
        console.log(playRound());
    }
    console.log(`Computer Score: ${compScore} Player Score: ${playerScore}\n`);
    if ( compScore > playerScore ) {
        console.log("You lose the game!");
    }
    else if ( compScore < playerScore ) {
        console.log("You win the game!");
    }
    else { console.log("The game ends in a tie!"); }
}


// Define gameplay function
// ============================================================
const beginButton = document.querySelector("#begin");
const sectionOne = document.querySelector(".one");
const sectionTwo = document.querySelector(".two");
const sectionThree = document.querySelector(".three");
let playerScore = 0;
let computerScore = 0;
let roundMessage = "";

beginButton.classList.add('fade-in');

beginButton.addEventListener('click', () => {
    removeItemMedium(beginButton);
    setTimeout( () => { playGame() }, 500 );
});

function playGame() {
    roundMessage = createRoundMessage(1);
    sectionOne.appendChild(roundMessage);
    roundMessage.classList.add('fade-in');
}

// function playGame() {
//     let i = 1;
//     while (i <= 5) {
//         console.log(i);
//         roundMessage = createRoundMessage(i);
//         setTimeout( () => { 
//             sectionOne.appendChild(roundMessage);
//             roundMessage.classList.add('fade-in');
//         }, 250 );

//         setTimeout( () => { 
//             removeItemSlow(roundMessage); 
//         }, 750 );
        
//         setTimeout( () => { 
//             createGameRound();
//         }, 2500);
//     }
// }




// Create's new round message
// ============================================================
function createRoundMessage(number) {
    const roundAlertHeader = document.createElement('h2');
    roundAlertHeader.setAttribute('class', 'message');
    roundAlertHeader.innerText = `Round: ${number}`;
    return roundAlertHeader;
}

function createGameMessage(message) {
    const gameMessage = document.createElement('h2');
    gameMessage.classList.add('message');
    gameMessage.classList.add('small');
    gameMessage.innerText = message;
    return gameMessage;
}

// Create button choice group
// ============================================================
function createButton(id) {
    const button = document.createElement('button');
    button.setAttribute('id', id.toLowerCase());
    button.innerText = id;
    return button;
}

function createGameRound() {
    const cardSectionTwo = document.querySelector('.two');
    const buttonGroup = document.createElement('div');
    const rockButton = createButton('Rock');
    const paperButton = createButton('Paper');
    const scissorsButton = createButton('Scissors');
    const playMessage = createGameMessage('Make Your Move:');
    let choice = "";

    cardSectionTwo.appendChild(buttonGroup);
    buttonGroup.appendChild(rockButton);
    rockButton.classList.add('fade-in');
    buttonGroup.appendChild(paperButton);
    paperButton.classList.add('fade-in');
    buttonGroup.appendChild(scissorsButton);
    scissorsButton.classList.add('fade-in');
    buttonGroup.setAttribute('id', 'button-group');
    sectionOne.appendChild(playMessage);
    playMessage.classList.add('fade-in');


    rockButton.addEventListener('click', () => { 
        removeButtonGroup(rockButton, paperButton, scissorsButton);
        choice = "rock"; 
    });
    paperButton.addEventListener('click', () => { 
        removeButtonGroup(paperButton, rockButton, scissorsButton);
        choice = "paper";
    });
    scissorsButton.addEventListener('click', () => { 
        removeButtonGroup(scissorsButton, paperButton, rockButton);
        choice = "scissors";
    });
        removeItemMedium(playMessage);
        return choice;
}

function removeButtonGroup(buttonClicked, buttonTwo, buttonThree) {
    removeItemMedium(buttonClicked);
    removeItem(buttonTwo);
    removeItem(buttonThree);
}

function removeItem(item) {
    item.classList.add('disappear');
    setTimeout( () => { item.remove() }, 450 );
}

function removeItemMedium(item) {
    setTimeout( () => { item.classList.add('disappear') }, 200 );
    setTimeout( () => { item.remove() }, 450 );
}

function removeItemSlow(item) {
    setTimeout( () => { item.classList.add('disappear-slow') }, 500 );
    setTimeout( () => { item.remove() }, 1500 );
}


// game();
