const OlaDriverControllers = require('../controllers/oladrivers_controllers.js')

module.exports = (iolaapp) => { //imported express application from iolaapp.js (routes(iolaapp) in 22nd line)
  /*iolaapp.get('/api', (req,res) => {  //route handler is set as '/api'
    //res.send('incoming req test', req);
    res.send({dark: 'knight'});
  });*/

  iolaapp.get('/api', OlaDriverControllers.olacontrol);
  //whenever we have incoming API request methos as GET type, then above particular LOC will get executed
  //In above LOC we are referencing to OlaDriverControllers.olacontrol function reference, not calling it
  //here '/api' is the actual route(it can be anything that we want it to be)

  iolaapp.post('/api/drivers', OlaDriverControllers.olacreate);
  //above LOC will only get executed when incoming API request method will be of POST type

  iolaapp.put('/api/drivers/:OlaDriverId', OlaDriverControllers.olaedit);
  //creating PUT request for edit an drivers & in above LOC OlaDriverId is an wildcaed for records Id whose data we are going to update

  iolaapp.delete('/api/drivers/:OlaDriverId', OlaDriverControllers.oladelete);
  //creating DELETE request for deleting an records

  iolaapp.get('/api/drivers', OlaDriverControllers.olaindex);
  //routes for finding drivers in nearby location using geoJSON object in MongoDB

};
/*define an function and immediately exporting it*/
