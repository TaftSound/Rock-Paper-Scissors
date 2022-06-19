// Declare global variables
// let numAttempts = -1;

// let resetRecursion = false;

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
// function playRound() {
//     let comp = computerPlay();
//     let player = playerChoice;
    // while (resetRecursion) {
    //     numAttempts = -1;
    //     player = playerInput();
    // }
//     if ( comp === player ) {
//         ++playerScore;
//         ++computerScore;
//         return `Computer: ${comp}  Player: ${player}\n This round is a tie!`;
//     }
//     else if ( (comp === "Rock") && (player === "Scissors")
//             || (comp === "Scissors") && (player === "Paper")
//             || (comp === "Paper") && (player === "Rock") ) {
//             ++compScore;
//             return `Computer: ${comp}  Player: ${player}\n You lose this round! ${comp} beats ${player}`;
//     }
//     else {
//         ++playerScore;
//         return `Computer: ${comp}  Player: ${player}\n You win this round! ${player} beats ${comp}`;
//     }
// }

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
let playerChoice = "";
let computerChoice = "";
let roundMessage = "";
let roundNumber = 1;
let nextRoundButton;

beginButton.classList.add('fade-in');

beginButton.addEventListener('click', () => {
    removeItemMedium(beginButton);
    setTimeout( () => { playRound() }, 500 );
});



function playRound() {
    roundMessage = createRoundMessage(`Round: ${roundNumber}`);
    setTimeout( () => {
        sectionOne.appendChild(roundMessage);
        roundMessage.classList.add('fade-in');
    }, 250 );
    setTimeout( () => { 
        removeItemMedium(roundMessage); 
    }, 1100 );
    setTimeout( () => {
        createGameRound();
    }, 1850 );
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

function createGameRound() {
    const buttonGroup = document.createElement('div');
    const rockButton = createButton('Rock');
    const paperButton = createButton('Paper');
    const scissorsButton = createButton('Scissors');
    const playMessage = createGameMessage('Make Your Move:');
    let choice = "";

    sectionTwo.appendChild(buttonGroup);
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
        removeButtonGroup(rockButton, paperButton, scissorsButton, buttonGroup);
        removeItemMedium(playMessage);
        playerChoice = "Rock";
        setTimeout( () => { calculateWinner(); }, 750);
    });
    paperButton.addEventListener('click', () => { 
        removeButtonGroup(paperButton, rockButton, scissorsButton, buttonGroup);
        removeItemMedium(playMessage);
        playerChoice = "Paper";
        setTimeout( () => { calculateWinner(); }, 750);
    });
    scissorsButton.addEventListener('click', () => { 
        removeButtonGroup(scissorsButton, paperButton, rockButton, buttonGroup);
        removeItemMedium(playMessage);
        playerChoice = "Scissors";
        setTimeout( () => { calculateWinner(); }, 750);
    });
}

function calculateWinner() {
    
    computerChoice = computerPlay();
    let winnerMessage = "";
    if ( computerChoice === playerChoice ) {
        ++playerScore;
        ++computerScore;
        winnerMessage = createRoundMessage("This round is a tie!");
    }
    else if ( (computerChoice === "Rock") && (playerChoice === "Scissors")
            || (computerChoice === "Scissors") && (playerChoice === "Paper")
            || (computerChoice === "Paper") && (playerChoice === "Rock") ) {
        ++computerScore;
        winnerMessage = createRoundMessage("You lose this round!");
    }
    else {
        ++playerScore;
        winnerMessage = createRoundMessage("You win this round!");
    }
    let computerChoiceMessage = createGameMessage(`Computer: ${computerChoice}`);
    let playerChoiceMessage = createGameMessage(`Player: ${playerChoice}`);
    sectionOne.appendChild(playerChoiceMessage);
    sectionOne.appendChild(computerChoiceMessage);
    sectionTwo.appendChild(winnerMessage);

    playerChoiceMessage.classList.add('fade-in');
    // setTimeout( () => { playerChoiceMessage.classList.add('fade-in') }, 50);
    setTimeout( () => { computerChoiceMessage.classList.add('fade-in') }, 750);
    setTimeout( () => { winnerMessage.classList.add('fade-in'); }, 2000 );

    setTimeout( () => {
        removeItem(playerChoiceMessage);
        removeItem(computerChoiceMessage);
        removeItemMedium(winnerMessage);
    }, 4500 );
}

// function displayRoundWinner() {

// }

// function createNewRoundButton() {
//     setTimeout( () => {}, 550 )
// }

function createRoundMessage(round) {
    const roundAlertHeader = document.createElement('h2');
    roundAlertHeader.setAttribute('class', 'message');
    roundAlertHeader.innerText = round;
    return roundAlertHeader;
}

function createGameMessage(message) {
    const gameMessage = document.createElement('h2');
    gameMessage.classList.add('message');
    gameMessage.classList.add('small');
    gameMessage.innerText = message;
    return gameMessage;
}

function createButton(id) {
    const button = document.createElement('button');
    button.setAttribute('id', id.toLowerCase());
    button.innerText = id;
    return button;
}

function removeButtonGroup(buttonClicked, buttonTwo, buttonThree, buttonGroup) {
    removeItemMedium(buttonClicked);
    removeItem(buttonTwo);
    removeItem(buttonThree);
    removeItemMedium(buttonGroup);
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
