const express = require('express')
const router = express.Router()
const projectController = require('../controllers/project.controller');

// Retrieve all projects
router.get('/getAll', projectController.findAll);

// Create a new projects
router.post('/create', projectController.create);

// Delete a project with id
router.delete('/:id', projectController.delete);

// Update a project with project_name
router.put('/name', projectController.update);

// Retrieve a  project with search result
router.post('/search', projectController.findBySearch);

// Retrieve a  project with Multi search result
router.post('/multisearch', projectController.findByMultiSearch);

// Retrieve a single project with id
// router.get('/:id', projectController.findById);
router.get('/:id', projectController.findProjectsById);

router.get('/repository/:project_id', projectController.findRepositoryById);

router.get('/team_member/:project_id', projectController.findTeamMemberById);




module.exports = router;
