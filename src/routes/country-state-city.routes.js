
const express = require('express')
const router = express.Router()
const CountryStateCityController = require('../controllers/country-state-city.controller');

// Retrieve countries
router.get('/getcountry', CountryStateCityController.findAllCountry);
// Retrieve state by country id
router.get('/getstate/:country_id', CountryStateCityController.findstate);
// Retrieve city by state id
router.get('/getcity/:state_id', CountryStateCityController.findcity);
module.exports = router
