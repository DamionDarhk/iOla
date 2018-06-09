const assert = require('assert');;
const request = require('supertest'); //calling supuertest that's used to create fake HTTP requests
const iolaapp = require('../iolaapp.js');

describe('The iOlaApp express application', () => {
  it('handle GET request to API in mocha framework', (done) => {
    request(iolaapp)  //our express application passing inside the supertest library
      .get('/api')  //customizing statement for API request methods
      .end((err, response) => {
        /*end() is an callback function having argument as err & response, err comes when there is wrong w/ HTTP request*/
        //console.log('Mocha test for API request methods', response);
        assert(response.body.dark === 'knight');
        done();
      });
  });
});
