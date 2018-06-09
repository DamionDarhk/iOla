const OlaDriver = require('../models/oladriver.js');

module.exports = {
  olacontrol(req, res) {
    res.send({dark : 'knight'});
  },
  //defining the olacontrol function logic

  olaindex(req, res, next)  {
    /*For reference of MongoDB Geography :
    https://docs.mongodb.com/manual/reference/operator/aggregation/geoNear/#pipe._S_geoNear*/

    const {lng, lat} = req.query;

    /*GET request can't contain request body (so, it can't have lat, lon through re.body)
    We look at GET query string(req.query),
    For Ex:
    www.google.com?lng=80&lat=20*/

    OlaDriver.geoNear (
      {type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)]},
      {spherical: true, maxDistance: 200000}  //maxDistance is measured in meters
    )
    .then((odriver) => res.send(odriver))
    .catch(next);
  },

  olacreate(req, res, next) {
    console.log('Output for BodyParser Output', req.body);
    //res.send({dark : 'knight rises'});

    const oladriverProps = req.body;

    OlaDriver.create(oladriverProps)  //we are inerting data(in form of req.body) into the database
      .then(odriver => {
        res.send(odriver);
        console.log('Test for POST controllers :', odriver);
      })  //odriver is the called with the records that was just saved into database
      //in above .then statement : after inserting the records, we are sending the same data(as res.body()) to the body that send req
      .catch(next);
      /*in above .catch statement : Since during an error Exception, mongoose is stuck in routes Middleware,
      so we are using next function so that it will goto next Middleware i.e Error Handling Middleware(for refence goto iolaapp.js comment)*/
  },

  olaedit(req, res, next) {
    const DriverId = req.params.OlaDriverId;
    /*here params means the properties/values of req body, and we are value OlaDriverId defined in routes.js, and both the variable name
    of records Id has to be same in oladrivers_controllers.js & routes.js*/

    console.log('Test for PUT controller :', req.body);

    const oladriverProps = req.body;

    OlaDriver.findByIdAndUpdate({_id: DriverId}, oladriverProps)
      //.then(() => OlaDriver.findById({_id: OlaDriverId}))
      .then(() => OlaDriver.findById({_id: DriverId}))
      /*we won't get promise callback as value of data that got updated, instead we will get statictics on what records were updated
      thus we are calling updated records using records Id that's defined (OlaDriverId)*/
      .then((odriver) => {
        console.log('Test 2 for PUT controller :', odriver);
        res.send(odriver);
      })
      .catch(next);
  },

  oladelete(req,res,next) {
    const DriverId = req.params.OlaDriverId;
    //const oladriverProps = req.body;

    OlaDriver.findByIdAndRemove({_id: DriverId})
      .then((odriver) => res.status(204).send(odriver))
      /*We are getting promise callback as records that's being removed*/
      .catch(next);
  }


};
