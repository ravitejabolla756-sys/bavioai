const axios = require('axios');

function escapeXml(value) {
    return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

function buildExoML(action, params = {}) {
    const actions = Array.isArray(action) ? action : [{ action, params }];
    let body = '';

    for (const item of actions) {
        if (item.action === 'say') {
            body += `<Say>${escapeXml(item.params.text)}</Say>`;
        }

        if (item.action === 'play') {
            body += `<Play>${escapeXml(item.params.url)}</Play>`;
        }

        if (item.action === 'record') {
            const actionUrl = escapeXml(item.params.action);
            const maxLength = escapeXml(item.params.maxLength || 10);
            const playBeep = String(item.params.playBeep ?? false);
            body += `<Record action="${actionUrl}" maxLength="${maxLength}" playBeep="${playBeep}"/>`;
        }

        if (item.action === 'hangup') {
            body += '<Hangup/>';
        }
    }

    return `<?xml version="1.0" encoding="UTF-8"?><Response>${body}</Response>`;
}

async function makeOutboundCall(to, from, callerId) {
    try {
        const url = `https://${process.env.EXOTEL_SUBDOMAIN}/${process.env.EXOTEL_SID}/Calls/connect.json`;
        const response = await axios.post(
            url,
            new URLSearchParams({
                From: from,
                To: to,
                CallerId: callerId,
            }).toString(),
            {
                auth: {
                    username: process.env.EXOTEL_API_KEY,
                    password: process.env.EXOTEL_API_TOKEN,
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                timeout: 30000,
            }
        );

        return response.data;
    } catch (error) {
        console.error('[EXOTEL] makeOutboundCall:', error.message);
        throw error;
    }
}

module.exports = {
    buildExoML,
    makeOutboundCall,
};
