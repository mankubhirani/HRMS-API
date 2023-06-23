const express = require('express')
const router = express.Router()
const Dropdowns = require('../controllers/Dropdowns.controller');

// Retrieve all leaves
router.get('/industry/getAll', Dropdowns.findAllIndustry);
router.get('/number_of_employees/getAll', Dropdowns.findNumofEmployees);
router.get('/job_type/getAll', Dropdowns.findAllJobtype);
router.get('/merital_status/getAll', Dropdowns.findAllMeritalstatus);
router.get('/employee_status/getAll', Dropdowns.findAllEmpStatus);
router.get('/source_of_hire/getAll', Dropdowns.findAllSourceofHire);
module.exports = router;