/*iolaapp.js is the top level of express application*/

const express = require('express');
const routes = require('./routes/routes.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const iolaapp = express();

mongoose.Promise = global.Promise;

if(process.env.NODE_ENV !== 'test'){
  mongoose.connect('mongodb://localhost/iOla_Database');
  //defining the logic if environment is not test environment then connect to iOla_Database
}

//mongoose.connect('mongodb://localhost/iOla_Database');

/*in above LOC, express() is envoked as function
iolaapp is an object that will take incoming HTTP requests, and depending on that it's going to run some
code logic within express application*/


/*below LOC is executing incomong request(in form of route i.e http://localhost:3050/api) as it has GET request methods,
in case if there was other API request methods like POST then it wouldn't accept can HTTP request*/

/*iolaapp.get('/api', (req,res) => {  //route handler is set as '/api'
  //res.send('incoming req test', req);
  res.send({dark: 'knight'});
});*/

/*we are breaking above LOC into sub-parts of express application operation:
1. Router : taking incoming requests & sending them to right location (routes.js)
2. Controller : actual request handling logic is defined inside an controller (oladrivers_controllers.js, there can be multiple controllers
    depending on each type of request handle logic)
3. Model*/


//1. BodyParser Middleware
iolaapp.use(bodyParser.json()); //bodyParser Middleware code is being executed

//2. Route handler(it's also type of Middleware)
routes(iolaapp);  //passing express application into routes function as an argument

//3. Error Exception Middleware
iolaapp.use((err, req, res, next) => {
  /*In above LOC, err, req & res are objects, but next is like an function, when called it forces to go next Middleware*/
  //console.log('Error Code for blank POST :', err);
  res.status(422).send({ error : err._message});
});

/*We want for different Middleware to be executed in below manner :
  1. BodyParser Middleware
  2. Route handler(it's also type of Middleware)
  3. Error Exception Middleware
  Since we want them to be executed in specific sequence, so we have written their in the same sequence order as well*/

/*req : incoming request(in form of HTTP request) coming from frontend application to express server
res : outgoing response express is sending to frontend application*/

module.exports = iolaapp;

/*For details info of definition refer to MongoDBNotes.txt*/
