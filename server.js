// call the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');
var db = require('./queries');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 5000; // set our port

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:5000/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

// TO DESCRIBE (accessed at GET http://localhost:5000/api/external_temp_last)
router.get('/external_temp_last', db.getExtTempLast);

// TO DESCRIBE (accessed at GET http://localhost:5000/api/external_temp_all)
router.get('/external_temp_all', db.getExtTempAll);

// TO DESCRIBE (accessed at POST http://localhost:5000/api/external_temp)
router.post('/external_temp', db.setExtTemp);

// router.get('/api/puppies', db.getAllPuppies);
// router.get('/api/puppies/:id', db.getSinglePuppy);
// router.post('/api/puppies', db.createPuppy);
// router.put('/api/puppies/:id', db.updatePuppy);
// router.delete('/api/puppies/:id', db.removePuppy);

// register our routes
app.use('/api', router);

// start the server
app.listen(port);
console.log('Server started on port ' + port);
