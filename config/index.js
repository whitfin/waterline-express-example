module.exports = (function(env){
  // load default configuration
  var defaultConf = require('../config/environments/default');

  // no env set
  if(!env){
    return defaultConf;
  }

  try {
    // load environment configuration
    require('lodash.merge')(defaultConf, require('../config/environments/' + env));
  } catch(e) { }

  // return new config
  return defaultConf;
})(process.env['NODE_ENV'] || 'development');