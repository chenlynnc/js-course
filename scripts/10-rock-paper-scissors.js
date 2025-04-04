let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScore();

let isAutoPlaying = false;
let intervalId;

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        resolve('rock');
    } else if (event.key === 'p') {
        resolve('paper');
    } else if (event.key === 's') {
        resolve('scissors');
    }
});

document.querySelector('.js-rock-button').addEventListener('click', () => {
    resolve('rock');
});
document.querySelector('.js-paper-button').addEventListener('click', () => {
    resolve('paper');
});
document.querySelector('.js-scissors-button').addEventListener('click', () => {
    resolve('scissors');
});
document.querySelector('.js-reset-button').addEventListener('click', () => {
    reset();
});
document.querySelector('.js-auto-button').addEventListener('click', () => {
    autoPlay();
});

function chooseMove() {
    const randomNumber = Math.random();
    let move = '';

    if (randomNumber < 1/3) {
        move = 'rock';
    } else if (randomNumber < 2/3) {
        move = 'paper';
    } else {
        move = 'scissors';
    }

    return move;
}

function resolve(userMove) {
    let result = '';
    let computerMove = chooseMove();

    if (userMove === computerMove) {
        result = 'Tie.'
        score.ties++;
    } else {
        if (userMove === 'rock' && computerMove === 'scissors') {
            result = 'You win!';
            score.wins++;
        } else if (userMove === 'paper' && computerMove === 'rock') {
            result = 'You win!';
            score.wins++;
        } else if (userMove === 'scissors' && computerMove === 'paper') {
            result = 'You win!';
            score.wins++;
        } else {
            result = 'You lose...';
            score.losses++;
        }
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScore();
    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `
        You
        <img class="move-icon" src="./icons/${userMove}-emoji.png">
        <img class="move-icon" src="./icons/${computerMove}-emoji.png">
        Computer`;
}

function updateScore() {
    document.querySelector('.js-score').innerHTML = `Score: ${score.wins} wins | ${score.losses} losses | ${score.ties} ties`;
}

function reset() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScore();
}

function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            const userMove = chooseMove();
            resolve(userMove);
        }, 1000);
        isAutoPlaying = true;
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
}