const express = require('express')
const router = express.Router()
const admin = require('../controllers/Admin.conroller');

// Retrieve all admin
router.get('/getAll', admin.findAll);

module.exports = router;