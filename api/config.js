var extend = require('node.extend');

var commonConfig = {
  database: 'tin_league_database.db'
};

var developmentConfig = {
  corsUrls: ['http://localhost:5000']
};

var productionConfig = {
  corsUrls: ['http://tlc.milderbay.com']
};

module.exports = {
  development: extend(true, developmentConfig, commonConfig),
  production: extend(true, productionConfig, commonConfig)
};
