import questionArray from "../data/questions.js"

let player1Score, player2Score = 0

const startingPlayer = 1;

function showQuestion() {
    const $showQuestion = document.querySelector('.quiz__question');

    const randomIndex = Math.floor(Math.random() * questionArray.length)    
    const randomQuestion = questionArray[randomIndex]
    $showQuestion.innerHTML = randomQuestion.question;
}

function game() {
    const $showTurn = document.querySelector('.quiz__player-turn');
    $showTurn.innerHTML = `Speler ${startingPlayer} aan de beurt`
}
showQuestion()