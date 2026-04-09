const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { randomUUID } = require('crypto');

const { supabase } = require('../database/db');
const { generateApiKey } = require('../utils/apiKeyGenerator');
const {
    buildGoogleOAuthUrl,
    clearStateCookie,
    exchangeCodeForToken,
    fetchGoogleUserProfile,
    setStateCookie,
    validateState,
} = require('../services/googleAuthService');

function normalizeBusinessRow(row = {}, generatedApiKey = null) {
    return {
        id: row.id,
        name: row.name,
        email: row.email,
        phone: row.phone,
        plan: row.plan || 'starter',
        status: row.status || 'active',
        country: row.country || 'IN',
        minutes_used: row.minutes_used ?? 0,
        minutes_limit: row.minutes_limit ?? 200,
        api_key: row.api_key || generatedApiKey || null,
        provider: row.provider || null,
        provider_id: row.provider_id || null,
        picture: row.avatar_url || null,
        created_at: row.created_at || null,
        updated_at: row.updated_at || null,
    };
}

function signAuthToken(business) {
    return jwt.sign(
        { id: business.id, email: business.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
}

function setAuthCookie(res, token) {
    res.setHeader('Set-Cookie', [
        `bavio-token=${encodeURIComponent(token)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${60 * 60 * 24 * 7}${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`,
        'bavio_google_oauth_state=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0',
    ]);
}

function ensureJwtSecret() {
    if (!process.env.JWT_SECRET) {
        throw new Error('Missing JWT_SECRET');
    }
}

async function createBusinessFromGoogleProfile(profile) {
    const generatedApiKey = generateApiKey();
    const generatedPassword = randomUUID();
    const passwordHash = await bcrypt.hash(generatedPassword, 10);
    const insertPayload = {
        id: randomUUID(),
        name: String(profile.name || profile.email || 'Google User').trim(),
        email: String(profile.email || '').trim().toLowerCase(),
        phone: `google_${String(profile.sub || randomUUID())}`,
        password_hash: passwordHash,
        api_key: generatedApiKey,
        plan: 'starter',
        status: 'active',
        country: 'IN',
        minutes_used: 0,
        minutes_limit: 200,
        provider: 'google',
        provider_id: String(profile.sub || ''),
        avatar_url: profile.picture || null,
        email_verified: true,
        providers: ['google'],
        provider_accounts: { google: String(profile.sub || '') },
    };

    let insertResult = await supabase
        .from('businesses')
        .insert([insertPayload])
        .select('*')
        .single();

    if (insertResult.error && String(insertResult.error.message || '').includes('schema cache')) {
        insertResult = await supabase
            .from('businesses')
            .insert([{
                id: insertPayload.id,
                name: insertPayload.name,
                email: insertPayload.email,
                phone: insertPayload.phone,
                password_hash: insertPayload.password_hash,
                api_key: insertPayload.api_key,
                plan: insertPayload.plan,
                status: insertPayload.status,
                country: insertPayload.country,
                minutes_used: insertPayload.minutes_used,
                minutes_limit: insertPayload.minutes_limit,
            }])
            .select('*')
            .single();
    }

    if (insertResult.error || !insertResult.data) {
        throw new Error(insertResult.error?.message || 'Unable to create Google user');
    }

    return {
        business: insertResult.data,
        generatedApiKey,
    };
}

async function syncGoogleBusiness(profile) {
    const normalizedEmail = String(profile.email || '').trim().toLowerCase();

    const { data: existingBusiness, error: fetchError } = await supabase
        .from('businesses')
        .select('*')
        .eq('email', normalizedEmail)
        .maybeSingle();

    if (fetchError) {
        throw new Error(fetchError.message);
    }

    if (!existingBusiness) {
        return createBusinessFromGoogleProfile(profile);
    }

    const updatePayload = {
        name: String(profile.name || existingBusiness.name || normalizedEmail).trim(),
        provider: 'google',
        provider_id: String(profile.sub || existingBusiness.provider_id || ''),
        avatar_url: profile.picture || existingBusiness.avatar_url || null,
        updated_at: new Date().toISOString(),
    };

    let updateResult = await supabase
        .from('businesses')
        .update(updatePayload)
        .eq('id', existingBusiness.id)
        .select('*')
        .single();

    if (updateResult.error && String(updateResult.error.message || '').includes('schema cache')) {
        updateResult = {
            data: {
                ...existingBusiness,
                ...updatePayload,
            },
            error: null,
        };
    }

    if (updateResult.error || !updateResult.data) {
        throw new Error(updateResult.error?.message || 'Unable to update Google user');
    }

    return {
        business: updateResult.data,
        generatedApiKey: null,
    };
}

async function signup(req, res) {
    try {
        const { name, email, phone, password } = req.body || {};

        const normalizedName = String(name || '').trim();
        const normalizedEmail = String(email || '').trim().toLowerCase();
        const normalizedPhone = String(phone || '').trim();
        const normalizedPassword = String(password || '');

        if (!normalizedName || !normalizedEmail || !normalizedPhone || !normalizedPassword) {
            return res.status(400).json({ success: false, error: 'Missing required fields' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(normalizedEmail)) {
            return res.status(400).json({ success: false, error: 'Invalid email address' });
        }

        const { data: existingEmail, error: emailError } = await supabase
            .from('businesses')
            .select('id')
            .eq('email', normalizedEmail)
            .maybeSingle();

        if (emailError) {
            console.error('[AUTH] signup: email check failed', emailError.message);
            return res.status(500).json({ success: false, error: emailError.message });
        }

        if (existingEmail) {
            return res.status(409).json({ success: false, error: 'Email already exists' });
        }

        const { data: existingPhone, error: phoneError } = await supabase
            .from('businesses')
            .select('id')
            .eq('phone', normalizedPhone)
            .maybeSingle();

        if (phoneError) {
            console.error('[AUTH] signup: phone check failed', phoneError.message);
            return res.status(500).json({ success: false, error: phoneError.message });
        }

        if (existingPhone) {
            return res.status(409).json({ success: false, error: 'Phone already exists' });
        }

        const passwordHash = await bcrypt.hash(normalizedPassword, 10);
        const generatedApiKey = generateApiKey();
        const fullInsertPayload = {
            id: randomUUID(),
            name: normalizedName,
            email: normalizedEmail,
            phone: normalizedPhone,
            password_hash: passwordHash,
            api_key: generatedApiKey,
            plan: 'starter',
            status: 'active',
            country: 'IN',
            minutes_used: 0,
            minutes_limit: 200,
        };

        let insertResult = await supabase
            .from('businesses')
            .insert([fullInsertPayload])
            .select('*')
            .single();

        if (insertResult.error && String(insertResult.error.message || '').includes('schema cache')) {
            insertResult = await supabase
                .from('businesses')
                .insert([{
                    name: normalizedName,
                    email: normalizedEmail,
                    phone: normalizedPhone,
                    password_hash: passwordHash,
                    plan: 'starter',
                    status: 'active',
                }])
                .select('*')
                .single();
        }

        const { data, error } = insertResult;

        if (error) {
            console.error('[AUTH] signup: insert failed', error.message);
            return res.status(500).json({ success: false, error: error.message });
        }

        return res.status(201).json({
            success: true,
            data: {
                message: 'Signup successful',
                user: normalizeBusinessRow(data, generatedApiKey),
            },
        });
    } catch (error) {
        console.error('[AUTH] signup:', error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body || {};
        const normalizedEmail = String(email || '').trim().toLowerCase();
        const normalizedPassword = String(password || '');

        if (!normalizedEmail || !normalizedPassword) {
            return res.status(400).json({ success: false, error: 'Missing required fields' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(normalizedEmail)) {
            return res.status(400).json({ success: false, error: 'Invalid email address' });
        }

        const { data: business, error } = await supabase
            .from('businesses')
            .select('*')
            .eq('email', normalizedEmail)
            .maybeSingle();

        if (error) {
            console.error('[AUTH] login: fetch failed', error.message);
            return res.status(500).json({ success: false, error: error.message });
        }

        if (!business) {
            return res.status(401).json({ success: false, error: 'Invalid email or password' });
        }

        const matches = await bcrypt.compare(normalizedPassword, business.password_hash);
        if (!matches) {
            return res.status(401).json({ success: false, error: 'Invalid email or password' });
        }

        ensureJwtSecret();
        const token = signAuthToken(business);

        const { password_hash, ...user } = business;

        return res.status(200).json({
            success: true,
            data: {
                token,
                user: normalizeBusinessRow(user),
            },
        });
    } catch (error) {
        console.error('[AUTH] login:', error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
}

async function startGoogleAuth(req, res) {
    try {
        const { state, url } = buildGoogleOAuthUrl(req);
        setStateCookie(res, state);
        return res.redirect(url);
    } catch (error) {
        console.error('[AUTH] google start:', error.message);
        const frontendUrl = process.env.FRONTEND_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const redirectUrl = new URL('/login', frontendUrl);
        redirectUrl.searchParams.set('error', error.message);
        return res.redirect(redirectUrl.toString());
    }
}

async function googleCallback(req, res) {
    try {
        ensureJwtSecret();

        const { code, state } = req.query || {};

        if (!code) {
            clearStateCookie(res);
            return res.status(400).json({ success: false, error: 'Missing authorization code' });
        }

        if (!validateState(req, state)) {
            clearStateCookie(res);
            return res.status(400).json({ success: false, error: 'Invalid OAuth state' });
        }

        const tokenResponse = await exchangeCodeForToken(String(code));
        if (!tokenResponse?.access_token) {
            clearStateCookie(res);
            return res.status(401).json({ success: false, error: 'Unable to exchange code for access token' });
        }

        const googleProfile = await fetchGoogleUserProfile(tokenResponse.access_token);
        const normalizedProfile = {
            email: String(googleProfile.email || '').trim().toLowerCase(),
            name: String(googleProfile.name || '').trim(),
            picture: googleProfile.picture || null,
            sub: String(googleProfile.sub || '').trim(),
        };

        if (!normalizedProfile.email || !normalizedProfile.sub) {
            clearStateCookie(res);
            return res.status(400).json({ success: false, error: 'Google profile is missing required fields' });
        }

        const { business, generatedApiKey } = await syncGoogleBusiness(normalizedProfile);
        const authToken = signAuthToken(business);
        setAuthCookie(res, authToken);
        const frontendUrl = process.env.FRONTEND_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const redirectUrl = new URL('/dashboard', frontendUrl);
        redirectUrl.searchParams.set('token', authToken);
        if (generatedApiKey) {
            redirectUrl.searchParams.set('new', '1');
        }

        return res.redirect(redirectUrl.toString());
    } catch (error) {
        clearStateCookie(res);
        console.error('[AUTH] google callback:', error.response?.data || error.message);
        const frontendUrl = process.env.FRONTEND_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const redirectUrl = new URL('/login', frontendUrl);
        redirectUrl.searchParams.set('error', error.response?.data?.error_description || error.response?.data?.error || error.message);
        return res.redirect(redirectUrl.toString());
    }
}

async function getProfile(req, res) {
    try {
        const { data, error } = await supabase
            .from('businesses')
            .select('*')
            .eq('id', req.user.id)
            .maybeSingle();

        if (error) {
            console.error('[AUTH] getProfile: fetch failed', error.message);
            return res.status(500).json({ success: false, error: error.message });
        }

        if (!data) {
            return res.status(404).json({ success: false, error: 'Business not found' });
        }

        return res.status(200).json({ success: true, data: normalizeBusinessRow(data) });
    } catch (error) {
        console.error('[AUTH] getProfile:', error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
}

async function updateProfile(req, res) {
    try {
        const updates = { updated_at: new Date().toISOString() };

        if (req.body?.name) {
            updates.name = String(req.body.name).trim();
        }

        if (req.body?.phone) {
            updates.phone = String(req.body.phone).trim();
        }

        const { data, error } = await supabase
            .from('businesses')
            .update(updates)
            .eq('id', req.user.id)
            .select('*')
            .single();

        if (error) {
            console.error('[AUTH] updateProfile: update failed', error.message);
            return res.status(500).json({ success: false, error: error.message });
        }

        return res.status(200).json({ success: true, data: normalizeBusinessRow(data) });
    } catch (error) {
        console.error('[AUTH] updateProfile:', error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
}

module.exports = {
    signup,
    login,
    startGoogleAuth,
    googleCallback,
    getProfile,
    updateProfile,
};
