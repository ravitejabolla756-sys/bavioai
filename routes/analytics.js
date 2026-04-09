const express = require('express');

const analyticsController = require('../controllers/analyticsController');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/dashboard', requireAuth, analyticsController.getDashboard);

module.exports = router;
