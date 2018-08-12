// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port       = process.env.PORT || 5000; // set our port

// DATABASE SETUP
const { db } = require('./database');
// const { Client } = require('pg');
//
// const pg_client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: true,
// });
//
// // Handle the connection event
// pg_client.connect()
//   .then(() => console.log('DB connected'))
//   .catch(e => console.error('DB connection error', err.stack));

// ROUTES FOR OUR API
// =============================================================================

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

// TO DESCRIBE (accessed at GET http://localhost:5000/api/external_temp)
router.get('/external_temp', function(req, res) {
  res.json({ message: 'Shown the external temperature!' });
  // pg_client.query('SELECT * FROM temp_ext ORDER BY datetime DESC LIMIT 1;', (err, res_query) => {
  //   if (err) throw err;
  //   for (let row of res_query.rows) {
  //     res.send(JSON.stringify(row));
  //   }
  //   pg_client.end();
  // });
});

router.get('/postgres', (req, res, next) => {
  db
    .any('SELECT * FROM temp_ext ORDER BY datetime DESC LIMIT 1')
    .then(data => {
      res.json(`${req.path} fetched ${JSON.stringify(data)} from the database`)
    })
    .catch(next)
});

// REGISTER OUR ROUTES
// =============================================================================
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
