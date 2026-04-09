const express = require('express');

const authController = require('../controllers/authController');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/google', authController.startGoogleAuth);
router.get('/google/callback', authController.googleCallback);
router.get('/callback/google', authController.googleCallback);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/profile', requireAuth, authController.getProfile);
router.put('/profile', requireAuth, authController.updateProfile);

module.exports = router;
