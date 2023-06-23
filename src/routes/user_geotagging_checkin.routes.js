const express = require('express')
const router = express.Router()
const UserGeotaggingCheckinController = require('../controllers/user_geotagging_checkin.controller');


// Create a checkin
router.post('/checkin', UserGeotaggingCheckinController.create);

// Update a checkout
router.put('/checkout', UserGeotaggingCheckinController.update);
module.exports = router;