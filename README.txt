BUBBLE POP MANIA — XAMPP + MySQL VERSION
=========================================

FEATURES
- 30-second bubble-popping game
- Randomly positioned, colorful bubbles
- 10 points per successful pop
- Bubble spawn rate and disappearance speed increase as time passes
- Countdown and progress bar
- Best score saved in the browser (localStorage)
- MySQL leaderboard showing the top 10 scores
- Responsive layout for desktop and mobile

REQUIREMENTS
- XAMPP (Apache + PHP + MySQL/MariaDB)
- A modern web browser

INSTALLATION
1. Extract the "bubble_pop_mania" folder into:
   C:\xampp\htdocs\

2. Open XAMPP Control Panel and start:
   - Apache
   - MySQL

3. Open phpMyAdmin:
   http://localhost/phpmyadmin

4. Select the Import tab, choose database.sql from this folder,
   then click Import/Go.
   The SQL creates the bubble_pop_mania database and scores table.

5. If your MySQL root account has a password, edit:
   config/db.php
   Update $username and $password.

6. Open the game:
   http://localhost/bubble_pop_mania/

HOW IT WORKS
- index.php displays the game.
- game.js handles bubbles, scoring, timer, difficulty, and leaderboard requests.
- api/save_score.php validates and saves each final score.
- api/leaderboard.php returns the top 10 scores as JSON.
- config/db.php creates the PDO MySQL connection.
- database.sql creates the database and table.

IMPORTANT NOTES
- Run through http://localhost/... using XAMPP. Do not double-click index.php
  or open it as a file:// URL; PHP and MySQL will not run that way.
- Scores are sent to MySQL only when a round ends and the score is greater
  than zero. If MySQL is unavailable, the game still plays, but the online
  leaderboard cannot save/load.
- The browser's personal best is stored locally per browser/device.
- This starter project does not include user accounts or anti-cheat protection.
  For a public internet deployment, add authentication, rate limiting,
  server-side score verification, and HTTPS.
