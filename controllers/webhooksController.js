const telephonyService = require('../services/telephony/telephonyService');

async function twilio(req, res) {
    try {
        const response = await telephonyService.buildTwilioWebhookResponse(req);
        res.set('Content-Type', response.contentType);
        return res.status(200).send(response.body);
    } catch (error) {
        console.error('[webhooksController.twilio]', error);
        return res.status(500).send('Webhook error');
    }
}

async function exotel(req, res) {
    try {
        const response = await telephonyService.buildExotelWebhookResponse(req);
        return res.status(200).json(response.body);
    } catch (error) {
        console.error('[webhooksController.exotel]', error);
        return res.status(500).json({ error: 'Webhook error' });
    }
}

module.exports = { twilio, exotel };
