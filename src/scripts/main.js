import questionArray from "../data/questions.js"

let player1Score, player2Score = 0

let currentPlayer = 1;
let currentAnswer = null


function game() {
    playerTurn(1);

   
}







function playerTurn(playerId) {
    const answer = null
    // show player turn
    showTurn(playerId);

    // generate new question
    const randomIndex = Math.floor(Math.random() * questionArray.length);
    showQuestion(randomIndex);

    // check if buttons are pressed
    initButtons();
    
    checkAnswer(answer, randomIndex);

    // check if answer is correct
    // add points to user
    // switch turn
}

function initButtons() {
    const $trueButton = document.querySelector(".button--true");
    const $falseButton = document.querySelector(".button--false");

    $trueButton.addEventListener('click', () => {
        console.log("pressed true");
        answer = true;
    })

    $falseButton.addEventListener('click', () => {
        console.log("pressed false");
        answer = false;
    })
}

function showQuestion(randomIndex) {
    const $showQuestion = document.querySelector('.quiz__question');
    $showQuestion.innerHTML = questionArray[randomIndex].question;
}

function showTurn() {
    const $showTurn = document.querySelector('.quiz__player-turn');
    $showTurn.innerHTML = `Speler ${currentPlayer} aan de beurt`
}

function checkAnswer() {
    if
}

game();