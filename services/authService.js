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

// ---------------------------------------------------------------------------
// signupBusiness
// ---------------------------------------------------------------------------
async function signupBusiness({ name, email, phone, password }) {
    // 1. Check for existing email
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

    // 2. Check for existing phone
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

    // 3. Hash the password
    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

    // 4. Insert into businesses table
    const { data: business, error: insertErr } = await supabase
        .from('businesses')
        .insert([{
            name,
            email,
            phone,
            password_hash,
            plan: 'free',
            status: 'active',
        }])
        .select()
        .single();

    if (insertErr) throw insertErr;

    return sanitizeBusiness(business);
}

// ---------------------------------------------------------------------------
// loginBusiness
// ---------------------------------------------------------------------------
async function loginBusiness(email, password) {
    // 1. Fetch business by email (include password_hash for comparison)
    const { data: business, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('email', email)
        .maybeSingle();

    if (error) throw error;

    // Use a generic message to avoid user enumeration attacks
    const invalidErr = new Error('Invalid email or password.');
    invalidErr.code = 'INVALID_CREDENTIALS';

    if (!business) throw invalidErr;

    // 2. Check account status
    if (business.status !== 'active') {
        const suspendedErr = new Error('This account has been suspended. Please contact support.');
        suspendedErr.code = 'ACCOUNT_SUSPENDED';
        throw suspendedErr;
    }

    // 3. Compare password
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

    return business; // password_hash already excluded via select
}

module.exports = { signupBusiness, loginBusiness, getBusinessById };
