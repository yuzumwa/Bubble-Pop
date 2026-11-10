CREATE DATABASE IF NOT EXISTS bubble_pop_mania
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE bubble_pop_mania;

CREATE TABLE IF NOT EXISTS scores (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  player_name VARCHAR(40) NOT NULL,
  score INT UNSIGNED NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_score (score DESC),
  INDEX idx_created_at (created_at)
);
