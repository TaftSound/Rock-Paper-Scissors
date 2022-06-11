// Declare global variables
let numAttempts = -1;
let compScore = 0;
let playerScore = 0;
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
function playerInput() {
    let input = prompt("Rock, Paper, or Scissors?").toLowerCase();
    if ( (input !== "rock")
        && (input !== "scissors")
        && (input !== "paper") ) {
        alert("Please make a valid selection!");
    // Below is used to exit recursion and limit num of functions on call stack
        ++numAttempts;
        if (numAttempts < 5) { return playerInput(); }
        else { resetRecursion = true; return }; 
    }
    else {
    resetRecursion = false;
    numAttempts = -1;
    return capFirstLetter(input);
    }
}

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

game();