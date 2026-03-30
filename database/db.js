/**
 * database/db.js
 * Bavio.ai — Supabase client (server-side / service role)
 *
 * Uses SUPABASE_URL and SUPABASE_SERVICE_KEY from environment variables.
 * The service role key bypasses RLS — keep it server-side only.
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL) {
    throw new Error('Missing environment variable: SUPABASE_URL');
}
if (!SUPABASE_SERVICE_KEY) {
    throw new Error('Missing environment variable: SUPABASE_SERVICE_KEY');
}

/**
 * Supabase admin client (service role).
 * Bypasses Row Level Security — use only in trusted server contexts.
 * @type {import('@supabase/supabase-js').SupabaseClient}
 */
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
    },
});

export default supabase;
