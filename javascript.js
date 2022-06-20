const beginButton = document.querySelector("#begin");
const buttonGroup = document.createElement('div');
const rockButton = createButton('Rock');
const paperButton = createButton('Paper');
const scissorsButton = createButton('Scissors');
const sectionOne = document.querySelector(".one");
const sectionTwo = document.querySelector(".two");
const sectionThree = document.querySelector(".three");
const playerScoreDisplay = document.getElementById('player');
const computerScoreDisplay = document.getElementById('computer');
const playMessage = createGameMessage('Make Your Move:');
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
    setTimeout( () => { playGame() }, 500 );
});

rockButton.addEventListener('click', () => { 
    rockButtonClick();
    nextRound();
});
paperButton.addEventListener('click', () => { 
    paperButtonClick();
    nextRound();
});
scissorsButton.addEventListener('click', () => { 
    scissorsButtonClick();
    nextRound();
});

function playGame() {
    if ( roundNumber > 2 ) {
        updateScoreDisplay();
    }
    if ( roundNumber > 5 ) {
        if ( playerScore === computerScore ) {
            finalMessage('The game ends in a tie!');
            return;
        }
        else if ( playerScore > computerScore ) {
            finalMessage('You win the game!');
            return;
        }
        else {
            finalMessage('You lose the game!');
            return;
        }
        function finalMessage(input) {
            let finalMessage = createRoundMessage(input);
            sectionTwo.appendChild(finalMessage);
            finalMessage.classList.add('fade-in');
            // setTimeout( () => { removeItemSlow(finalMessage) }, 1000);
        }
    }
    roundMessage = createRoundMessage(`Round: ${roundNumber}`);
    setTimeout( () => {
        sectionOne.appendChild(roundMessage);
        roundMessage.classList.add('fade-in');
    }, 250 );
    setTimeout( () => { 
        removeItemMedium(roundMessage); 
    }, 1100 );
    setTimeout( () => {
        playRound();
    }, 1850 );
    ++roundNumber;
}

function rockButtonClick() {
    removeButtonGroup(rockButton, paperButton, scissorsButton, buttonGroup);
    removeItemMedium(playMessage);
    playerChoice = "Rock";
    setTimeout( () => { calculateWinner(); }, 750);
}

function paperButtonClick() {
    removeButtonGroup(paperButton, rockButton, scissorsButton, buttonGroup);
    removeItemMedium(playMessage);
    playerChoice = "Paper";
    setTimeout( () => { calculateWinner(); }, 750);
}

function scissorsButtonClick() {
    removeButtonGroup(scissorsButton, paperButton, rockButton, buttonGroup);
    removeItemMedium(playMessage);
    playerChoice = "Scissors";
    setTimeout( () => { calculateWinner(); }, 750);
}

function addScoreDisplay() {
    playerScoreDisplay.innerText = `Player: ${playerScore}`;
    computerScoreDisplay.innerText = `Computer: ${computerScore}`;
    playerScoreDisplay.classList.add('fade-in');
    computerScoreDisplay.classList.add('fade-in');
}

function updateScoreDisplay() {
    playerScoreDisplay.innerText = `Player: ${playerScore}`;
    computerScoreDisplay.innerText = `Computer: ${computerScore}`;
}

function nextRound() {
    // if ( roundNumber > 5 ) { return; }
    setTimeout( () => { playGame() }, 6000 );
}

function playRound() {
    playerChoice = "";

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

}

function calculateWinner() {
    
    computerChoice = computerPlay();
    if ( computerChoice === playerChoice ) {
        ++playerScore;
        ++computerScore;
        let results = "This round is a tie!";
        displayRoundResults(results);
    }
    else if ( (computerChoice === "Rock") && (playerChoice === "Scissors")
            || (computerChoice === "Scissors") && (playerChoice === "Paper")
            || (computerChoice === "Paper") && (playerChoice === "Rock") ) {
        ++computerScore;
        let results = "You lose this round!";
        displayRoundResults(results);
    }
    else {
        ++playerScore;
        let results = "You win this round!";
        displayRoundResults(results);
    }

    function displayRoundResults(results) {
        const winnerMessage = createRoundMessage(results);
        const computerChoiceMessage = createGameMessage(`Computer: ${computerChoice}`);
        const playerChoiceMessage = createGameMessage(`Player: ${playerChoice}`);
        sectionOne.appendChild(playerChoiceMessage);
        sectionOne.appendChild(computerChoiceMessage);
        sectionTwo.appendChild(winnerMessage);
        playerChoiceMessage.classList.add('fade-in');
        setTimeout( () => { computerChoiceMessage.classList.add('fade-in') }, 750);
        setTimeout( () => { 
            winnerMessage.classList.add('fade-in'); 
            if ( roundNumber === 2 ) {
                addScoreDisplay();
            }
            else {
                updateScoreDisplay();
            }
        }, 2000 );

        setTimeout( () => {
            removeItem(playerChoiceMessage);
            removeItem(computerChoiceMessage);
            removeItemMedium(winnerMessage);
        }, 4500 );
    }

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
}

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
    setTimeout( () => {
        item.classList.remove('fade-in');
        item.classList.remove('disappear');
        item.remove();
    }, 450 );
}

function removeItemMedium(item) {
    setTimeout( () => { item.classList.add('disappear') }, 200 );
    setTimeout( () => { 
        item.classList.remove('fade-in');
        item.classList.remove('disappear');
        item.remove();
    }, 450 );
}

function removeItemSlow(item) {
    setTimeout( () => { item.classList.add('disappear-slow') }, 500 );
    setTimeout( () => { 
        item.classList.remove('fade-in');
        item.classList.remove('disappear');
        item.remove();
    }, 1500 );
}


// game();
