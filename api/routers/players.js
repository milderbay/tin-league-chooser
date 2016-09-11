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

  db.serialize(function() {
    db.all('select id, name from players;', function(err, rows) {
      if (err)
        console.error(err);

      res.json(rows);
    });
  });

  db.close();
});

app.post('/', function(req, res) {
  if (!req.body)
    res.json({success: false});

  var db = new sqlite3.Database(config.database);
  var player = req.body;

  db.serialize(function() {
    db.run("INSERT INTO players(name) VALUES($name)", {
      $name: player.name
    }, function(err) {
      if (err)
        console.error(err);
      player.id = this.lastID;
      res.json(player);
    });
  });

  db.close();
});

app.get('/:player_id', function(req, res) {
  var db = new sqlite3.Database(config.database);
  var playerId = req.params.player_id;

  db.serialize(function() {
    db.get("SELECT id, name FROM players WHERE id = $playerId;", {
      $playerId: playerId
    }, function(err, row) {
      if (err)
        console.error(err);

      res.json(row);
    });
  });

  db.close();
});

app.put('/:player_id', function(req, res) {
  if (!req.body)
    res.json({success: false});

  var db = new sqlite3.Database(config.database);
  var playerId = req.params.player_id;
  var player = req.body;

  db.serialize(function() {
    db.run(`
      UPDATE players 
        SET name = $name
      WHERE id = $playerId;
    `, {
      $playerId: playerId,
      $name: player.name
    }, function(err) {
      if (err)
        res.json({message: "player update failed", err: err});

      res.json({message: "player updated successfully"});
    });
  });

  db.close();
});

app.delete('/:player_id', function(req, res) {
  var db = new sqlite3.Database(config.database);
  var playerId = req.params.player_id;

  db.serialize(function() {
    db.run("DELETE FROM players WHERE id = $playerId;", {
      $playerId: playerId
    }, function(err) {
      if (err)
        res.json({message: "player delete failed", err: err});

      res.json({message: "player deleted successfully"});
    });
  });

  db.close();
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                                Export
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

module.exports = app;
