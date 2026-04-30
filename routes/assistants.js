const express = require('express');

const assistantController = require('../controllers/assistantController');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/', requireAuth, assistantController.createAssistant);
router.get('/', requireAuth, assistantController.getAssistant);
router.put('/:id', requireAuth, assistantController.updateAssistant);

module.exports = router;
