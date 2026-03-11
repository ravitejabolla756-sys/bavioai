const assistantService = require('../services/assistantService');

async function createAssistant(req, res) {
    try {
        const { client_id, name, system_prompt } = req.body;
        if (!client_id || !name) return res.status(400).json({ error: 'client_id and name are required' });
        const assistant = await assistantService.createAssistant({ client_id, name, system_prompt });
        res.status(201).json(assistant);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getAssistants(req, res) {
    try {
        const assistants = await assistantService.getAssistantsForClient(req.params.client_id);
        res.status(200).json(assistants);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getAssistant(req, res) {
    try {
        const assistant = await assistantService.getAssistantById(req.params.id);
        res.status(200).json(assistant);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

async function updateAssistant(req, res) {
    try {
        const { name, system_prompt } = req.body;
        const assistant = await assistantService.updateAssistant({
            assistant_id: req.params.id,
            name,
            system_prompt
        });
        res.status(200).json(assistant);
    } catch (err) {
        if (err.message === 'Assistant not found') return res.status(404).json({ error: err.message });
        if (err.message === 'No fields to update') return res.status(400).json({ error: err.message });
        res.status(500).json({ error: err.message });
    }
}

async function deleteAssistant(req, res) {
    try {
        const result = await assistantService.deleteAssistant(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        if (err.message === 'Assistant not found') return res.status(404).json({ error: err.message });
        res.status(500).json({ error: err.message });
    }
}

module.exports = { createAssistant, getAssistants, getAssistant, updateAssistant, deleteAssistant };
