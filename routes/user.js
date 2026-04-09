const express = require('express');

const authController = require('../controllers/authController');
const analyticsController = require('../controllers/analyticsController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/me', requireAuth, authController.getProfile);
router.get('/dashboard/overview', requireAuth, analyticsController.getDashboard);

module.exports = router;
