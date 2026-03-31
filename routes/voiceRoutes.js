const express = require('express');
const router = express.Router();
const callService = require('../services/callService');

/**
 * POST /voice/respond
 * Accept transcribed speech and return AI-generated text + audio response.
 *
 * Body: { sessionId?, transcript, callSid? }
 */
router.post('/respond', async (req, res) => {
    let { sessionId, transcript, callSid } = req.body;

    try {
        if (!transcript) {
            return res.status(400).json({
                success: false,
                message: 'transcript is required'
            });
        }

        // 1. If sessionId is missing, start a new call session
        if (!sessionId) {
            sessionId = callService.startCall(callSid || `manual_${Date.now()}`);
        }

        // 2. Handle the user speech turn
        const result = await callService.handleUserSpeech(sessionId, transcript);

        // 3. Return JSON as requested
        res.status(200).json({
            sessionId,
            text: result.text,
            audio: result.audio
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
 * Body: { sessionId }
 */
router.post('/end', async (req, res) => {
    const { sessionId } = req.body;
    console.log("Voice end request received:", sessionId);

    try {
        if (!sessionId) {
            return res.status(400).json({
                success: false,
                message: 'sessionId is required'
            });
        }

        const cleared = callService.endCall(sessionId);

        res.status(200).json({
            status: cleared ? 'session ended' : 'session not found'
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
