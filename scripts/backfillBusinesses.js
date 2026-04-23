require('dotenv').config();

const bcrypt = require('bcrypt');
const { randomUUID } = require('crypto');

const { supabase } = require('../database/db');
const { generateApiKey } = require('../utils/apiKeyGenerator');

function buildFallbackName(user) {
    const metadataName = user.user_metadata?.name || user.user_metadata?.full_name;

    if (metadataName) {
        return String(metadataName).trim();
    }

    if (user.email) {
        return String(user.email).split('@')[0];
    }

    return 'Bavio Workspace';
}

function buildFallbackPhone(user) {
    return String(user.phone || user.user_metadata?.phone || `pending-${String(user.id).slice(0, 12)}`);
}

async function listAllAuthUsers() {
    const users = [];
    let page = 1;
    const perPage = 100;

    while (true) {
        const { data, error } = await supabase.auth.admin.listUsers({ page, perPage });

        if (error) {
            throw error;
        }

        const batch = data?.users || [];
        users.push(...batch);

        if (batch.length < perPage) {
            break;
        }

        page += 1;
    }

    return users;
}

async function ensureBusinessForUser(user) {
    const { data: existing, error: fetchError } = await supabase
        .from('businesses')
        .select('id')
        .eq('id', user.id)
        .maybeSingle();

    if (fetchError) {
        throw fetchError;
    }

    if (existing) {
        return false;
    }

    const passwordHash = await bcrypt.hash(randomUUID(), 10);
    const payload = {
        id: user.id,
        name: buildFallbackName(user),
        email: String(user.email || `${user.id}@pending.bavio.in`).trim().toLowerCase(),
        phone: buildFallbackPhone(user),
        password_hash: passwordHash,
        api_key: generateApiKey(),
        plan: 'starter',
        status: 'active',
        country: 'IN',
        minutes_used: 0,
        minutes_limit: 200,
    };

    let insertResult = await supabase
        .from('businesses')
        .insert([payload])
        .select('id')
        .single();

    if (insertResult.error && String(insertResult.error.message || '').includes('schema cache')) {
        insertResult = await supabase
            .from('businesses')
            .insert([{
                id: payload.id,
                name: payload.name,
                email: payload.email,
                phone: payload.phone,
                password_hash: payload.password_hash,
                plan: payload.plan,
                status: payload.status,
                country: payload.country,
                minutes_used: payload.minutes_used,
                minutes_limit: payload.minutes_limit,
            }])
            .select('id')
            .single();
    }

    if (insertResult.error) {
        throw insertResult.error;
    }

    return true;
}

async function backfillBusinesses() {
    const users = await listAllAuthUsers();
    let created = 0;

    for (const user of users) {
        const inserted = await ensureBusinessForUser(user);

        if (inserted) {
            created += 1;
            console.log(`[BACKFILL] created business for ${user.id}`);
        }
    }

    console.log(`[BACKFILL] complete. scanned=${users.length} created=${created}`);
}

backfillBusinesses().catch((error) => {
    console.error('[BACKFILL] failed:', error.message);
    process.exit(1);
});
