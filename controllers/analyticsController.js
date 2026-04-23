const { supabase } = require('../database/db');

function getSettledValue(result, fallback, label) {
    if (result.status === 'rejected') {
        throw result.reason;
    }

    if (result.value?.error) {
        throw result.value.error;
    }

    return result.value?.data ?? fallback;
}

function getSettledCount(result) {
    if (result.status === 'rejected') {
        throw result.reason;
    }

    if (result.value?.error) {
        throw result.value.error;
    }

    return result.value?.count || 0;
}

async function getDashboard(req, res) {
    try {
        console.log('[DEBUG] user:', req.user);

        if (!req.user?.id) {
            return res.status(401).json({ success: false, error: 'Authentication required' });
        }

        const businessId = req.user.id;
        const monthStart = new Date();
        monthStart.setUTCDate(1);
        monthStart.setUTCHours(0, 0, 0, 0);

        const todayStart = new Date();
        todayStart.setUTCHours(0, 0, 0, 0);

        const results = await Promise.allSettled([
            supabase.from('calls').select('id', { count: 'exact', head: true }).eq('business_id', businessId),
            supabase.from('calls').select('id', { count: 'exact', head: true }).eq('business_id', businessId).gte('created_at', todayStart.toISOString()),
            supabase.from('leads').select('id', { count: 'exact', head: true }).eq('business_id', businessId),
            supabase.from('businesses').select('*').eq('id', businessId).maybeSingle(),
            supabase.from('usage_logs').select('minutes_used, cost_total').eq('business_id', businessId).gte('created_at', monthStart.toISOString()),
            supabase.from('calls').select('*').eq('business_id', businessId).order('created_at', { ascending: false }).limit(5),
            supabase.from('leads').select('*').eq('business_id', businessId).order('created_at', { ascending: false }).limit(5),
            supabase.from('leads').select('call_id').eq('business_id', businessId),
            supabase.from('assistants').select('id', { count: 'exact', head: true }).eq('business_id', businessId).eq('status', 'active'),
        ]);

        const totalCalls = getSettledCount(results[0]);
        const callsToday = getSettledCount(results[1]);
        const totalLeads = getSettledCount(results[2]);
        const business = getSettledValue(results[3], null, 'business');
        const usageRows = getSettledValue(results[4], [], 'usage');
        const recentCalls = getSettledValue(results[5], [], 'recentCalls');
        const recentLeads = getSettledValue(results[6], [], 'recentLeads');
        const leadRateRows = getSettledValue(results[7], [], 'leadRateRows');
        const activeAssistants = getSettledCount(results[8]);

        if (!business) {
            throw new Error('Business not found');
        }

        const costThisMonth = usageRows.reduce((sum, item) => sum + Number(item.cost_total || 0), 0);
        const callsWithLeads = new Set(leadRateRows.map((item) => item.call_id).filter(Boolean)).size;

        return res.status(200).json({
            success: true,
            data: {
                total_calls: totalCalls,
                calls_today: callsToday,
                total_leads: totalLeads,
                active_agents: activeAssistants,
                minutes_used: business.minutes_used || 0,
                minutes_limit: business.minutes_limit || 0,
                success_rate: totalCalls > 0 ? Number(((callsWithLeads / totalCalls) * 100).toFixed(2)) : 0,
                cost_this_month: Number(costThisMonth.toFixed(4)),
                recent_calls: recentCalls,
                recent_leads: recentLeads,
            },
        });
    } catch (err) {
        console.error('[ERROR]', err.message);
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
}

async function getCallAnalytics(req, res) {
    try {
        console.log('[DEBUG] user:', req.user);

        if (!req.user?.id) {
            return res.status(401).json({ success: false, error: 'Authentication required' });
        }

        const businessId = req.user.id;
        const results = await Promise.allSettled([
            supabase
                .from('calls')
                .select('id, status, duration, created_at')
                .eq('business_id', businessId)
                .order('created_at', { ascending: false })
                .limit(50),
            supabase
                .from('leads')
                .select('id, status, intent, created_at')
                .eq('business_id', businessId)
                .order('created_at', { ascending: false })
                .limit(50),
            supabase
                .from('businesses')
                .select('minutes_used, minutes_limit, plan')
                .eq('id', businessId)
                .maybeSingle(),
        ]);

        const calls = getSettledValue(results[0], []);
        const leads = getSettledValue(results[1], []);
        const biz = getSettledValue(results[2], null);

        if (!biz) {
            throw new Error('Business not found');
        }

        return res.status(200).json({
            success: true,
            data: {
                calls,
                leads,
                minutes_used: biz.minutes_used || 0,
                minutes_limit: biz.minutes_limit || 200,
                plan: biz.plan || 'starter',
            },
        });
    } catch (err) {
        console.error('[ERROR]', err.message);
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
}

module.exports = { getDashboard, getCallAnalytics };
