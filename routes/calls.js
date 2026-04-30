const express = require('express');

const callController = require('../controllers/callController');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/incoming', callController.handleIncomingExotel);
router.post('/recording', callController.handleRecording);
router.post('/end', callController.handleCallEnd);
router.get('/', requireAuth, callController.getCalls);
router.get('/:id', requireAuth, callController.getCallById);

module.exports = router;
