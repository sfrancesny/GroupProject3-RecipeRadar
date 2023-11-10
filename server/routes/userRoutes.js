const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// register a new user
router.post('/register', userController.register);

// user login
router.post('/login', userController.login);

// gets a user profile
router.get('/profile', userController.protect, userController.getProfile);

// updates a user profile
router.put('/profile', userController.protect, userController.updateProfile);

// deletes a user account
router.delete('/profile', userController.protect, userController.deleteProfile);

module.exports = router;
