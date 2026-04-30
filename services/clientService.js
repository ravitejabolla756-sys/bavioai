const supabase = require('../database/db');
const { v4: uuidv4 } = require('uuid');

async function createClient({ email, subscription_plan, country }) {
    const apiKey = uuidv4().replace(/-/g, '');
    const { data, error } = await supabase
        .from('clients')
        .insert([{
            email,
            api_key: apiKey,
            subscription_plan: subscription_plan || 'free',
            country,
            status: 'active'
        }])
        .select()
        .single();
    if (error) throw error;
    return data;
}

async function getClientById(id) {
    const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('id', id)
        .single();
    if (error) {
        if (error.code === 'PGRST116') throw new Error(`Client ${id} not found`);
        throw error;
    }
    return data;
}

module.exports = { createClient, getClientById };
