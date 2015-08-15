var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var lori = require('lori');
var fs = require('fs');
var debug = require('debug')('waterline-express-example');

var app = express();
var routes = './routes/';
var api_root = routes + 'api/';

// hide debug messages
lori.setLogger(function(str, msg, lvl){
  if(lvl === 'debug'){
    return debug(msg);
  }
  console.log(str);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app based middleware
app.use(lori.express())
   .use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
   .use(bodyParser.json({ type: '*/*' }))
   .use(bodyParser.urlencoded({ extended: false }))
   .use(express.static(path.join(__dirname, 'public')));

// define root pages, un-versioned
app.use(require(routes + 'pre'));

// versioned api inclusion
fs.readdir(api_root, function(err, paths){
  if(err){
    throw err;
  }
  paths
    .filter(function(path){
      return /v\d+/.test(path);
    })
    .forEach(function(api) {
      fs.stat(api_root + api, function(err, stat){
        if(err){
          throw err;
        }
        if(stat.isDirectory()){
          try {
            app.use('/api/' + api, require(api_root + api));
          } catch(e) {
            lori.debug('Unable to load api `' + api + '`');
          }
        }
      });
    });
});

// define post hooks
app.use(require(routes + 'post'));

module.exports = app;
