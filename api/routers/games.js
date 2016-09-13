var express = require('express');
var compress = require('compression');
var app = new express.Router();
app.use(compress());

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                               Config Setup
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var env = process.env.NODE_ENV || 'development';
var config = require('../config.js')[env];

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                              DB Setup
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var sqlite3 = require('sqlite3').verbose();

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                                Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

app.get('/', function(req, res) {
  var db = new sqlite3.Database(config.database);
  var results = [];

  db.serialize(function() {
    db.all(`
      SELECT
        g.id, 
        g.name,
        g.steam_link
      FROM games AS g
    `, function(err, rows) {
      if (err)
        console.error("get games failed", err);

      rows.forEach(function(row) {
        results.push({
          id: row.id,
          name: row.name,
          steam_link: row.steam_link,
          num_players: []
        });
      });

      var stmt = db.prepare(`
          SELECT
            num_player
          FROM num_players
          WHERE game_id = $game_id
      `);
      results.forEach(function(game) {
        stmt.all({
          $game_id: game.id
        }, function(err, rows) {
          if (err)
            console.error("get num_players failed", err);

          rows.forEach(function(row) {
            game.num_players.push(row.num_player);
          });
        });
      });
      stmt.finalize();

      db.close(function(err) {
        if (err)
          console.error("error");
        res.json(results);
      });
    });
  });
});

app.post('/', function(req, res) {
  if (!req.body)
    res.json({success: false});

  var db = new sqlite3.Database(config.database);
  var game = req.body;

  db.serialize(function() {
    db.run("INSERT INTO games(name, steam_link) VALUES($name, $steam_link);", {
      $name: game.name,
      $steam_link: game.steam_link
    }, function(err) {
      if (err)
        res.json({message: "game insert failed", err: err});
      game.id = this.lastID;

      var stmt = db.prepare(`
        INSERT INTO num_players(game_id, num_player)
        VALUES($game_id, $num_player)
      `);
      game.num_players.forEach(function(num_player) {
        stmt.run({
          $game_id: game.id,
          $num_player: num_player
        });
      });
      stmt.finalize();

      db.close(function(err) {
        if (err)
          console.error(err);
        res.json(game);
      });
    });
  });
});

app.get('/:game_id', function(req, res) {
  var db = new sqlite3.Database(config.database);
  var game_id = req.params.game_id;

  db.serialize(function() {
    db.get(`
      SELECT
        g.id, 
        g.name,
        g.steam_link
      FROM games AS g
      WHERE g.id = $game_id
    `, {
      $game_id: game_id
    }, function(err, game) {
      if (err)
        console.error(err);

      if (game) {
        game.num_players = [];

        var stmt = db.prepare(`
            SELECT
              num_player
            FROM num_players
            WHERE game_id = $game_id
        `);
        stmt.all({
          $game_id: game_id
        }, function(err, rows) {
          if (err)
            console.error("get num_players failed", err);

          rows.forEach(function(row) {
            game.num_players.push(row.num_player);
          });
        });
        stmt.finalize();
      } else {
        res.json({message: "game not found"});
      }

      db.close(function(err) {
        if (err)
          console.error(err);
        res.json(game);
      });
    });
  });
});

/* No need for game update right now...
app.put('/:game_id', function(req, res) {
  if (!req.body)
    res.json({success: false});

  var db = new sqlite3.Database(config.database);
  var game_id = req.params.game_id;
  var game = req.body;

  db.serialize(function() {
    db.run(`
      UPDATE games
        SET name = $name
        ...
      WHERE id = $game_id;
    `, {
      $game_id: game_id,
      $name: game.name
    }, function(err) {
      if (err)
        res.json({message: "game update failed", err: err});

      res.json({message: "game updated successfully"});
      db.close();
    });
  });
});
*/

app.delete('/:game_id', function(req, res) {
  var db = new sqlite3.Database(config.database);
  var gameId = req.params.game_id;

  db.serialize(function() {
    db.run("DELETE FROM num_players where game_id = $gameId", {
      $gameId: gameId
    }, function(err) {
      if (err)
        res.json({message: "num_players delete failed", err: err});
      db.run("DELETE FROM games WHERE id = $gameId;", {
        $gameId: gameId
      }, function(err) {
        if (err)
          res.json({message: "game delete failed", err: err});

        res.json({message: "game and num_players deleted successfully"});
        db.close();
      });
    });
  });
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                                Export
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

module.exports = app;
