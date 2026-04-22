const crypto = require('crypto');

const { supabase } = require('../database/db');
const { createSubscription } = require('../services/billingService');

async function createSubscriptionController(req, res) {
    try {
        console.log('[DEBUG] user:', req.user);

        if (!req.user?.id) {
            return res.status(401).json({ success: false, error: 'Authentication required' });
        }

        const plan = req.body?.plan || 'starter';

        const { data: business, error: businessError } = await supabase
            .from('businesses')
            .select('*')
            .eq('id', req.user.id)
            .maybeSingle();

        if (businessError) {
            throw businessError;
        }

        if (!business) {
            throw new Error('Business not found');
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
            throw updateError;
        }

        return res.status(200).json({
            success: true,
            data: { checkout_url: subscription.checkout_url },
        });
    } catch (err) {
        console.error('[ERROR]', err.message);
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
}

const getUsage = async (req, res) => {
    try {
        const requestSupabase = req.supabase || supabase;
        const userId = req.user?.id;

        if (!requestSupabase || !userId) {
            return res.json({
                usage: {
                    minutes_used: 0,
                    minutes_limit: 200,
                    remaining: 200,
                },
                plan: 'starter',
            });
        }

        const { data: biz, error } = await requestSupabase
            .from('businesses')
            .select('minutes_used, minutes_limit, plan')
            .eq('id', userId)
            .maybeSingle();

        if (error) {
            console.error('[billing] supabase error:', error.message);
            return res.json({
                usage: {
                    minutes_used: 0,
                    minutes_limit: 200,
                    remaining: 200,
                },
                plan: 'starter',
            });
        }

        if (!biz) {
            return res.json({
                usage: {
                    minutes_used: 0,
                    minutes_limit: 200,
                    remaining: 200,
                },
                plan: 'starter',
            });
        }

        const minutes_used = Number(biz.minutes_used ?? 0);
        const minutes_limit = Number(biz.minutes_limit ?? 200);
        const safeMinutesUsed = Number.isFinite(minutes_used) ? minutes_used : 0;
        const safeMinutesLimit = Number.isFinite(minutes_limit) ? minutes_limit : 200;
        const plan = biz.plan ?? 'starter';

        return res.json({
            usage: {
                minutes_used: safeMinutesUsed,
                minutes_limit: safeMinutesLimit,
                remaining: Math.max(safeMinutesLimit - safeMinutesUsed, 0),
            },
            plan,
        });
    } catch (err) {
        console.error('[billing] crash:', err.message);
        return res.json({
            usage: {
                minutes_used: 0,
                minutes_limit: 200,
                remaining: 200,
            },
            plan: 'starter',
        });
    }
};

async function handleDodoWebhook(req, res) {
    try {
        console.log('[DEBUG] user:', req.user);

        const sig = req.headers['webhook-signature'];
        const expected = crypto
            .createHmac('sha256', process.env.DODO_WEBHOOK_SECRET)
            .update(JSON.stringify(req.body))
            .digest('hex');

        if (sig !== expected) {
            return res.sendStatus(401);
        }

        const { type, data } = req.body;
        console.log(`[DODO] Webhook: ${type}`);

        const planMap = {
            [process.env.DODO_PRODUCT_STARTER]: 'starter',
            [process.env.DODO_PRODUCT_GROWTH]: 'growth',
            [process.env.DODO_PRODUCT_SCALE]: 'scale',
        };

        let query = null;

        if (type === 'subscription.created') {
            query = supabase
                .from('businesses')
                .update({
                    plan: planMap[data.product_id] || 'starter',
                    dodo_subscription_id: data.subscription_id,
                    status: 'active',
                })
                .eq('dodo_customer_id', data.customer_id);
        } else if (type === 'subscription.renewed') {
            query = supabase
                .from('businesses')
                .update({ minutes_used: 0 })
                .eq('dodo_subscription_id', data.subscription_id);
        } else if (type === 'subscription.cancelled') {
            query = supabase
                .from('businesses')
                .update({ status: 'inactive' })
                .eq('dodo_subscription_id', data.subscription_id);
        } else if (type === 'payment.failed') {
            query = supabase
                .from('businesses')
                .update({ status: 'suspended' })
                .eq('dodo_subscription_id', data.subscription_id);
        }

        if (query) {
            const { error } = await query;
            if (error) {
                throw error;
            }
        }

        return res.sendStatus(200);
    } catch (err) {
        console.error('[ERROR]', err.message);
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
}

module.exports = {
    createSubscription: createSubscriptionController,
    handleDodoWebhook,
    getUsage,
};
