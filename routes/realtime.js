const express = require('express');

const realtimeController = require('../controllers/realtimeController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/sessions', requireAuth, realtimeController.createSession);
router.get('/sessions/:id', requireAuth, realtimeController.getSession);

module.exports = router;
