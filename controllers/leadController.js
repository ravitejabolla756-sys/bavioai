const { supabase } = require('../database/db');

async function getLeads(req, res) {
    try {
        console.log('[DEBUG] user:', req.user);

        if (!req.user?.id) {
            return res.status(401).json({ success: false, error: 'Authentication required' });
        }

        let query = supabase
            .from('leads')
            .select('*')
            .eq('business_id', req.user.id)
            .order('created_at', { ascending: false });

        if (req.query.status) {
            query = query.eq('status', req.query.status);
        }

        const { data, error } = await query;

        if (error) {
            throw error;
        }

        return res.status(200).json({
            success: true,
            data: data || [],
        });
    } catch (err) {
        console.error('[ERROR]', err.message);
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
}

async function updateLeadStatus(req, res) {
    try {
        console.log('[DEBUG] user:', req.user);

        if (!req.user?.id) {
            return res.status(401).json({ success: false, error: 'Authentication required' });
        }

        const { data, error } = await supabase
            .from('leads')
            .update({ status: req.body?.status })
            .eq('id', req.params.id)
            .eq('business_id', req.user.id)
            .select('*')
            .maybeSingle();

        if (error) {
            throw error;
        }

        if (!data) {
            throw new Error('Lead not found');
        }

        return res.status(200).json({
            success: true,
            data,
        });
    } catch (err) {
        console.error('[ERROR]', err.message);
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
}

module.exports = {
    getLeads,
    updateLeadStatus,
};
