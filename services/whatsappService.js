const twilio = require('twilio');

async function sendLeadAlert(businessPhone, leadData, callData) {
    try {
        const client = twilio(
            process.env.TWILIO_ACCOUNT_SID,
            process.env.TWILIO_AUTH_TOKEN
        );

        const msg = [
            '\u{1F514} *New Lead - Bavio AI*',
            '',
            `\u{1F464} Name: ${leadData?.name || 'Not captured'}`,
            `\u{1F4DE} Phone: ${leadData?.phone || callData?.caller_number || 'Unknown'}`,
            `\u{1F3AF} Intent: ${leadData?.intent || 'General enquiry'}`,
            `\u{1F4B0} Budget: ${leadData?.budget || 'Not mentioned'}`,
            `\u{1F4CD} Location: ${leadData?.location || 'Not mentioned'}`,
            `\u{23F1} Duration: ${callData?.duration || 0}s`,
            `\u{1F550} Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`,
            '',
            'View leads: https://www.bavio.in/dashboard/leads',
        ].join('\n');

        const normalizedPhone = String(businessPhone || '').replace(/^\+91/, '');
        await client.messages.create({
            from: process.env.TWILIO_WHATSAPP_FROM,
            to: `whatsapp:+91${normalizedPhone}`,
            body: msg,
        });

        console.log(`[WHATSAPP] Alert sent to ${businessPhone}`);
    } catch (error) {
        console.error('[WHATSAPP] sendLeadAlert failed:', error.message);
    }
}

module.exports = { sendLeadAlert };
