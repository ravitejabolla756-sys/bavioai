const express = require('express');
const router = express.Router();
const voiceOrchestrator = require('../services/orchestrator/voiceOrchestrator');

/**
 * POST /voice/respond
 * Accept transcribed speech and return AI-generated text + audio response.
 *
 * Body: { session_id, transcript, system_prompt?, target_language_code?, speaker? }
 */
router.post('/respond', async (req, res) => {
    try {
        const { session_id, transcript, system_prompt, target_language_code, speaker } = req.body;

        if (!session_id || !transcript) {
            return res.status(400).json({
                success: false,
                message: 'session_id and transcript are required'
            });
        }

        const result = await voiceOrchestrator.handleVoiceInput(session_id, transcript, {
            systemPrompt: system_prompt,
            target_language_code,
            speaker
        });

        res.status(200).json({
            success: true,
            data: {
                session_id,
                textResponse: result.textResponse,
                audioBase64: result.audioBase64
            }
        });
    } catch (err) {
        console.error('[VoiceRoute] /respond error:', err.message);
        res.status(500).json({
            success: false,
            message: 'Voice processing failed',
            error: err.message
        });
    }
});

/**
 * POST /voice/end
 * End a voice session and clear its conversation history.
 *
 * Body: { session_id }
 */
router.post('/end', async (req, res) => {
    try {
        const { session_id } = req.body;

        if (!session_id) {
            return res.status(400).json({
                success: false,
                message: 'session_id is required'
            });
        }

        const result = voiceOrchestrator.endSession(session_id);

        res.status(200).json({
            success: true,
            message: result.cleared ? 'Session ended' : 'Session not found',
            data: { session_id, cleared: result.cleared }
        });
    } catch (err) {
        console.error('[VoiceRoute] /end error:', err.message);
        res.status(500).json({
            success: false,
            message: 'Failed to end session',
            error: err.message
        });
    }
});

module.exports = router;
