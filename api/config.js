var extend = require('node.extend');

var commonConfig = {};

var developmentConfig = {
  // Nothing specific yet
  corsUrls: ['http://localhost:5000']
};

var productionConfig = {
  // Nothing specific yet
  corsUrls: ['http://tlc.milderbay.com']
};

module.exports = {
  development: extend(true, developmentConfig, commonConfig),
  production: extend(true, productionConfig, commonConfig)
};
