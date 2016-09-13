-- sqlite3 tin_league_chooser.db < setup_db.sql

CREATE TABLE IF NOT EXISTS players (
  id INTEGER PRIMARY KEY NOT NULL,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS games (
  id INTEGER PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  steam_link TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS num_players (
  game_id INTEGER NOT NULL,
  num_player INTEGER NOT NULL
);