/**
 * services/authService.js
 * Bavio.ai — Auth service layer
 *
 * All DB access via database/db.js (single source of truth).
 * Never returns password_hash to callers.
 */

const bcrypt = require('bcrypt');
const supabase = require('../database/db');

const SALT_ROUNDS = 12;

// ---------------------------------------------------------------------------
// Internal helper — strip sensitive fields before returning a business record
// ---------------------------------------------------------------------------
function sanitizeBusiness(business) {
    if (!business) return null;
    const { password_hash, ...safe } = business;
    return safe;
}

function buildInvalidCredentialsError() {
    const err = new Error('Invalid email or password.');
    err.code = 'INVALID_CREDENTIALS';
    return err;
}

function buildSuspendedError() {
    const err = new Error('This account has been suspended. Please contact support.');
    err.code = 'ACCOUNT_SUSPENDED';
    return err;
}

// ---------------------------------------------------------------------------
// signupBusiness
// ---------------------------------------------------------------------------
async function signupBusiness({ name, email, phone, password }) {
    if (!name || !email || !phone || !password) {
        const err = new Error('Missing fields');
        err.code = 'MISSING_FIELDS';
        throw err;
    }

    const { data: existing, error: lookupErr } = await supabase
        .from('businesses')
        .select('id')
        .eq('email', email)
        .maybeSingle();

    if (lookupErr) throw lookupErr;
    if (existing) {
        const err = new Error('An account with that email already exists.');
        err.code = 'DUPLICATE_EMAIL';
        throw err;
    }

    const { data: existingPhone, error: phoneLookupErr } = await supabase
        .from('businesses')
        .select('id')
        .eq('phone', phone)
        .maybeSingle();

    if (phoneLookupErr) throw phoneLookupErr;
    if (existingPhone) {
        const err = new Error('An account with that phone number already exists.');
        err.code = 'DUPLICATE_PHONE';
        throw err;
    }

    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);
    const payload = {
        name,
        email,
        phone,
        password_hash,
        plan: 'free',
        status: 'active',
    };

    const { data: business, error: insertErr } = await supabase
        .from('businesses')
        .insert([payload])
        .select('id, name, email, phone, plan, status, created_at, updated_at')
        .single();

    if (insertErr) throw insertErr;

    return sanitizeBusiness(business);
}

// ---------------------------------------------------------------------------
// loginBusiness
// ---------------------------------------------------------------------------
async function loginBusiness(email, password) {
    const { data: business, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('email', email)
        .maybeSingle();

    if (error) throw error;

    const invalidErr = buildInvalidCredentialsError();
    if (!business) throw invalidErr;

    if (business.status !== 'active') {
        throw buildSuspendedError();
    }

    const passwordMatches = await bcrypt.compare(password, business.password_hash);
    if (!passwordMatches) throw invalidErr;

    return sanitizeBusiness(business);
}

// ---------------------------------------------------------------------------
// getBusinessById
// ---------------------------------------------------------------------------
async function getBusinessById(id) {
    const { data: business, error } = await supabase
        .from('businesses')
        .select('id, name, email, phone, plan, status, created_at, updated_at')
        .eq('id', id)
        .maybeSingle();

    if (error) throw error;

    if (!business) {
        const err = new Error('Business not found.');
        err.code = 'NOT_FOUND';
        throw err;
    }

    return business;
}

module.exports = { signupBusiness, loginBusiness, getBusinessById };
