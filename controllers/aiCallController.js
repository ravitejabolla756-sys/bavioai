const aiCallService = require('../services/aiCallService');

class AICallController {

    /**
     * POST /incoming-call
     * Handles inbound call start. Captures caller_number, creates a call record.
     */
    async handleIncoming(req, res) {
        try {
            // For Twilio, the caller number is in req.body.From
            // For simple JSON requests, we might expect req.body.caller_number
            const callerNumber = req.body.From || req.body.caller_number;

            if (!callerNumber) {
                return res.status(400).json({ error: 'Missing caller number (From or caller_number required)' });
            }

            // Create call in database via service
            const callRecord = await aiCallService.createCall(callerNumber);

            // If the request looks like a Twilio webhook, return TwiML
            if (req.body.CallSid) {
                res.set('Content-Type', 'text/xml');
                return res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?><Response><Say>Connecting you to the AI Assistant.</Say></Response>`);
            }

            // Otherwise, return standard JSON response
            return res.status(201).json({
                message: 'Call started',
                call: callRecord
            });

        } catch (error) {
            console.error('[AICallController] handleIncoming error:', error);
            return res.status(500).json({ error: 'Internal server error while starting call' });
        }
    }

    /**
     * POST /call-ended
     * Captures call duration and ended_at time
     */
    async handleCallEnded(req, res) {
        try {
            // Twilio passes CallDuration. Standard JSON might pass duration and call_id
            const duration = req.body.CallDuration || req.body.duration || 0;
            const callId = req.body.call_id; // We expect the client/AI logic to keep track of this UUID

            if (!callId) {
                return res.status(400).json({ error: 'Missing call_id parameter to update records' });
            }

            const updatedCall = await aiCallService.endCall(callId, duration);

            return res.status(200).json({
                message: 'Call ended successfully',
                call: updatedCall
            });

        } catch (error) {
            console.error('[AICallController] handleCallEnded error:', error);

            if (error.code === 'PGRST116') {
                return res.status(404).json({ error: 'Call record not found' });
            }

            return res.status(500).json({ error: 'Internal server error while ending call' });
        }
    }

    /**
     * GET /calls
     * Returns recent calls
     */
    async getCalls(req, res) {
        try {
            const limit = req.query.limit ? parseInt(req.query.limit) : 50;
            const calls = await aiCallService.getLatestCalls(limit);

            return res.status(200).json(calls);
        } catch (error) {
            console.error('[AICallController] getCalls error:', error);
            return res.status(500).json({ error: 'Internal server error while fetching calls' });
        }
    }
}

module.exports = new AICallController();
