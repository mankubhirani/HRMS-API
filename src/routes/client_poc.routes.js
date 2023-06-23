const express = require('express')
const router = express.Router()
const client_poc_Controller = require('../controllers/client_poc.controller')

// Retrieve all leaves
router.get('/getAll', client_poc_Controller.findAll);

// Create a new leaves
router.post('/add', client_poc_Controller.create);

// Retrieve a single leave with client_poc_id
router.get('/:client_poc_id', client_poc_Controller.findById);

// Update a applyleaves with client_poc_id
router.put('/:client_poc_id', client_poc_Controller.update);

// Delete a leave with client_poc_id
router.delete('/:client_poc_id', client_poc_Controller.delete);

module.exports = router;
