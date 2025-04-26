import questionArray from "../data/questions.js";

let player1Score = 0, player2Score = 0;
let currentPlayer = 1;
let currentAnswer = null;
let isWaiting = false;

const $questionDisplay = document.querySelector('.quiz__question');
const $playerTurnDisplay = document.querySelector('.quiz__player-turn');
const $trueButton = document.querySelector(".button--true");
const $falseButton = document.querySelector(".button--false");

function startGame() {
    initButtons();
    updatePoints();
    playerTurn();
}

function initButtons() {
    $trueButton.addEventListener("click", () => {
        if (!isWaiting) {
            checkAnswer(true, currentAnswer);
        }
    });

    $falseButton.addEventListener("click", () => {
        if (!isWaiting) {
            checkAnswer(false, currentAnswer);
        }
    });
}

function playerTurn() {
    document.querySelector(".quiz__answer").innerHTML = "";
    $playerTurnDisplay.innerHTML = `Speler ${currentPlayer} is aan de beurt`;

    const randomQuestion = questionArray[Math.floor(Math.random() * questionArray.length)];
    currentAnswer = randomQuestion.answer;
    $questionDisplay.innerHTML = randomQuestion.question;

    updatePoints();
    isWaiting = false;
}

function checkAnswer(givenAnswer, correctAnswer) {
    isWaiting = true;
    const $answerDisplay = document.querySelector(".quiz__answer");

    if (givenAnswer === correctAnswer) {
        currentPlayer === 1 ? player1Score++ : player2Score++;
        $answerDisplay.innerHTML = `Correct! Speler ${currentPlayer} +1 punt`;
    } else {
        currentPlayer === 1 ? player2Score++ : player1Score++;
        $answerDisplay.innerHTML = `Incorrect! Speler ${currentPlayer === 1 ? 2 : 1} +1 punt`;
    }

    currentPlayer = currentPlayer === 1 ? 2 : 1;

    setTimeout(() => { playerTurn()}, 1000);
}

function updatePoints() {
    const playerPoints = document.querySelectorAll('.progress');
    const scores = [player1Score, player2Score];

    playerPoints.forEach((progress, index) => {
        for (const child of progress.children) {
            child.classList.remove('current');
        }
        if (scores[index] < progress.children.length) {
            progress.children[scores[index] + 1].classList.add('current', 'completed');
        }
    });

    if (player1Score >= 10) {
        playerWins(1);
    } else if (player2Score >= 10) {
        playerWins(2);
    }
}

function playerWins(playerId) {
    $trueButton.style.display = "none";
    $falseButton.style.display = "none";
    $questionDisplay.innerHTML = `Speler ${playerId} wint het spel!`;
    $playerTurnDisplay.innerHTML = "<a class='quiz__link' href='/game.html'>Speel nog eens</a>";
}

startGame();