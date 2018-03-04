var express = require('express');
var api = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 5000;
var router = express.Router();

api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

api.use('/api', router);

api.listen(port);
console.log('Listening on port ' + port);
