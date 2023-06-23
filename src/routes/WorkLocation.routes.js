const express = require('express')
const router = express.Router()
const WorkLocationController = require('../controllers/WorkLocation.controller');

// Retrieve all location
router.get('/getAll/:company_id', WorkLocationController.findAll);

// Retrieve single location
router.get('/:location_id', WorkLocationController.findById);

// Create a new location
router.post('/create', WorkLocationController.create);


// Delete a location with id
router.delete('/:location_id', WorkLocationController.delete);

// update a location with id
router.put('/update/:location_id', WorkLocationController.update);

module.exports = router;
