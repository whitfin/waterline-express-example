var fs = require('fs');
var path = require('path');
var Waterline = require('waterline');

function ORM(){

  Object.defineProperties(this, {
    orm: {
      value: new Waterline()
    }
  });

}

ORM.prototype.setup = function setup(){
  var _this = this;

  // return a promise
  return new Promise(function promise(resolve, reject) {
    // define models directory
    var dir = path.join(__dirname, '../models');

    // read in models
    fs.readdir(dir, function(err, files) {
      if(err){
        return reject(err);
      }

      // read models
      files.forEach(function loadCollections(file){
        if(file[0] !== '.'){
          _this.orm.loadCollection(require(path.join(dir, file))(Waterline));
        }
      });

      // pull in config
      var config = require(path.resolve(dir, '..', 'config'));

      // start orm
      _this.orm.initialize(config.waterline, function initialized(err, models) {
        if(err){
          return reject(err);
        }

        // store creations
        _this.models = models.collections;
        _this.connections = models.connections;

        // return model names
        resolve(Object.keys(_this.models));
      });

    });

  });

};

module.exports = new ORM();