const express = require('express');
const router = express.Router();
const assistantController = require('../controllers/assistantController');
const { authenticateApiKey } = require('../middleware/auth');

// Create a new assistant (with optional custom system_prompt)
router.post('/', authenticateApiKey, assistantController.createAssistant);

// Get all assistants for a client
router.get('/client/:client_id', authenticateApiKey, assistantController.getAssistants);

// Get a single assistant by ID
router.get('/:id', authenticateApiKey, assistantController.getAssistant);

// Update an assistant (name and/or system_prompt)
router.put('/:id', authenticateApiKey, assistantController.updateAssistant);

// Delete an assistant
router.delete('/:id', authenticateApiKey, assistantController.deleteAssistant);

module.exports = router;
