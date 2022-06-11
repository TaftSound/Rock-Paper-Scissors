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
let numAttempts = -1;

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
        else {return "Too many failed attempts"};
    }
    let firstLetterCap = input.charAt(0).toUpperCase();
    input = firstLetterCap + input.substring(1);
    numAttempts = -1;
    return input;
}

function playRound( computerSelection, playerSelection )
{
    let comp = computerSelection();
    let player = playerSelection();
    if ( comp === player )
    {
        return `Computer: ${comp}  Player: ${player}\n The game is a tie!`;
    }
    else if ( (comp === "Rock") && (player === "Scissors")
            || (comp === "Scissors") && (player === "Paper")
            || (comp === "Paper") && (player === "Rock") )
    {
            return `Computer: ${comp}  Player: ${player}\n You lose! ${comp} beats ${player}`;
    }
    else
    {
        return `Computer: ${comp}  Player: ${player}\n You win! ${player} beats ${comp}`;
    }
}

let round = playRound( computerPlay(), playerInput() );
console.log(round);