import questionArray from "../data/questions.js";

let player1Score = 0, player2Score = 0;
let currentPlayer = 1;
let currentCorrectAnswer = null;

const $showQuestion = document.querySelector('.quiz__question');
const $showTurn = document.querySelector('.quiz__player-turn');

const $trueButton = document.querySelector(".button--true");
const $falseButton = document.querySelector(".button--false");

function game() {
    initButtons();
    visualizePoints()
    playerTurn();
}

function initButtons() {
    $trueButton.addEventListener("click", () => checkAnswer(true, currentCorrectAnswer));

    $falseButton.addEventListener("click", () => checkAnswer(false, currentCorrectAnswer));
}

function playerTurn() {
    document.querySelector(".quiz__answer").innerHTML = ""
    $showTurn.innerHTML = `Speler ${currentPlayer} is aan de beurt`;

    const randomQuestion = questionArray[Math.floor(Math.random() * questionArray.length)];
    currentCorrectAnswer = randomQuestion.answer;
    $showQuestion.innerHTML = randomQuestion.question;

    visualizePoints();
}

function checkAnswer(givenAnswer, correctAnswer) {
    const $showAnswer = document.querySelector(".quiz__answer");
    if (givenAnswer === correctAnswer) {
        currentPlayer === 1 ? player1Score++ : player2Score++;
        $showAnswer.innerHTML = `Correct! Speler ${currentPlayer} +1 punt`
        
    } else {
        currentPlayer === 1 ? player2Score++ : player1Score++;
        $showAnswer.innerHTML = `Incorrect! Speler ${currentPlayer === 1 ? 2 : 1} +1 punt`
    }

    currentPlayer = currentPlayer === 1 ? 2 : 1;
    setTimeout(() => playerTurn(), 1000);
}

function visualizePoints() {
    const playerProgress = document.querySelectorAll('.progress');
    const scores = [player1Score, player2Score];

    //loop over scores and visualize them
    playerProgress.forEach((progress, index) => {
        for (const child of progress.children) {
            child.classList.remove('current');
        }
        if (scores[index] < progress.children.length) {
            progress.children[scores[index] + 1].classList.add('current', 'completed');
        }
    });

    // check for winner
    if (player1Score >= 10) {
        playerWins(1);
    } else if (player2Score >= 10) {
        playerWins(2);
    }
}

function playerWins(playerId) {
    $trueButton.style.display = "none"
    $falseButton.style.display = "none"
    $showQuestion.innerHTML = `Speler ${playerId} wint het spel!`
    $showTurn.innerHTML = "<a class='quiz__link' href='/game.html'>Speel nog eens</a>";
}

game();