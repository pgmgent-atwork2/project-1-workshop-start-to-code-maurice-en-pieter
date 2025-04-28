import questionArray from "../data/questions.js";

let player1Score = 0, player2Score = 0;
let currentPlayer = 1;
let currentAnswer = null;
let isWaiting = false;

const $questionDisplay = document.querySelector('.quiz__question');
const $playerTurnDisplay = document.querySelector('.quiz__turn');
const $answerDisplay = document.querySelector(".quiz__answer");
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
    const randomQuestion = questionArray[Math.floor(Math.random() * questionArray.length)];
    $questionDisplay.innerHTML = randomQuestion.question;
    currentAnswer = randomQuestion.answer;

    $playerTurnDisplay.innerHTML = `<span class="quiz__player--${currentPlayer}">Speler ${currentPlayer}</span> is aan de beurt`;

    updatePoints();

    $answerDisplay.innerHTML = "";
    isWaiting = false;
}

function checkAnswer(givenAnswer, correctAnswer) {
    isWaiting = true;

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

    playerPoints.forEach((points, index) => {
        for (const child of points.children) {
            child.classList.remove('progress__step--current');
        }
        if (scores[index] < points.children.length) {
            if(scores[index] < 10) {
                points.children[scores[index]].classList.add('progress__step--current', 'progress__step--completed');
            }
        }
    });

    if (player1Score > 9) {
        playerWins(1);
    } else if (player2Score > 9) {
        playerWins(2);
    }
}

function playerWins(playerId) {
    $trueButton.style.display = "none";
    $falseButton.style.display = "none";
    $questionDisplay.innerHTML = `Speler ${playerId} wint het spel!`;
    $playerTurnDisplay.innerHTML = "<a class='quiz__link' href='javascript: location.reload();'>Speel nog eens</a>";
}

startGame();