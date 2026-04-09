const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

async function sendLeadAlert(businessPhone, leadData, callData) {
    try {
        const message = [
            '🔔 New Lead — Bavio AI',
            `Name: ${leadData?.name || 'Unknown'}`,
            `Phone: ${leadData?.phone || callData?.caller_number || 'Unknown'}`,
            `Intent: ${leadData?.intent || 'Not provided'}`,
            `Budget: ${leadData?.budget || 'Not provided'}`,
            `Location: ${leadData?.location || 'Not provided'}`,
            `Call Duration: ${callData?.duration || 0}s`,
        ].join('\n');

        const normalizedTo = businessPhone.startsWith('whatsapp:')
            ? businessPhone
            : `whatsapp:${businessPhone}`;

        return await client.messages.create({
            from: process.env.TWILIO_WHATSAPP_FROM,
            to: normalizedTo,
            body: message,
        });
    } catch (error) {
        console.error('[WHATSAPP] sendLeadAlert:', error.message);
        throw error;
    }
}

module.exports = { sendLeadAlert };
