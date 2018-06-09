const mongoose = require('mongoose');

before(done => {
  mongoose.connect('mongodb://localhost/iOla_Database_Test');
  mongoose.connection
    .once('open', () => done())
    .on('error', err => {
      console.warn('Error Message:', err);
      //done();
    });
});

beforeEach(done => {
  const { oladrivers } = mongoose.connection.collections ;
  oladrivers.drop()  //dropping collection before executing the test
    .then(() => oladrivers.ensureIndex({'OlaDriverLocation.coordinates': '2dsphere'}))
    /*above LOC states that it will not delete OlaDriverLocation index from collection*/
    .then(() => done())
    .catch(() => done());
    /*catch is used when an operation(or particular logic/LOC) is failed
    It may be possible that before starting the test, oladriver collection may not be created, if run for first time*/
});
