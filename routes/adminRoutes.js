const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin registration route
router.post('/admin/register', adminController.registerAdmin);

// Admin login route
router.post('/admin/login', adminController.loginAdmin);

// Admin logout route
router.get('/admin/logout', adminController.logoutAdmin);

// Admin dashboard route
router.get('/admin/dashboard', adminController.dashboard);

module.exports = router;
