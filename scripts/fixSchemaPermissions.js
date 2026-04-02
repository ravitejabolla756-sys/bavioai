/**
 * scripts/fixSchemaPermissions.js
 * 
 * Fixes the "permission denied for schema public" error on Supabase.
 * 
 * Modern Supabase projects revoke USAGE on the public schema from the 
 * postgres role by default. We need to grant it back so the service
 * role can execute queries.
 * 
 * Run once: node scripts/fixSchemaPermissions.js
 */

require('dotenv').config();

const https = require('https');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

// Extract project ref from URL (e.g., https://abcdef.supabase.co → abcdef)
const projectRef = SUPABASE_URL.replace('https://', '').split('.')[0];

const sqlStatements = [
    // Grant USAGE on schema
    'GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;',
    // Grant SELECT/INSERT/UPDATE/DELETE on all existing tables
    'GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role;',
    // Grant privileges on all sequences (for serial/uuid columns)
    'GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role;',
    // Ensure future tables also get these grants
    'ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO postgres, anon, authenticated, service_role;',
    'ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres, anon, authenticated, service_role;',
];

console.log('Project ref:', projectRef);
console.log('Applying schema permission fixes...\n');

async function runSQL(sql) {
    return new Promise((resolve, reject) => {
        const body = JSON.stringify({ query: sql });
        const url = new URL(`${SUPABASE_URL}/rest/v1/rpc/query`);
        
        // Use the Management API endpoint
        const options = {
            hostname: `${projectRef}.supabase.co`,
            path: `/rest/v1/`,
            method: 'GET',
            headers: {
                'apikey': SUPABASE_SERVICE_KEY,
                'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
                'Content-Type': 'application/json',
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ status: res.statusCode, data }));
        });
        req.on('error', reject);
        req.end();
    });
}

// The actual fix — use pg directly or print instructions
console.log('='.repeat(60));
console.log('IMPORTANT: Run these SQL statements in Supabase SQL Editor:');
console.log('Dashboard → SQL Editor → New query → Paste & Run');
console.log('URL: https://supabase.com/dashboard/project/' + projectRef + '/sql/new');
console.log('='.repeat(60));
console.log('');
sqlStatements.forEach((sql, i) => {
    console.log(`-- Statement ${i + 1}:`);
    console.log(sql);
    console.log('');
});

console.log('='.repeat(60));
console.log('After running the above SQL, restart the server:');
console.log('  node server.js');
console.log('='.repeat(60));
