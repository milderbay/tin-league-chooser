-- sqlite3 tin_league_chooser.db < setup_db.sql

CREATE TABLE IF NOT EXISTS players (
  id INTEGER PRIMARY KEY NOT NULL,
  name TEXT NOT NULL
);