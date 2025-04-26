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
    document.querySelector(".quiz__answer").innerHTML = ""
    $showTurn.innerHTML = `Speler ${currentPlayer} is aan de beurt`;

    const randomIndex = Math.floor(Math.random() * questionArray.length);
    const question = questionArray[randomIndex];

    currentCorrectAnswer = question.answer;
    $showQuestion.innerHTML = questionArray[randomIndex].question;

    visualizePoints();

    console.log(player1Score, player2Score);
}

function handleAnswer(givenAnswer) {
    checkAnswer(givenAnswer, currentCorrectAnswer);
}

function checkAnswer(givenAnswer, correctAnswer) {
    const $showAnswer = document.querySelector(".quiz__answer");
    if (givenAnswer === correctAnswer) {
        currentPlayer === 1 ? player1Score++ : player2Score++;
        $showAnswer.innerHTML = `Correct! Speler ${currentPlayer} +1 punt`
        
    } else {
        console.log('Incorrect');
        currentPlayer === 1 ? player2Score++ : player1Score++;
        $showAnswer.innerHTML = `Incorrect! Speler ${currentPlayer === 1 ? 2 : 1} +1 punt`
    }

    currentPlayer = currentPlayer === 1 ? 2 : 1;
    setTimeout(() => playerTurn(currentPlayer), 500);
}

game();


function visualizePoints() {
    const playerProgress = document.querySelectorAll('.progress');
    
    //Player 1
    for (const child of playerProgress[0].children) {
        child.classList.remove('current');
    }
    if (player1Score < playerProgress[0].children.length) {
        playerProgress[0].children[player1Score+1].classList.add('current');
        playerProgress[0].children[player1Score+1].classList.add('completed');
    }

    //Player 2
    for (const child of playerProgress[1].children) {
        child.classList.remove('current');
    }
    if (player2Score < playerProgress[1].children.length) {
        playerProgress[1].children[player2Score+1].classList.add('current');
        playerProgress[1].children[player2Score+1].classList.add('completed');
    }

    // check winner
    if (player1Score >= 10) {
        console.log('player 1 wins');
        playerWins(1);
        
    } else if (player2Score >= 10) {
        console.log('player 2 wins');
        playerWins(2);
        
    }
}

function playerWins(playerId) {
    $trueButton.style.display = "none"
    $falseButton.style.display = "none"
    $showQuestion.innerHTML = `Speler ${playerId} wint het spel!`
    $showTurn.innerHTML = "<a class=='quiz__link' href='/game.html'>Speel nog eens</a>"
}
