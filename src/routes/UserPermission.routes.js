const express = require('express')
const router = express.Router()
const UserPermissionController = require('../controllers/UserPermission.controller');

// Retrieve all UserPermission
// router.get('/getAll/:company_id', UserPermissionController.findAll);

router.post('/create',UserPermissionController.create)

router.put('/update/:module_id/:form_id/:role_id/:company_id',UserPermissionController.update)

router.get('/findById/:module_id/:form_id/:role_id/:company_id',UserPermissionController.findById)

router.get('/permissionById/:role_id/:company_id',UserPermissionController.permissionById)

module.exports = router;