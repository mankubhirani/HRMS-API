const express = require('express')
const router = express.Router()
const moduleController = require('../controllers/module.controller');

// Retrieve module
router.get('/getmodulebyId/:id', moduleController.getmodule);


// Retrieve all module
router.get('/getallmodules', moduleController.getAllmodule);
// Retrieve  formsbyid
router.get('/getformsbyId/:id', moduleController.getformsbyId);



// Retrieve all formsbymodulid
router.get('/getformsbyModuleId/:module_id', moduleController.getformsbyModuleId);


module.exports = router;
