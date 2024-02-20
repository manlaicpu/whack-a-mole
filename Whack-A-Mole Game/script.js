const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('startButton');
let score = 0;
let timeLeft = 10;
let gameInterval;

function randomTime(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min + 500;
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    return hole;
}

function peep() {
    const time = randomTime(300, 1000);
    const hole = randomHole(holes);
    hole.querySelector('.mole').style.display = 'block';
    setTimeout(() => {
        hole.querySelector('.mole').style.display = 'none';
        if (timeLeft > 0) {
            peep();
        }
    }, time);
}

function startGame() {
    score = 0;
    timeLeft = 10;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    peep();

    gameInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(gameInterval);
            alert('Game Over! Your final score is: ' + score);
            startButton.disabled = false;
        }
    }, 1000);
}

function bonk(e) {
    if (!e.isTrusted) return; 
    const mole = this.querySelector('.mole');
    if (mole.style.display === 'block') {
        score += 5;
        mole.style.display = 'none';
    } else {
        score -= 5;
    }
    scoreDisplay.textContent = score;
}

holes.forEach(hole => hole.addEventListener('click', bonk));
startButton.addEventListener('click', () => {
    startButton.disabled = true;
    startGame();
});
