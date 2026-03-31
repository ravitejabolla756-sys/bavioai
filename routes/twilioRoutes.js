const express = require('express');
const router = express.Router();
const callService = require('../services/callService');
const twilioProvider = require('../providers/twilioProvider');

/**
 * POST /twilio/incoming-call
 * Webhook triggered when a new call arrives.
 */
router.post('/incoming-call', (req, res) => {
    const { CallSid } = req.body;
    console.log("Incoming call:", CallSid);

    try {
        // 1. Start a new session in callService
        const sessionId = callService.startCall(CallSid);
        
        // 2. Return TwiML to gather speech
        res.set('Content-Type', 'text/xml');
        res.status(200).send(twilioProvider.generateGatherTwiML());
    } catch (err) {
        console.error('[TwilioRoute] /incoming-call error:', err.message);
        res.status(500).send('<Response><Say>An error occurred. Please try again later.</Say></Response>');
    }
});

/**
 * POST /twilio/speech
 * Webhook triggered when Twilio captures speech from the user.
 */
router.post('/speech', async (req, res) => {
    const { CallSid, SpeechResult, Confidence } = req.body;
    
    // We need the sessionId. In a real app, we'd look it up by CallSid.
    // For this implementation, callService.activeCalls is indexed by sessionId.
    // However, our test-voice-orchestrator uses sessionId directly.
    // Twilio provides CallSid. We need to find the sessionId associated with this CallSid.
    
    // Let's assume for now we use CallSid as a way to find the session or 
    // we make callService index by CallSid too. 
    // Looking at callService.js, it currently uses uuid for sessionId.
    
    // I'll update callService to allow looking up by CallSid or just use CallSid 
    // as the session identifier for Twilio calls for simplicity if preferred, 
    // but the user asked for uuid.
    
    // Actually, I'll update callService to store the mapping or just use 
    // a simple search for this demo.
    
    console.log("User said:", SpeechResult, `(Confidence: ${Confidence})`);

    try {
        // Find sessionId by CallSid (this is a bit inefficient but works for now)
        // In a production app, we'd use a Redis store or a secondary index.
        const sessionId = [...callService.activeCalls.keys()].find(
            sid => callService.activeCalls.get(sid).callSid === CallSid
        );

        if (!sessionId) {
            console.error('[TwilioRoute] No session found for CallSid:', CallSid);
            return res.status(404).send('<Response><Say>Session not found.</Say></Response>');
        }

        const result = await callService.handleUserSpeech(sessionId, SpeechResult);
        console.log("AI replied:", result.text);

        res.set('Content-Type', 'text/xml');
        res.status(200).send(twilioProvider.generateResponseTwiML(result.text));
    } catch (err) {
        console.error('[TwilioRoute] /speech error:', err.message);
        res.status(500).send('<Response><Say>I am having trouble processing that right now.</Say></Response>');
    }
});

/**
 * POST /twilio/call-ended
 * Webhook triggered when the call ends.
 */
router.post('/call-ended', (req, res) => {
    const { CallSid } = req.body;
    console.log("Call ended:", CallSid);

    try {
        const sessionId = [...callService.activeCalls.keys()].find(
            sid => callService.activeCalls.get(sid).callSid === CallSid
        );

        if (sessionId) {
            callService.endCall(sessionId);
        }
        res.status(200).send('OK');
    } catch (err) {
        console.error('[TwilioRoute] /call-ended error:', err.message);
        res.status(500).send('Error');
    }
});

module.exports = router;
