<?php
// Bubble Pop Mania — game interface
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Bubble Pop Mania</title>
  <link rel="stylesheet" href="assets.css">
</head>
<body>
  <main class="app">
    <header class="topbar">
      <a class="brand" href="#"><span class="brand-mark">●</span> Bubble Pop <b>Mania</b></a>
      <span class="tag">ARCADE MODE</span>
    </header>

    <section class="hero">
      <p class="eyebrow">POP • SCORE • BEAT THE CLOCK</p>
      <h1>Ready, set, <span>POP!</span></h1>
      <p class="subtitle">Pop as many bubbles as you can before time runs out.</p>
    </section>

    <section class="game-shell" aria-label="Bubble Pop game">
      <div class="hud">
        <div class="stat"><span class="stat-label">SCORE</span><strong id="score">0</strong></div>
        <div class="stat timer-stat"><span class="stat-label">TIME LEFT</span><strong id="timer">30</strong></div>
        <div class="stat"><span class="stat-label">BEST</span><strong id="best">0</strong></div>
      </div>

      <div class="progress-track"><div id="time-progress"></div></div>

      <div id="playfield" class="playfield">
        <div id="overlay" class="overlay">
          <div class="overlay-card">
            <div class="bubble-logo">✦</div>
            <h2 id="overlay-title">Let's play!</h2>
            <p id="overlay-copy">Tap or click the bubbles to score points. They get faster as you play!</p>
            <button id="start-btn" class="primary-btn">Start game <span>→</span></button>
          </div>
        </div>
      </div>

      <div class="game-footer">
        <span>✦ Each bubble = <b>10 points</b></span>
        <span>⚡ Speed increases over time</span>
        <button id="restart-btn" class="text-btn" disabled>Restart</button>
      </div>
    </section>

    <section class="bottom-grid">
      <article class="info-card">
        <span class="info-icon">🎯</span>
        <div><h3>How to play</h3><p>Click or tap the colorful bubbles before they disappear.</p></div>
      </article>
      <article class="info-card">
        <span class="info-icon">🏆</span>
        <div><h3>Beat your best</h3><p>Your top score is saved on this device and in the leaderboard.</p></div>
      </article>
    </section>

    <section class="leaderboard">
      <div class="leader-heading">
        <div><p class="eyebrow">TOP PLAYERS</p><h2>Leaderboard</h2></div>
        <span class="live-dot">● Live scores</span>
      </div>
      <div id="leaderboard-content" class="leader-content">
        <p class="muted">Loading scores…</p>
      </div>
    </section>
    <footer>Bubble Pop Mania <span>•</span> Made for fun. Play again!</footer>
  </main>

  <script src="game.js"></script>
</body>
</html>
