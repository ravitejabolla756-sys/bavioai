require('dotenv').config();

const axios = require('axios');
const { randomBytes, timingSafeEqual } = require('crypto');

const GOOGLE_OAUTH_AUTHORIZE_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_OAUTH_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo';
const GOOGLE_STATE_COOKIE = 'bavio_google_oauth_state';
const GOOGLE_STATE_MAX_AGE_MS = 10 * 60 * 1000;
const GOOGLE_SCOPES = ['openid', 'email', 'profile'];

function readEnv(name) {
    return String(process.env[name] || '').trim();
}

function getBaseOrigin(req) {
    const forwardedProto = req.headers['x-forwarded-proto'];
    const protocol = Array.isArray(forwardedProto)
        ? forwardedProto[0]
        : forwardedProto || req.protocol || 'http';
    const host = req.headers['x-forwarded-host'] || req.get('host');

    if (!host) {
        return null;
    }

    return `${protocol}://${host}`;
}

function requireGoogleClientEnv() {
    const clientId = readEnv('GOOGLE_CLIENT_ID');

    if (!clientId) {
        throw new Error('Missing GOOGLE_CLIENT_ID');
    }

    return { clientId };
}

function requireGoogleTokenEnv(originFallback) {
    const clientId = readEnv('GOOGLE_CLIENT_ID');
    const clientSecret = readEnv('GOOGLE_CLIENT_SECRET');
    const redirectUri = readEnv('GOOGLE_REDIRECT_URI') || (originFallback ? `${originFallback}/auth/google/callback` : '');

    if (!clientId || !clientSecret || !redirectUri) {
        throw new Error('Missing Google OAuth token environment variables');
    }

    return { clientId, clientSecret, redirectUri };
}

function createStateValue() {
    return randomBytes(32).toString('hex');
}

function serializeCookie(name, value, options = {}) {
    const parts = [`${name}=${encodeURIComponent(value)}`];

    if (options.httpOnly) parts.push('HttpOnly');
    if (options.sameSite) parts.push(`SameSite=${options.sameSite}`);
    if (options.secure) parts.push('Secure');
    if (options.path) parts.push(`Path=${options.path}`);
    if (typeof options.maxAge === 'number') parts.push(`Max-Age=${options.maxAge}`);

    return parts.join('; ');
}

function setStateCookie(res, state) {
    res.setHeader('Set-Cookie', serializeCookie(GOOGLE_STATE_COOKIE, state, {
        httpOnly: true,
        sameSite: 'Lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: Math.floor(GOOGLE_STATE_MAX_AGE_MS / 1000),
    }));
}

function clearStateCookie(res) {
    res.setHeader('Set-Cookie', serializeCookie(GOOGLE_STATE_COOKIE, '', {
        httpOnly: true,
        sameSite: 'Lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 0,
    }));
}

function getCookieValue(req, cookieName) {
    const header = req.headers.cookie || '';
    if (!header) return null;

    return header
        .split(';')
        .map((part) => part.trim())
        .find((part) => part.startsWith(`${cookieName}=`))
        ?.slice(cookieName.length + 1) || null;
}

function validateState(req, stateFromQuery) {
    const stateFromCookie = getCookieValue(req, GOOGLE_STATE_COOKIE);

    if (!stateFromCookie || !stateFromQuery) {
        return false;
    }

    const cookieBuffer = Buffer.from(decodeURIComponent(stateFromCookie));
    const queryBuffer = Buffer.from(String(stateFromQuery));

    if (cookieBuffer.length !== queryBuffer.length) {
        return false;
    }

    return timingSafeEqual(cookieBuffer, queryBuffer);
}

function buildGoogleOAuthUrl(req) {
    const { clientId } = requireGoogleClientEnv();
    const redirectUri = readEnv('GOOGLE_REDIRECT_URI') || `${getBaseOrigin(req)}/auth/google/callback`;

    if (!redirectUri) {
        throw new Error('Missing GOOGLE_REDIRECT_URI');
    }

    const state = createStateValue();
    const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: 'code',
        scope: GOOGLE_SCOPES.join(' '),
        access_type: 'offline',
        prompt: 'consent',
        state,
    });

    return {
        state,
        url: `${GOOGLE_OAUTH_AUTHORIZE_URL}?${params.toString()}`,
    };
}

async function exchangeCodeForToken(code) {
    const { clientId, clientSecret, redirectUri } = requireGoogleTokenEnv();

    const payload = new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
    });

    const response = await axios.post(GOOGLE_OAUTH_TOKEN_URL, payload.toString(), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        timeout: 10000,
    });

    return response.data;
}

async function fetchGoogleUserProfile(accessToken) {
    const response = await axios.get(GOOGLE_USERINFO_URL, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        timeout: 10000,
    });

    return response.data;
}

module.exports = {
    GOOGLE_STATE_COOKIE,
    buildGoogleOAuthUrl,
    clearStateCookie,
    exchangeCodeForToken,
    fetchGoogleUserProfile,
    getBaseOrigin,
    setStateCookie,
    validateState,
};
