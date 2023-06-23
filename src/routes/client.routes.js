const express = require('express')
const router = express.Router()
const clientController = require('../controllers/client.controller')

// Retrieve all leaves
router.get('/getAll', clientController.findAll);

// Create a new leaves
router.post('/add', clientController.add);

// Retrieve a single leave with client_id
router.get('/:client_id', clientController.findById);

// Update a applyleaves with client_id
router.put('/:client_id', clientController.update);

// Delete a leave with client_id
router.delete('/:client_id', clientController.delete);

module.exports = router;
