const { supabase } = require('../database/db');

async function createAssistant(req, res) {
    try {
        const {
            name = 'Bavio Assistant',
            language = 'hi-IN',
            system_prompt = '',
            first_message = 'Namaste! Main aapki kaise madad kar sakta hoon?',
            industry = 'general',
        } = req.body || {};

        const { data, error } = await supabase
            .from('assistants')
            .insert([{
                business_id: req.user.id,
                name,
                language,
                system_prompt,
                first_message,
                industry,
                status: 'active',
            }])
            .select('*')
            .single();

        if (error) {
            console.error('[ASSISTANT] create:', error.message);
            return res.status(500).json({ success: false, error: error.message });
        }

        return res.status(201).json({ success: true, data });
    } catch (error) {
        console.error('[ASSISTANT] create:', error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
}

async function getAssistant(req, res) {
    try {
        const { data, error } = await supabase
            .from('assistants')
            .select('*')
            .eq('business_id', req.user.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();

        if (error) {
            console.error('[ASSISTANT] get:', error.message);
            return res.status(500).json({ success: false, error: error.message });
        }

        return res.status(200).json({ success: true, data });
    } catch (error) {
        console.error('[ASSISTANT] get:', error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
}

async function updateAssistant(req, res) {
    try {
        const updates = { updated_at: new Date().toISOString() };

        ['system_prompt', 'first_message', 'language', 'industry', 'name', 'status'].forEach((field) => {
            if (req.body?.[field] !== undefined) {
                updates[field] = req.body[field];
            }
        });

        const { data, error } = await supabase
            .from('assistants')
            .update(updates)
            .eq('id', req.params.id)
            .eq('business_id', req.user.id)
            .select('*')
            .single();

        if (error) {
            console.error('[ASSISTANT] update:', error.message);
            return res.status(500).json({ success: false, error: error.message });
        }

        return res.status(200).json({ success: true, data });
    } catch (error) {
        console.error('[ASSISTANT] update:', error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
}

module.exports = {
    createAssistant,
    getAssistant,
    updateAssistant,
};
