const express = require('express');

const billingController = require('../controllers/billingController');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/subscribe', requireAuth, billingController.createSubscription);
router.post('/webhook', billingController.handleDodoWebhook);
router.get('/usage', requireAuth, billingController.getUsage);

module.exports = router;
