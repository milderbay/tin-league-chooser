DELETE FROM games;
DELETE FROM num_players;

INSERT INTO games(name, steam_link)
SELECT "Rocket League", "http://store.steampowered.com/app/252950/"
UNION ALL
SELECT "Awesomenauts", "http://store.steampowered.com/app/204300/"
UNION ALL
SELECT "Speed Runners", "http://store.steampowered.com/app/207140/"
UNION ALL
SELECT "Heroes of the Storm", "http://us.battle.net/heroes/en/"
UNION ALL
SELECT "Golf with your Friends", "http://store.steampowered.com/app/431240/";

INSERT INTO num_players(game_id, num_player)
SELECT 1, 2
UNION ALL
SELECT 1, 3
UNION ALL
SELECT 1, 4
UNION ALL
SELECT 1, 6
UNION ALL
SELECT 1, 8
UNION ALL
SELECT 2, 3
UNION ALL
SELECT 2, 4
UNION ALL
SELECT 2, 6
UNION ALL
SELECT 3, 2
UNION ALL
SELECT 3, 3
UNION ALL
SELECT 3, 4
UNION ALL
SELECT 4, 2
UNION ALL
SELECT 4, 3
UNION ALL
SELECT 4, 4
UNION ALL
SELECT 4, 5
UNION ALL
SELECT 5, 2
UNION ALL
SELECT 5, 3
UNION ALL
SELECT 5, 4
UNION ALL
SELECT 5, 5
UNION ALL
SELECT 5, 6
UNION ALL
SELECT 5, 7
UNION ALL
SELECT 5, 8;