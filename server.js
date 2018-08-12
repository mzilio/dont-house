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
const { Client } = require('pg');

const pg_client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

// Handle the connection event
pg_client.connect()
  .then(() => console.log('DB connected'))
  .catch(e => console.error('DB connection error', err.stack));

pg_client.query('SELECT * FROM temp_ext;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  pg_client.end();
});

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

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

// REGISTER OUR ROUTES
// =============================================================================
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

//pg_client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//  if (err) throw err;
//  for (let row of res.rows) {
//    console.log(JSON.stringify(row));
//  }
//  pg_client.end();
//});
