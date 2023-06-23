const router = require('express').Router();
const {body} = require('express-validator');
const {register} = require('../../src/controllers/onboarding_registerController');
const {login} = require('../../src/controllers/onboarding_loginController');
const getAllOnboardingUsers = require('../../src/controllers/onboarding.getAll');
router.post('/register',register);

router.get('/getAllJoiners',getAllOnboardingUsers.getall);

router.get('/getbyid/:id',getAllOnboardingUsers.getbyid);

// router.get('/getbyid/:id',getAllOnboardingUsers.getbyid);


router.get('/getbycmpnyid/:company_id',getAllOnboardingUsers.getbycmpnyid);

router.get('/getbyemail/:company_email_id',getAllOnboardingUsers.getemail);



router.post('/getAllsearch',getAllOnboardingUsers.getallsearch);

router.delete('/del/:id',getAllOnboardingUsers.delete);

router.put('/edit/:id',getAllOnboardingUsers.update);

router.put('/updateCid/:company_email_id',getAllOnboardingUsers.updateDetails);

router.put('/:email/:company_email_id',getAllOnboardingUsers.updatebyemail);

// router.put('/:company_email_id/:company_id ',getAllOnboardingUsers.updatebycmpnyid);



router.post('/login',[
  body('email',"Invalid email address")
  .notEmpty()
  .escape()
  .trim().isEmail(),
  body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
],login);



module.exports = router;
