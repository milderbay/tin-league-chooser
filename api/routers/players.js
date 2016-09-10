var express = require('express');
var compress = require('compression');
var app = new express.Router();
app.use(compress());

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                               Config Setup
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

var env = process.env.NODE_ENV || 'development';
var config = require('../config.js')[env];

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                              DB Setup
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(config.database);

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                                Routes
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

app.get('/', function(req, res) {

  db.serialize(function() {
    db.all('select name from players;');
  });

  db.close();

  res.send("<p>display all players...</p>");

});

/*
app.get('/road-temp\.:ext?', fuzionUtilities.defaultParamMiddleware, function (req, res) {

  var results = [];

  pg.connect(connectionString, function(err, client, done) {

    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }

    var query = client.query(`
      SELECT
        'Feature' as type,
        ST_AsGeoJSON(geom)::json as geometry,
        row_to_json((
          SELECT d FROM (
            SELECT
              colour,
              ARRAY[minimum_value, maximum_value] as thresholdValues,
              variable_name as variableName
          ) d
        )) as properties
      FROM road_temperature_contours
      WHERE variable_name = 'Road surface temperature'
      ORDER BY minimum_value
    `);

    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function() {
      done();

      var geoJSON = fuzionUtilities.createGeoJSON(results);

      if (req.params.ext == "geojson") {
        return res.json(geoJSON);
      } else {
        var topology = topojson.topology({collection: geoJSON},{"property-transform":function(object){return object.properties;}});
        return res.json(topology);
      }

    });
  });

});
*/

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                                Export
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

module.exports = app;
