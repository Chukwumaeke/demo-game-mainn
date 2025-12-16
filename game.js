document.addEventListener('DOMContentLoaded', () => {
  const GAME_TIME = 30; // seconds
  const startBtn = document.getElementById('startBtn');
  const scoreEl = document.getElementById('score');
  const timeEl = document.getElementById('time');
  const bestEl = document.getElementById('best');
  const gameArea = document.getElementById('gameArea');

  let score = 0;
  let timeLeft = GAME_TIME;
  let timer = null;
  let dot = null;

  // Initialize best score from localStorage
  bestEl.textContent = localStorage.getItem('dotBest') || '0';

  function placeDot() {
    if (!gameArea) return;
    const areaRect = gameArea.getBoundingClientRect();
    const dotSize = 36;

    if (!dot) {
      dot = document.createElement('div');
      dot.className = 'dot';
      gameArea.appendChild(dot);
      dot.addEventListener('click', onDotClick);
    }

    const x = Math.max(0, Math.random() * (areaRect.width - dotSize));
    const y = Math.max(0, Math.random() * (areaRect.height - dotSize));
    dot.style.left = x + 'px';
    dot.style.top = y + 'px';

    // tiny pop animation
    dot.style.transform = 'scale(0.98)';
    requestAnimationFrame(() => dot.style.transform = 'scale(1)');
  }

  function onDotClick() {
    score += 1;
    scoreEl.textContent = score;
    placeDot();
  }

  function startGame() {
    score = 0;
    timeLeft = GAME_TIME;
    scoreEl.textContent = score;
    timeEl.textContent = timeLeft;
    startBtn.disabled = true;

    placeDot();

    timer = setInterval(() => {
      timeLeft -= 1;
      timeEl.textContent = timeLeft;
      if (timeLeft <= 0) {
        endGame();
      }
    }, 1000);
  }

  function endGame() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    startBtn.disabled = false;
    if (dot) {
      dot.removeEventListener('click', onDotClick);
      dot.remove();
      dot = null;
    }

    const prevBest = Number(localStorage.getItem('dotBest') || 0);
    if (score > prevBest) {
      localStorage.setItem('dotBest', score);
      bestEl.textContent = score;
      setTimeout(() => alert(`Time's up! New best: ${score}`), 20);
    } else {
      setTimeout(() => alert(`Time's up! Score: ${score}`), 20);
    }
  }

  startBtn.addEventListener('click', startGame);
});
