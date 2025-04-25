import questionArray from "../data/questions.js"

let player1Score, player2Score = 0

const startingPlayer = 1;


function game() {

    startingPlayer = initButtons();
    let currentAnswer = null;

    const $showTurn = document.querySelector('.quiz__player-turn');
    $showTurn.innerHTML = `Speler ${startingPlayer} aan de beurt`

    const randomIndex = Math.floor(Math.random() * questionArray.length)    
    showQuestion(randomIndex)    
}

function showQuestion(randomIndex) {
    const $showQuestion = document.querySelector('.quiz__question');
    $showQuestion.innerHTML = questionArray[randomIndex].question;
}

function initButtons() {
    const $trueButton = document.querySelector(".button--true");
    const $falseButton = document.querySelector(".button--false");

    $trueButton.addEventListener('click', () => {
        console.log("true");
        startingPlayer === 1 ? 2 : 1;
    })

    $falseButton.addEventListener('click', () => {
        console.log("false");
        startingPlayer === 1 ? 2 : 1;
    })

    return startingPlayer;
}

game();

