
const field = document.getElementById('playfield');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const bestEl = document.getElementById('best');
const progressEl = document.getElementById('time-progress');
const overlay = document.getElementById('overlay');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const titleEl = document.getElementById('overlay-title');
const copyEl = document.getElementById('overlay-copy');


const GAME_SECONDS = 30;
const colors = [
  '#ff78a9',
  '#8b72f2',
  '#54c7e8',
  '#ffc45d',
  '#67d6b0',
  '#f28bdc'
];

let score = 0;
let timeLeft = GAME_SECONDS;
let running = false;

let spawnTimer = null;
let clockTimer = null;
let difficultyTimer = null;

let spawnDelay = 850;
let bubbleLifetime = 2600;
let soundEnabled = true;
const AudioContextClass =
  window.AudioContext || window.webkitAudioContext;

const audioContext = AudioContextClass
  ? new AudioContextClass()
  : null;


const soundButton = document.createElement('button');

soundButton.type = 'button';
soundButton.className = 'text-btn';
soundButton.textContent = '🔊 Sound: ON';

soundButton.style.fontWeight = '700';
soundButton.style.cursor = 'pointer';

soundButton.addEventListener('click', () => {
  soundEnabled = !soundEnabled;

  soundButton.textContent = soundEnabled
    ? '🔊 Sound: ON'
    : '🔇 Sound: OFF';
});

document.querySelector('.game-footer').appendChild(soundButton);



function playPopSound() {
  if (!soundEnabled || !audioContext) return;

  const play = () => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = 'sine';

    oscillator.frequency.setValueAtTime(
      600,
      audioContext.currentTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
      150,
      audioContext.currentTime + 0.12
    );

    gain.gain.setValueAtTime(
      0.25,
      audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 0.12
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.12);
  };

  if (audioContext.state === 'suspended') {
    audioContext.resume().then(play).catch(console.warn);
  } else {
    play();
  }
}


function playGameOverSound() {
  if (!soundEnabled || !audioContext) return;

  const play = () => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = 'triangle';

    oscillator.frequency.setValueAtTime(
      500,
      audioContext.currentTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
      180,
      audioContext.currentTime + 0.5
    );

    gain.gain.setValueAtTime(
      0.2,
      audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 0.5
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  if (audioContext.state === 'suspended') {
    audioContext.resume().then(play).catch(console.warn);
  } else {
    play();
  }
}


bestEl.textContent = localStorage.getItem('bubbleBest') || '0';



function clearTimers() {
  clearInterval(spawnTimer);
  clearInterval(clockTimer);
  clearInterval(difficultyTimer);
}

function clearBubbles() {
  field.querySelectorAll('.bubble').forEach(bubble => {
    bubble.remove();
  });
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}


function spawnBubble() {
  if (!running) return;

  const size = random(38, 72);

  const bubble = document.createElement('button');

  bubble.type = 'button';
  bubble.className = 'bubble';

  bubble.setAttribute(
    'aria-label',
    'Pop bubble for 10 points'
  );

  bubble.style.width = size + 'px';
  bubble.style.height = size + 'px';

  bubble.style.left =
    random(5, Math.max(6, field.clientWidth - size - 5)) + 'px';

  bubble.style.top =
    random(5, Math.max(6, field.clientHeight - size - 5)) + 'px';

  const color1 = colors[
    Math.floor(Math.random() * colors.length)
  ];

  const color2 = colors[
    Math.floor(Math.random() * colors.length)
  ];

  bubble.style.background =
    `radial-gradient(circle at 32% 27%, #ffffffb9 0 7%, ${color1} 42%, ${color2} 100%)`;

  bubble.addEventListener('click', () => {
    if (!running || bubble.classList.contains('pop')) return;

    score += 10;
    scoreEl.textContent = score;

    playPopSound();

    bubble.classList.add('pop');

    setTimeout(() => bubble.remove(), 130);
  });

  field.appendChild(bubble);

  setTimeout(() => {
    if (bubble.isConnected) {
      bubble.remove();
    }
  }, bubbleLifetime);
}


function updateTimer() {
  timeLeft--;

  timerEl.textContent = timeLeft;

  progressEl.style.width =
    (timeLeft / GAME_SECONDS * 100) + '%';

  if (timeLeft <= 0) {
    endGame();
  }
}

function startGame() {
  clearTimers();
  clearBubbles();

  score = 0;
  timeLeft = GAME_SECONDS;

  spawnDelay = 850;
  bubbleLifetime = 2600;

  running = true;

  scoreEl.textContent = '0';
  timerEl.textContent = GAME_SECONDS;
  progressEl.style.width = '100%';

  overlay.classList.add('hidden');
  restartBtn.disabled = false;


  spawnBubble();

 
  spawnTimer = setInterval(
    spawnBubble,
    spawnDelay
  );

 
  clockTimer = setInterval(
    updateTimer,
    1000
  );


  difficultyTimer = setInterval(() => {
    if (!running) return;

    spawnDelay = Math.max(
      300,
      spawnDelay - 80
    );

    bubbleLifetime = Math.max(
      850,
      bubbleLifetime - 120
    );

    clearInterval(spawnTimer);

    spawnTimer = setInterval(
      spawnBubble,
      spawnDelay
    );

  }, 5000);
}



async function endGame() {
  if (!running) return;

  running = false;

  clearTimers();
  clearBubbles();

 
  playGameOverSound();

  
  const best = Number(
    localStorage.getItem('bubbleBest') || 0
  );

  if (score > best) {
    localStorage.setItem('bubbleBest', score);
    bestEl.textContent = score;
  }

 
  titleEl.textContent = 'Time’s up!';

  copyEl.textContent =
    `You scored ${score} points. Want to beat that score?`;

  startBtn.textContent = 'Play again →';

  overlay.classList.remove('hidden');
  restartBtn.disabled = false;


  await saveScore(score);
  loadLeaderboard();
}



async function saveScore(finalScore) {
  if (finalScore <= 0) return;

  const savedName = localStorage.getItem(
    'bubblePlayerName'
  );

  const enteredName = savedName ||
    prompt('Enter your name for the leaderboard:') ||
    'Player';

  const name = enteredName.trim().slice(0, 40) || 'Player';

  localStorage.setItem('bubblePlayerName', name);

  try {
    const response = await fetch('api/save_score.php', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        player_name: name,
        score: finalScore
      })
    });

    if (!response.ok) {
      throw new Error('Score could not be saved.');
    }

  } catch (error) {
    console.warn(
      'Could not save score. Check XAMPP and MySQL.',
      error
    );
  }
}


async function loadLeaderboard() {
  const target = document.getElementById(
    'leaderboard-content'
  );

  try {
    const response = await fetch('api/leaderboard.php');

    if (!response.ok) {
      throw new Error('Leaderboard unavailable');
    }

    const data = await response.json();

    if (!data.length) {
      target.innerHTML =
        '<p class="muted">No scores yet. Be the first to play!</p>';

      return;
    }

    const medals = ['🥇', '🥈', '🥉'];

    target.innerHTML = data.map((item, i) => {
      const rank = medals[i] || `#${i + 1}`;

      return `
        <div class="leader-row">
          <span class="rank">${rank}</span>

          <span class="player">
            ${escapeHTML(item.player_name)}
          </span>

          <span class="points">
            ${Number(item.score).toLocaleString()} pts
          </span>
        </div>
      `;
    }).join('');

  } catch (error) {
    console.warn('Leaderboard error:', error);

    target.innerHTML =
      '<p class="muted">Leaderboard will appear after the MySQL database is connected.</p>';
  }
}



function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, ch => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[ch]));
}


startBtn.addEventListener('click', startGame);

restartBtn.addEventListener('click', startGame);


loadLeaderboard();
