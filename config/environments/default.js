var sailsMemoryAdapter = require('sails-memory');

module.exports = {

  waterline: {
    adapters: {
      memory: sailsMemoryAdapter
    },

    connections: {
      default: {
        adapter: 'memory'
      }
    }
  }

};