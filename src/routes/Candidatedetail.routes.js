const express = require('express')
const router = express.Router()
const CandidatedetailController = require('../controllers/Candidatedetail.controller');

// Retrieve all employees
router.get('/getAll', CandidatedetailController.findAll);

// Retrieve a single employee with id
router.get('/address/:email/:company_id', CandidatedetailController.findById);   //add 
router.get('/education/:email/:company_id', CandidatedetailController.findById_Education); //edu
router.get('/experience/:email/:company_id', CandidatedetailController.findById_Experience); //exp
router.get('/Paddress/:email/:company_id',CandidatedetailController.findById2);//1.padd.


module.exports = router
