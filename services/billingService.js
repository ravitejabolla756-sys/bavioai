const crypto = require('crypto');
const axios = require('axios');

const DODO_BASE_URL = 'https://api.dodopayments.com/v1';

async function createSubscription(businessId, plan, email) {
    try {
        const customerResponse = await axios.post(
            `${DODO_BASE_URL}/customers`,
            {
                external_id: businessId,
                email,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.DODO_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                timeout: 30000,
            }
        );

        const customerId = customerResponse.data?.id;

        const subscriptionResponse = await axios.post(
            `${DODO_BASE_URL}/subscriptions`,
            {
                customer_id: customerId,
                plan,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.DODO_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                timeout: 30000,
            }
        );

        return {
            customer_id: customerId,
            subscription_id: subscriptionResponse.data?.id,
            checkout_url: subscriptionResponse.data?.checkout_url,
        };
    } catch (error) {
        console.error('[BILLING] createSubscription:', error.message);
        throw error;
    }
}

function verifyWebhookSignature(payload, signature) {
    try {
        const expected = crypto
            .createHmac('sha256', process.env.DODO_WEBHOOK_SECRET)
            .update(payload)
            .digest('hex');

        const expectedBuffer = Buffer.from(expected);
        const providedBuffer = Buffer.from(signature || '');

        return expectedBuffer.length === providedBuffer.length
            && crypto.timingSafeEqual(expectedBuffer, providedBuffer);
    } catch (error) {
        console.error('[BILLING] verifyWebhookSignature:', error.message);
        return false;
    }
}

function calculateCallCost(durationSeconds, ttsChars) {
    const cost_stt = (durationSeconds / 3600) * 30;
    const cost_tts = (ttsChars / 10000) * 15;
    const cost_telephony = (durationSeconds / 60) * 0.60;
    const cost_total = cost_stt + cost_tts + cost_telephony;

    return {
        cost_stt: Number(cost_stt.toFixed(4)),
        cost_tts: Number(cost_tts.toFixed(4)),
        cost_telephony: Number(cost_telephony.toFixed(4)),
        cost_total: Number(cost_total.toFixed(4)),
    };
}

module.exports = {
    createSubscription,
    verifyWebhookSignature,
    calculateCallCost,
};
