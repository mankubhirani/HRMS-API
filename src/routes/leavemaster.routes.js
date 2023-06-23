const express = require('express')
const router = express.Router()
const leaveController = require('../controllers/leavemaster.controller');

// Retrieve all leaves
router.get('/getAll/:company_id', leaveController.findAll);

// Create a new leaves
router.post('/create', leaveController.create);


// Delete a leave with id
router.patch('/:leave_type_id', leaveController.delete);


// find a leave with id
router.get('/:leave_type_id', leaveController.findById);

// update a leave with id
router.put('/:leave_type_id', leaveController.update);
module.exports = router;
