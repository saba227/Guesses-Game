// variables
let randomNumbers = Math.floor(Math.random() * 100) + 1;

let instruction = document.getElementById("inst");

const guesses = document.querySelector('.guesses');
const lowOrHi = document.querySelector('.lowOrHi');

const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

const level = document.getElementById("level");
const levelSubmit = document.getElementById("levelSubmit");

let guessCount = 1;
let resetButton;

//Evenets
guessSubmit.addEventListener('click', checkGuess);

levelSubmit.addEventListener('click', levelFunc)

guessField.focus();

//function
function levelFunc() {
    localStorage.setItem("name", level.value)
    history.go(0);
}

let storage = localStorage.getItem("name");
let cc = storage;
instruction.innerHTML = cc;

function checkGuess() {
    instruction.innerHTML = (cc--) - 1;
    let userGuess = Number(guessField.value);
    guesses.textContent += ' ' + userGuess + ' ';

    if(userGuess === randomNumbers) {
        lowOrHi.textContent = 'Number is: right';
        setGameOver();
        let winImg = document.createElement('img');
        winImg.src = `https://i.pinimg.com/originals/5d/76/11/5d76115d13c6342f021650e3d1153d5c.gif`;
        document.querySelector('.guesesGame').append(winImg);
    } else if (guessCount == storage) {
        setGameOver();
        let luseImg = document.createElement('img');
        luseImg.src = `https://c.tenor.com/BIberFib_aoAAAAC/willy-wonka-you-lose.gif`;
        document.querySelector('.guesesGame').append(luseImg);
    } else {
        if(userGuess < randomNumbers) {
            lowOrHi.textContent = 'Number is: small';
        } else if (userGuess > randomNumbers) {
            lowOrHi.textContent = 'Number is: large'
        }
    }
    guessCount++;
    guessField.value = '';
    guessField.focus();
}

// enter event
window.addEventListener('keyup', (event) => {
    if(event.which == 13) {
        checkGuess();
    }
})

// level 
for(let i = 0; i < level.length; i++) {
    if(level[i].value == storage) {
        level[i].selected = "selected";
    }
}

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start new game!';
    document.querySelector('.guesesGame').append(resetButton);
    resetButton.addEventListener('click', resetGame);
    resetButton.classList.add('resetButton');
}

function resetGame() {
    guessCount = 1;
    guesses.textContent = "Previous guesses:";
    lowOrHi.textContent = "Number is:"
    resetButton.remove();
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();
    randomNumbers = Math.floor(Math.random() * 100) + 1;
    history.go(0);
}