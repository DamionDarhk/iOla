const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const iolaapp = require('../../iolaapp.js');

const OlaDriver = mongoose.model('oladriver');
/*we are calling oladriver not by it's path because if done so Mocha will executes oladriver.js multiple times,
so we will get an error that states oladriver is already declared*/
/*mongoose, Mocha & Express doesn't work well together*/

describe('OlaDriver Controller', () => {
  it('POST to /api/drivers : create new ola drivers', (done) => {
    OlaDriver.count().then((oladrivercount) => {
      request(iolaapp)
        .post('/api/drivers') //these nested option in request() are configurations options
        .send({email : 'megan.fox@wayneenterprise.com'})
        /*in above LOC, it's create data (which will be formatted as API request method : POST) to be used by
        controllers(oladrivers_controllers.js) to be used by drivers*/
        .end(() => {
          OlaDriver.count().then((newoladrivercount) => {
            assert(oladrivercount + 1 === newoladrivercount);
            done();
          });
        });
    });
  });
  /*We are creating above it statement to create test POST API request after which it be in below order :
  API POST request ->
  routes.js(OlaDriverControllers.olacreate) ->
  oladrivers_controllers.js(in this *.js file it will invoke olacreate() function)*/

  it('PUT to /api/drivers/id : edit existing Ola Driver', (done) => {
    const olatest = new OlaDriver({email: 'elon.musk@tesla.com', driving: false});

    olatest.save().then(() => {
      request(iolaapp)
        .put(`/api/drivers/${olatest._id}`) //ES6 code inside put block
        //.put('/api/drivers/' + olatest._id)
        .send({email: 'elon.musk@tesla.com', driving: true})
        //.send({driving: true})
        .end(() => {
          OlaDriver.findOne({email: 'elon.musk@tesla.com'})
            .then((olaupdated) => {
              OlaDriver.update({email: 'elon.musk@tesla.com'}, {driving: true});
              assert(olaupdated.driving === true);
              console.log('Test 2 for PUT :', olaupdated);
              done();
            });
        });
    });
  });

  it('DELETE to /api/drivers/id : delete existing Ola Driver', (done) => {
    const olatest = new OlaDriver({email: 'sophie.grace@innocenthigh.com'});

    olatest.save().then(() => {
      request(iolaapp)
        .delete(`/api/drivers/${olatest._id}`)
        .end(() => {
          OlaDriver.findOne({email: 'sophie.grace@innocenthigh.com'})
            .then((odriver) => {
              //console.log('Test for DELETE :', odriver);
              assert(odriver === null);
              done();
            });
        });
    });
  });

  /*it('GET to /api/drivers?lng=x&lat=y : find Ola Driver near by', (done) => {
    const OlaHyderabadDriver = new OlaDriver({
      email: 'hyderabad@ola.com',
      OlaDriverLocation: {type: 'Point', coordinates: [20.1, 50.2]}
    });

    const OlaShimlaDriver = new OlaDriver({
      email: 'shimla@ola.com',
      OlaDriverLocation: {type: 'Point', coordinates: [13.123, 20.765]}
    });

    Promise.all([OlaHyderabadDriver.save(), OlaShimlaDriver.save()])
      .then(() => {
        request(iolaapp)
          .get('/api/drivers?lng=20&lat=50')
          .end((err, response) => {
            console.log('Test for geoNear :', response);
            done();
          });
      });
  });*/

  it('Get to /api/drivers finds drivers in a location', done => {
  const seattleDriver = new OlaDriver({
    email: 'seattle@test.com',
    geometry: { type: 'Point', coordinates: [-122.4759902, 47.6147628] }
  });
  const miamiDriver = new OlaDriver({
    email: 'miami@test.com',
    geometry: { type: 'Point', coordinates: [-80.2534507, 25.791581] }
  });

  Promise.all([seattleDriver.save(), miamiDriver.save()])
    .then(() => {
      request(iolaapp)
        .get('/api/drivers?lng=-80&lat=25')
        .end((err, response) => {
          //assert(response.body.length === 1);
          //assert(response.body[0].obj.email === 'miami@test.com');
          console.log('Test for geoNear :', response);
          done();
        });
    });
})
});
