Waterline Express Example
=========================

This repo contains a basic setup for using Waterline and Express. The directory structure is setup in such a way that models are loaded automatically, and with as little effort as possible. 

### Structure

* config
  - Contains any configuration to load for your application. Uses `config/index.js` to load the default configuration and can merge environment specific configurations.
* models
  - Contains any Waterline models. All files should export a function which accepts a single argument for the `Waterline` ORM, and this function should return a Waterline collection.
* public
  - Typical Express public resources
* routes (used in this order)
  * `pre` - Hooks to be added before your main api, typically for rendering views.
  * `api` - A versioned API. Each directory will generate a route, and be required in to create your API.
  * `post` - Any hooks which come in via `app.use` after your api has been defined. Typically used for error handling.
* util
  - Simple utility folder, containing `orm.js` which is your main Waterline file, and exports a property `models` containing your models.
* views
  - Typical Express view resources
  
### Usage

```
$ npm install
$ npm start 
```