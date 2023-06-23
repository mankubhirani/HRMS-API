const express = require('express')
const router = express.Router()
const employeeController = require('../controllers/employee.controller');

// Retrieve all employees
router.get('/getAll/:company_id', employeeController.findAll);




// Create a new employee
router.post('/create', employeeController.create);

// Retrieve a single employee with table id
router.get('/:id', employeeController.findByTableId);

// Retrieve a single employee with email
//router.get('/:email', employeeController.findById);


// Retrieve a single employee with table id
router.get('/getEmp/:company_id/:emp_id', employeeController.findByEmpId);


// Retrieve a single employee with email
router.get('/:email/:company_id', employeeController.findByIdCid);

//new employee
router.put('/:id', employeeController.updateEmployee);


// Update a employee with id
router.put('/update/:companyId/:email', employeeController.update);

// Delete a employee with id
router.patch('/delete/:company_id/:employee_id', employeeController.delete);


// Update a employee with email
router.put('/empId/:email', employeeController.updateAfterPreonBoarding);

// Retrieve a single employee with employee id
router.post('/employee_detail', employeeController.findEmployeeByEmployeeId);


router.post('/employee_idAndName', employeeController.SearchEmployeeByEmployeeIdAndName);


router.post('/SearchAllemployee_idAndName', employeeController.SearchAllEmployeeByEmployeeIdAndName);


router.get('/reporting_manager', employeeController.findByreport_manager);

module.exports = router
