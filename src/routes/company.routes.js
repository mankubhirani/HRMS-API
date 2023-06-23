const express = require('express')
const router = express.Router()
const companyController = require('../controllers/company.controller');

const multer = require('multer');

const app = express();
const DIR = "./src/company_logo_uploads";

// Set up storage configuration for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR); // Specify the directory where files will be stored
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename
    }
  });
  
   

  // Create multer middleware
  const upload = multer({ storage: storage });

  // Create a new companys
router.post('/create', companyController.create);
// Retrieve all companys
router.get('/getAll', companyController.findAll);



router.get('/dm/:company_domain', companyController.findByDomain);


// Retrieve a single company with id
router.get('/:company_id', companyController.findById);

// Retrieve a single company with id
router.get('/companydomain/:company_domain', companyController.companyDomain);


// Retrieve a  company with search result
router.post('/search', companyController.findBySearch);

// Update a company with id
router.put('/:company_id',upload.single('company_logo_path'), companyController.update);

// Delete a company with id
router.delete('/:company_id', companyController.delete);



module.exports = router
