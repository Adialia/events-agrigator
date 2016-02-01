var express = require('express');
var router = express.Router();
var events =  require('../modules/eventsGenerator');
var find = require('../modules/find');
var findGenerator = require('../modules/findGenerator');
var findWord = findGenerator.generate();
/* GET users listing. */
router.get('/', function(req, res) {
	res.json(events.generateEvents());
});
router.get('/find', function(req, res) {
	res.json(find.findEvent(events.generateEvents(), findWord));
});
module.exports = router;
