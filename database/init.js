/**
 * database/init.js
 * Bavio.ai — Database initializer
 *
 * Reads schema.sql and executes it against Supabase using the service role.
 * Log output shows success / failure for each logical section.
 *
 * Usage:
 *   node database/init.js
 *
 * Required env vars:
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_KEY
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// ---------------------------------------------------------------------------
// Environment validation
// ---------------------------------------------------------------------------
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error('❌  Missing required environment variables: SUPABASE_URL, SUPABASE_SERVICE_KEY');
    process.exit(1);
}

// ---------------------------------------------------------------------------
// Supabase client — service role (bypasses RLS)
// ---------------------------------------------------------------------------
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dir = dirname(__filename);

/**
 * Execute raw SQL via Supabase's rpc helper.
 * Supabase does not expose a direct SQL endpoint in the JS client,
 * so we call the `exec_sql` Postgres function (created below if missing).
 */
async function runSQL(sql) {
    // Call the built-in Supabase SQL execution via REST (service role required)
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
            apikey: SUPABASE_SERVICE_KEY,
            Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sql }),
    });

    if (!response.ok) {
        const body = await response.text();
        throw new Error(`HTTP ${response.status}: ${body}`);
    }
    return response.json();
}

/**
 * Bootstrap a helper function inside Postgres that allows us to
 * execute arbitrary SQL via an RPC call.
 * Uses Supabase's Management API (requires service_role token).
 */
async function bootstrapExecSQL() {
    const bootstrapSQL = `
    CREATE OR REPLACE FUNCTION exec_sql(sql text)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
    BEGIN
      EXECUTE sql;
    END;
    $$;
  `;

    const response = await fetch(`${SUPABASE_URL}/pg/query`, {
        method: 'POST',
        headers: {
            apikey: SUPABASE_SERVICE_KEY,
            Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: bootstrapSQL }),
    });

    // If /pg/query isn't available (self-hosted vs managed differs),
    // fall back silently — exec_sql may already exist.
    if (!response.ok) {
        console.warn('  ⚠  Could not bootstrap exec_sql function (may already exist). Continuing…');
    }
}

// ---------------------------------------------------------------------------
// Parse schema.sql into named sections for granular logging
// ---------------------------------------------------------------------------
function parseSections(sql) {
    // Split on our section-comment markers: -- ===…=== followed by -- N. title
    const sectionPattern = /(?=-- ={10,}\n-- \d+\.)/g;
    const rawSections = sql.split(sectionPattern);

    return rawSections.map((block) => {
        const titleMatch = block.match(/^-- ={10,}\n-- (.+?)\n/m);
        const title = titleMatch ? titleMatch[1].trim() : 'Preamble / Extensions';
        return { title, sql: block.trim() };
    }).filter((s) => s.sql.length > 0);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
    console.log('\n🚀  Bavio.ai — Database Initializer');
    console.log('='.repeat(50));
    console.log(`   Supabase URL : ${SUPABASE_URL}`);
    console.log('='.repeat(50));

    // Read schema file
    const schemaPath = join(__dir, 'schema.sql');
    let schemaSQL;
    try {
        schemaSQL = readFileSync(schemaPath, 'utf-8');
        console.log(`\n✅  Loaded schema from ${schemaPath}`);
    } catch (err) {
        console.error(`❌  Cannot read schema.sql: ${err.message}`);
        process.exit(1);
    }

    // Bootstrap exec_sql helper
    console.log('\n⚙️   Bootstrapping exec_sql helper function…');
    await bootstrapExecSQL();

    // Parse into sections
    const sections = parseSections(schemaSQL);
    console.log(`\n📋  Found ${sections.length} section(s) in schema.sql\n`);

    let passed = 0;
    let failed = 0;
    const errors = [];

    for (const section of sections) {
        process.stdout.write(`  ▸  ${section.title} … `);
        try {
            await runSQL(section.sql);
            console.log('✅  OK');
            passed++;
        } catch (err) {
            const msg = err.message.slice(0, 200);
            console.log(`❌  FAILED\n     ${msg}`);
            errors.push({ section: section.title, error: err.message });
            failed++;
        }
    }

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log(`📊  Results: ${passed} passed, ${failed} failed`);

    if (failed === 0) {
        console.log('🎉  Schema applied successfully!\n');
    } else {
        console.log('\n⚠️   Sections that failed:');
        for (const e of errors) {
            console.log(`   • ${e.section}`);
            console.log(`     ${e.error.slice(0, 300)}\n`);
        }

        // Check if failures are just "already exists" errors (idempotent re-runs)
        const allIdempotent = errors.every(
            (e) => e.error.toLowerCase().includes('already exists'),
        );
        if (allIdempotent) {
            console.log('ℹ️   All failures are "already exists" — schema is up to date.\n');
        } else {
            process.exit(1);
        }
    }
}

main().catch((err) => {
    console.error('\n💥  Unexpected error:', err);
    process.exit(1);
});
