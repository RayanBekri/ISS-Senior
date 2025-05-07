const express = require('express');
const router = express.Router();
const { getAllCompanies, updateCompanyApproval } = require('../controllers/userController');

router.get('/companies', getAllCompanies);
router.post('/companies/approval', updateCompanyApproval);

module.exports = router;
