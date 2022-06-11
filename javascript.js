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

console.log(computerPlay());