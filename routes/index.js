var express = require('express');
var router = express.Router();
var quotesController = require('../controllers/quote.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Express');
});

/* GET bestOptionsPerYear. */
router.get('/api/bestOptionsPerYear', function (req, res, next) {
  res.json(quotesController.bestOptionsPerYear(req, res));
});

/* GET quoteCar. */
router.get('/api/quoteCar', function (req, res, next) {
  res.json(quotesController.quoteCar(req, res));
});


module.exports = router;
