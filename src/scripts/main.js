import questionArray from "../data/questions.js";

let player1Score = 0, player2Score = 0;
let currentPlayer = 1;
let currentCorrectAnswer = null;

const $trueButton = document.querySelector(".button--true");
const $falseButton = document.querySelector(".button--false");

function game() {
    initButtons();
    playerTurn(currentPlayer);
}

function initButtons() {
    $trueButton.addEventListener("click", () => {
        handleAnswer(true);
    });

    $falseButton.addEventListener("click", () => {
        handleAnswer(false);
    });
}

function playerTurn(playerId) {
    showTurn(playerId);

    const randomIndex = Math.floor(Math.random() * questionArray.length);
    const question = questionArray[randomIndex];

    currentCorrectAnswer = question.answer;
    showQuestion(randomIndex);

    visualizePoints();
}

function handleAnswer(givenAnswer) {
    checkAnswer(givenAnswer, currentCorrectAnswer);
}

function checkAnswer(givenAnswer, correctAnswer) {
    if (givenAnswer === correctAnswer) {
        console.log('Correct');
        currentPlayer === 1 ? player1Score++ : player2Score++;
    } else {
        console.log('Incorrect');
        currentPlayer === 1 ? player2Score++ : player1Score++;
    }

    console.log(`Player 1: ${player1Score}, Player 2: ${player2Score}`);

    currentPlayer = currentPlayer === 1 ? 2 : 1;
    setTimeout(() => playerTurn(currentPlayer), 200);
}

function showQuestion(randomIndex) {
    const $showQuestion = document.querySelector('.quiz__question');
    $showQuestion.innerHTML = questionArray[randomIndex].question;
}

function showTurn() {
    const $showTurn = document.querySelector('.quiz__player-turn');
    $showTurn.innerHTML = `Speler ${currentPlayer} is aan de beurt`;
}

game();


function visualizePoints() {
    const playerProgress = document.querySelectorAll('.progress');
    
    //Player 1
    for (const child of playerProgress[0].children) {
        child.classList.remove('current');
    }
    if (player1Score < playerProgress[0].children.length) {
        playerProgress[0].children[player1Score].classList.add('current');
    }

    //Player 2
    for (const child of playerProgress[1].children) {
        child.classList.remove('current');
    }
    if (player2Score < playerProgress[1].children.length) {
        playerProgress[1].children[player2Score].classList.add('current');
    }
}
