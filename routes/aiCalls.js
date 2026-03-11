const express = require('express');
const router = express.Router();
const aiCallController = require('../controllers/aiCallController');

// POST /incoming-call
router.post('/incoming-call', aiCallController.handleIncoming.bind(aiCallController));

// POST /call-ended
router.post('/call-ended', aiCallController.handleCallEnded.bind(aiCallController));

// GET /calls
router.get('/calls', aiCallController.getCalls.bind(aiCallController));

module.exports = router;
