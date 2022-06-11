function computerPlay()
{
    let selector = Math.floor( Math.random() * 3 );
    switch (selector)
    {
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

function playerInput()
{
    let input = prompt("Rock, Paper, or Scissors?").toLowerCase();
    if ( (input !== "rock")
        && (input !== "scissors")
        && (input !== "paper") )
    {
        alert("Please make a valid selection!");
        ++numAttempts;
        if (numAttempts < 5) { return playerInput(); }
        else { resetRecursion = true; return };
    }
    let firstLetterCap = input.charAt(0).toUpperCase();
    input = firstLetterCap + input.substring(1);
    resetRecursion = false;
    numAttempts = -1;
    return input;
}

function playRound()
{
    let comp = computerPlay();
    let player = playerInput();
    while (resetRecursion)
    {
        numAttempts = -1;
        player = playerInput();
    }
    if ( comp === player )
    {
        ++playerScore;
        ++compScore;
        return `Computer: ${comp}  Player: ${player}\n This round is a tie!`;
    }
    else if ( (comp === "Rock") && (player === "Scissors")
            || (comp === "Scissors") && (player === "Paper")
            || (comp === "Paper") && (player === "Rock") )
    {
            ++compScore;
            return `Computer: ${comp}  Player: ${player}\n You lose this round! ${comp} beats ${player}`;
    }
    else
    {
        ++playerScore;
        return `Computer: ${comp}  Player: ${player}\n You win this round! ${player} beats ${comp}`;
    }
}

let numAttempts = -1;
let compScore = 0;
let playerScore = 0;
let resetRecursion = false;

function game() 
{
    for ( let i = 0; i < 5; i++ )
    {
        console.log(playRound());
    }
    console.log(`Computer Score: ${compScore} Player Score: ${playerScore}\n`);
    if ( compScore > playerScore )
    {
        console.log("You lose the game!");
    }
    else if ( compScore < playerScore )
    {
        console.log("You win the game!");
    }
    else { console.log("The game ends in a tie!"); }
}


game();