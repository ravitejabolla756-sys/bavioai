const { supabase } = require('../database/db');
const { createSubscription, verifyWebhookSignature } = require('../services/billingService');

async function createSubscriptionController(req, res) {
    try {
        const plan = req.body?.plan || 'starter';

        const { data: business, error: businessError } = await supabase
            .from('businesses')
            .select('*')
            .eq('id', req.user.id)
            .single();

        if (businessError) {
            console.error('[BILLING] createSubscription: business fetch failed', businessError.message);
            return res.status(500).json({ success: false, error: businessError.message });
        }

        const subscription = await createSubscription(business.id, plan, business.email);

        const { error: updateError } = await supabase
            .from('businesses')
            .update({
                dodo_customer_id: subscription.customer_id,
                dodo_subscription_id: subscription.subscription_id,
                plan,
                updated_at: new Date().toISOString(),
            })
            .eq('id', req.user.id);

        if (updateError) {
            console.error('[BILLING] createSubscription: business update failed', updateError.message);
            return res.status(500).json({ success: false, error: updateError.message });
        }

        return res.status(200).json({
            success: true,
            data: { checkout_url: subscription.checkout_url },
        });
    } catch (error) {
        console.error('[BILLING] createSubscription:', error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
}

async function handleDodoWebhook(req, res) {
    try {
        const rawPayload = req.rawBody ? req.rawBody.toString('utf8') : JSON.stringify(req.body);
        const signature = req.headers['x-dodo-signature'];

        if (!verifyWebhookSignature(rawPayload, signature)) {
            return res.status(401).json({ success: false, error: 'Invalid webhook signature' });
        }

        const payload = JSON.parse(rawPayload);
        const eventType = payload.type;
        const subscriptionId = payload.data?.subscription_id;
        const businessId = payload.data?.metadata?.business_id;

        if (eventType === 'subscription.created') {
            await supabase.from('businesses').update({
                plan: payload.data?.plan || 'starter',
                status: 'active',
                dodo_subscription_id: subscriptionId,
                updated_at: new Date().toISOString(),
            }).eq('id', businessId);
        }

        if (eventType === 'subscription.renewed') {
            await supabase.from('businesses').update({
                minutes_used: 0,
                status: 'active',
                updated_at: new Date().toISOString(),
            }).eq('id', businessId);
        }

        if (eventType === 'subscription.cancelled') {
            await supabase.from('businesses').update({
                status: 'inactive',
                updated_at: new Date().toISOString(),
            }).eq('id', businessId);
        }

        if (eventType === 'payment.failed') {
            await supabase.from('businesses').update({
                status: 'suspended',
                updated_at: new Date().toISOString(),
            }).eq('id', businessId);
        }

        return res.status(200).json({ success: true, data: { received: true } });
    } catch (error) {
        console.error('[BILLING] handleWebhook:', error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
}

async function getUsage(req, res) {
    try {
        const { data, error } = await supabase
            .from('businesses')
            .select('*')
            .eq('id', req.user.id)
            .single();

        if (error) {
            console.error('[BILLING] getUsage:', error.message);
            return res.status(500).json({ success: false, error: error.message });
        }

        const now = new Date();
        const periodStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString();
        const periodEnd = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0, 23, 59, 59)).toISOString();

        return res.status(200).json({
            success: true,
            data: {
                ...data,
                billing_period_start: periodStart,
                billing_period_end: periodEnd,
            },
        });
    } catch (error) {
        console.error('[BILLING] getUsage:', error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
}

module.exports = {
    createSubscription: createSubscriptionController,
    handleDodoWebhook,
    getUsage,
};
