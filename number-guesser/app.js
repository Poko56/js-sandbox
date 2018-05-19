// set initial value for degugging
setInitialValue();

// game values
let min = 1,
    max = 10,
    winningNum = getWinningNum(min, max),
    guessesLeft = 3;

// ui element
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

console.log(winningNum);

// assign ui min and max
minNum.textContent = min;
maxNum.textContent = max;

// play again event listener
game.addEventListener('mousedown', e => {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
});

// listen for guess
guessBtn.addEventListener('click', () => {
    let guess = parseInt(guessInput.value);

    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}.`, 'red');
        return;
    }

    // check if won
    if (guess === winningNum) {
        // game over - correct number
        gameOver(true, `${winningNum} is correct!`);
    } else {
        // wrong number
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            // game over - lost
            gameOver(false, `Game over, you loast. The correct number was ${winningNum}.`);
        } else {
            // game continues - wrong number
            guessInput.style.bordeColor = 'red';
            guessInput.value = '';
            setMessage(`${guess} is not correct. You can answer ${guessesLeft} times.`, 'red');
        }
    }
});

// set message for the user
function setMessage(text, color) {
    const message = document.querySelector('.message');

    message.textContent = text;
    message.style.color = color;
}

// game over
function gameOver(won, msg) {
    won === true ? color = 'green' : color = 'red';

    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    setMessage(msg, color);

    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// get winning number
function getWinningNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// set initial vlaue for debugging
function setInitialValue() {
    // ui element
    const game = document.querySelector('#game'),
        minNum = document.querySelector('.min-num'),
        maxNum = document.querySelector('.max-num'),
        guessBtn = document.querySelector('#guess-btn'),
        guessInput = document.querySelector('#guess-input'),
        message = document.querySelector('.message');

    guessInput.value = 3;
}