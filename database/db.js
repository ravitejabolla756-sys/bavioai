require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    throw new Error('[DB] Missing SUPABASE_URL or SUPABASE_SERVICE_KEY');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
});

async function testConnection() {
    try {
        const { error } = await supabase
            .from('businesses')
            .select('id', { head: true, count: 'exact' })
            .limit(1);

        if (error) {
            throw error;
        }

        console.log('[DB] connection: ok');
    } catch (error) {
        console.error('[DB] connection: failed', error.message);
        throw error;
    }
}

module.exports = supabase;
module.exports.supabase = supabase;
module.exports.testConnection = testConnection;
