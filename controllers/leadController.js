const { supabase } = require('../database/db');

async function getLeads(req, res) {
    try {
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
            console.error('[LEADS] list:', error.message);
            return res.status(500).json({ success: false, error: error.message });
        }

        return res.status(200).json({ success: true, data });
    } catch (error) {
        console.error('[LEADS] list:', error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
}

async function updateLeadStatus(req, res) {
    try {
        const { data, error } = await supabase
            .from('leads')
            .update({ status: req.body?.status })
            .eq('id', req.params.id)
            .eq('business_id', req.user.id)
            .select('*')
            .single();

        if (error) {
            console.error('[LEADS] updateStatus:', error.message);
            return res.status(500).json({ success: false, error: error.message });
        }

        return res.status(200).json({ success: true, data });
    } catch (error) {
        console.error('[LEADS] updateStatus:', error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
}

module.exports = {
    getLeads,
    updateLeadStatus,
};
