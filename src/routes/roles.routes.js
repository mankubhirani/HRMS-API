const express = require('express')
const router = express.Router()
const rolesController = require('../controllers/roles.controller');


// Create a new roles
router.post('/create', rolesController.create);



// Retrieve a single roles with email
router.get('/getAll/:company_id', rolesController.findAll);


// Retrieve a single roles with role id
router.get('/:roleid', rolesController.findbyid);

// Delete a roles with id
router.delete('/:roleid', rolesController.delete);

// Update a roles with roleid
router.put('/:roleid', rolesController.update);

module.exports = router
