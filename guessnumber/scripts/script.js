//Generate a random number between 1 and 100
let randomNumber = parseInt((Math.random()*100) + 1);
const submit = document.querySelector('#subm');
const userInput = document.querySelector('#guessField');
const guessArea = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const startOver = document.querySelector('.results');
const lowOrHi = document.querySelector('.lowOrHigh');
const p = document.createElement('p');
let previousGuesses = [];
let numGuesses = 1;
let playGame = true;

if(playGame) {
    subm.addEventListener('click', (e) => {
        e.preventDefault();
        //Get guess from user
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    });
}

function validateGuess(guess){
    if(isNaN(guess)) {
        alert('Please enter a valid number');
    } else if(guess < 1) {
        alert('Please enter a number greater than 1');
    } else if(guess > 100) {
        alert('Please enter a number less than 100');
    } else {
        //Keep track of the number of guesses attempted
        previousGuesses.push(guess);
        //Check to see if they exhausted their turns
        if(numGuesses === 11) {
            displayGuesses(guess);
            displayMessage(`Game is Over! The number was ${randomNumber}`);
            endGame();
        } else {
            //Show previous guesses
            displayGuesses(guess);
            //Check to see if guess is wrong and display if so
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    //Show user a hint if guess is too high or low
    if(guess === randomNumber) {
        displayMessage(`You guessed the correct number!`);
        endGame();
    } else if (guess < randomNumber) {
        displayMessage(`Your guess is too low! Try again!`);
    } else if(guess > randomNumber) {
        displayMessage(`Your guess is too high! Try again!`);
    }
}

function displayGuesses(guess){
    userInput.value = '';
    guessArea.innerHTML += `${guess}  `;
    numGuesses++;
    remaining.innerHTML = `${11 - numGuesses}  `;
}

function displayMessage(message) {
    lowOrHi.innerHTML = `<h1>${message}</h1>`;
}

function endGame() {
    //Clear the users input
    userInput.value = '';
    //Disable the user input button
    userInput.setAttribute('disabled', '');
      //Display the start new game button
       p.classList.add('button');
       p.innerHTML = `<h1 id="newGame">Start A New Game</h1>`
    startOver.appendChild(p);
    playGame = false;
    newGame();
}

function newGame() {
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', function() {
        //A new random number is is created
        randomNumber = parseInt((Math.random()*100 + 1));
        previousGuesses = [];
        numGuesses = 1;
        guessArea.innerHTML = '';
        lowOrHi.innerHTML = '';
        remaining.innerHTML = `${11 - numGuesses} `;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        playGame = true;
    })
}