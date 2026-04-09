const twilio = require('twilio');
const VoiceResponse = twilio.twiml.VoiceResponse;

/**
 * Provider for generating TwiML responses for Twilio Voice AI.
 */
class TwilioVoiceProvider {
    /**
     * Generate TwiML to gather speech input from the user.
     * @returns {string} TwiML XML string
     */
    generateGatherTwiML() {
        const response = new VoiceResponse();
        
        response.gather({
            input: 'speech',
            action: '/twilio/speech',
            method: 'POST',
            enhanced: true,
            speechTimeout: 'auto',
            language: 'en-IN'
        }).say('Hello! Thank you for calling. How can I help you today?');

        // If no speech is detected, loop back to gather
        response.redirect('/twilio/incoming-call');

        return response.toString();
    }

    /**
     * Generate TwiML to speak the AI response and gather the next input.
     * @param {string} aiText — the text response from the AI
     * @returns {string} TwiML XML string
     */
    generateResponseTwiML(aiText) {
        const response = new VoiceResponse();

        if (aiText) {
            const gather = response.gather({
                input: 'speech',
                action: '/twilio/speech',
                method: 'POST',
                enhanced: true,
                speechTimeout: 'auto',
                language: 'en-IN'
            });
            gather.say(aiText);
        }

        // If no speech is detected after the AI speaks, loop back to gather
        response.redirect('/twilio/incoming-call');

        return response.toString();
    }

    /**
     * Generate TwiML to hang up the call.
     * @returns {string} TwiML XML string
     */
    generateHangupTwiML() {
        const response = new VoiceResponse();
        response.say('Thank you for calling. Goodbye!');
        response.hangup();
        return response.toString();
    }
}

module.exports = new TwilioVoiceProvider();
