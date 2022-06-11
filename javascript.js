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

function playRound( computerSelection, playerSelection )
{
    let comp = computerSelection.toUpperCase();
    let player = playerSelection.toUpperCase();
    if ( comp === player )
    {
        return `Computer: ${comp}  Player: ${player}\n The game is a tie!`;
    }
    else if ( (comp === "ROCK") && (player === "SCISSORS")
            || (comp === "SCISSORS") && (player === "PAPER")
            || (comp === "PAPER") && (player === "ROCK") )
    {
            return `Computer: ${comp}  Player: ${player}\n You lose! ${comp} beats ${player}`;
    }
    else
    {
        return `Computer: ${comp}  Player: ${player}\n You win! ${player} beats ${comp}`;
    }
}

let computerSelection = computerPlay();
console.log(computerSelection);
let result = playRound(computerSelection, "PAPER");
console.log(result);