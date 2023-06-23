const express = require('express')
const router = express.Router()
const TimesheetController = require('../controllers/Timesheet.controller');

// Retrieve all timesheet
router.get('/getAll/:company_id', TimesheetController.findAll);

// Create a new timesheet
router.post('/insert', TimesheetController.apply);

// Retrieve a single timesheet with id
router.get('/:TimeSheetId', TimesheetController.findById);

// Update a timesheet with id
router.put('/:TimeSheetId', TimesheetController.update);

// Delete a timesheet with id
router.delete('/:TimeSheetId', TimesheetController.delete);


router.get('/totalworkinghrs/:employeeId', TimesheetController.month);


router.get('/emp/:employeeId/:company_id/:month/:year', TimesheetController.findByEmpId);

// Retrieve a  project with search result
router.post('/search', TimesheetController.findBySearch);


// Update a timesheet for approval
router.put('/ApprovalRequest/:employeeId/:TimeSheetId', TimesheetController.updateForApproval);


module.exports = router;
