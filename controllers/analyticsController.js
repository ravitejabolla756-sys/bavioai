const { supabase } = require('../database/db');

async function getDashboard(req, res) {
    try {
        const businessId = req.user.id;
        const monthStart = new Date();
        monthStart.setUTCDate(1);
        monthStart.setUTCHours(0, 0, 0, 0);

        const todayStart = new Date();
        todayStart.setUTCHours(0, 0, 0, 0);

        const [
            totalCallsResult,
            callsTodayResult,
            totalLeadsResult,
            businessResult,
            usageResult,
            recentCallsResult,
            recentLeadsResult,
            leadsForRateResult,
            activeAssistantsResult,
        ] = await Promise.all([
            supabase.from('calls').select('id', { count: 'exact', head: true }).eq('business_id', businessId),
            supabase.from('calls').select('id', { count: 'exact', head: true }).eq('business_id', businessId).gte('created_at', todayStart.toISOString()),
            supabase.from('leads').select('id', { count: 'exact', head: true }).eq('business_id', businessId),
            supabase.from('businesses').select('*').eq('id', businessId).single(),
            supabase.from('usage_logs').select('minutes_used, cost_total').eq('business_id', businessId).gte('created_at', monthStart.toISOString()),
            supabase.from('calls').select('*').eq('business_id', businessId).order('created_at', { ascending: false }).limit(5),
            supabase.from('leads').select('*').eq('business_id', businessId).order('created_at', { ascending: false }).limit(5),
            supabase.from('leads').select('call_id').eq('business_id', businessId),
            supabase.from('assistants').select('id', { count: 'exact', head: true }).eq('business_id', businessId).eq('status', 'active'),
        ]);

        const costThisMonth = (usageResult.data || []).reduce((sum, item) => sum + Number(item.cost_total || 0), 0);
        const callsWithLeads = new Set((leadsForRateResult.data || []).map((item) => item.call_id).filter(Boolean)).size;
        const totalCalls = totalCallsResult.count || 0;

        return res.status(200).json({
            success: true,
            data: {
                total_calls: totalCalls,
                calls_today: callsTodayResult.count || 0,
                total_leads: totalLeadsResult.count || 0,
                active_agents: activeAssistantsResult.count || 0,
                minutes_used: businessResult.data?.minutes_used || 0,
                minutes_limit: businessResult.data?.minutes_limit || 0,
                success_rate: totalCalls > 0 ? Number(((callsWithLeads / totalCalls) * 100).toFixed(2)) : 0,
                cost_this_month: Number(costThisMonth.toFixed(4)),
                recent_calls: recentCallsResult.data || [],
                recent_leads: recentLeadsResult.data || [],
            },
        });
    } catch (error) {
        console.error('[ANALYTICS] dashboard:', error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
}

module.exports = { getDashboard };
