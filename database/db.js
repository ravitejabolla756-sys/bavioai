const { createClient } = require('@supabase/supabase-js');

let supabase;

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    console.warn('⚠️  Supabase not configured — running in local mode');
    
    // Export a mock client to prevent server from crashing
    // This allows routes that use 'supabase' to fail gracefully instead of throwing
    supabase = {
        from: () => ({
            select: () => ({ limit: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }), single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }) }),
            insert: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }) }) }),
            update: () => ({ eq: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }) }) }) }),
            delete: () => ({ eq: () => Promise.resolve({ error: { message: 'Supabase not configured' } }) }),
            order: () => ({ limit: () => Promise.resolve({ data: [], error: { message: 'Supabase not configured' } }) }),
        }),
        auth: {
            getUser: () => Promise.resolve({ data: { user: null }, error: { message: 'Supabase not configured' } }),
            signIn: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
        }
    };
} else {
    supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_KEY
    );
}

module.exports = supabase;
