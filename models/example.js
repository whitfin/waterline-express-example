module.exports = function(Waterline){

  return Waterline.Collection.extend({
    identity: 'example',
    connection: 'default',
    attributes: {
      firstName: 'string',
      lastName: 'string'
    }
  });

};