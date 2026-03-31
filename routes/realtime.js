const express = require('express');

const realtimeController = require('../controllers/realtimeController');
const { authenticateJWT } = require('../middleware/auth');

const router = express.Router();

router.post('/sessions', authenticateJWT, realtimeController.createSession);
router.get('/sessions/:id', authenticateJWT, realtimeController.getSession);

module.exports = router;
