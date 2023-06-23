const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserLocation.controller');


// Create a new Notes
router.post('/create', userController.create);

// Retrieve a single Notes with email
router.get('/getAll/:Emp_Id/:company_id', userController.findAll);


module.exports = router
