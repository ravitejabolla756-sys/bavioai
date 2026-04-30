require('dotenv').config();

const { getRedisClient } = require('./services/redisClient');

const BASE_URL = process.env.E2E_BASE_URL
    || process.env.NEXT_PUBLIC_BACKEND_URL
    || `http://localhost:${process.env.PORT || 3000}`;

const withTimeout = (promise, ms = 10000) => {
    let timeoutId;

    return Promise.race([
        promise.finally(() => clearTimeout(timeoutId)),
        new Promise((_, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Timeout')), ms);
        }),
    ]);
};

const failedTests = [];
let passedTests = 0;
let totalTests = 0;
let authToken = null;
let redisClient = null;

async function runTest(name, fn) {
    totalTests += 1;

    try {
        await withTimeout(fn(), 8000);
        passedTests += 1;
        console.log(`✅ ${name}`);
    } catch (error) {
        failedTests.push(`${name}: ${error.message}`);
        console.log(`❌ ${name}: ${error.message}`);
    }
}

async function jsonRequest(path, options = {}) {
    const response = await fetch(`${BASE_URL}${path}`, options);
    const text = await response.text();

    let body = null;
    if (text) {
        try {
            body = JSON.parse(text);
        } catch (error) {
            body = text;
        }
    }

    return { response, body };
}

async function main() {
    const uniqueSeed = Date.now().toString();
    const signupPayload = {
        name: 'E2E Test User',
        email: `e2e.${uniqueSeed}@example.com`,
        phone: `9${uniqueSeed.slice(-9)}`,
        password: 'Password123!',
    };

    if (!process.env.SARVAM_API_KEY) {
        console.log('⚠️ SARVAM_API_KEY missing. STT, LLM, and TTS tests are skipped.');
    }

    await runTest('Health Check', async () => {
        const res = await fetch(`${BASE_URL}/health`);
        if (!res.ok) {
            throw new Error('Server not responding');
        }
    });

    await runTest('Auth Flow', async () => {
        const signup = await jsonRequest('/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(signupPayload),
        });

        if (signup.response.status !== 201) {
            throw new Error(`Signup failed with status ${signup.response.status}`);
        }

        const login = await jsonRequest('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: signupPayload.email,
                password: signupPayload.password,
            }),
        });

        authToken = login.body?.data?.token || login.body?.token || null;

        if (login.response.status !== 200 || !authToken) {
            throw new Error(`Login failed with status ${login.response.status}`);
        }

        const profile = await jsonRequest('/auth/profile', {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (profile.response.status !== 200) {
            throw new Error(`Profile failed with status ${profile.response.status}`);
        }
    });

    await runTest('Redis Basic Test', async () => {
        redisClient = await getRedisClient();
        const key = 'test:e2e';
        const value = JSON.stringify({ ok: true });

        await redisClient.set(key, value, { EX: 30 });
        const stored = await redisClient.get(key);
        if (stored !== value) {
            throw new Error('Redis get returned unexpected value');
        }

        await redisClient.del(key);
        const exists = await redisClient.exists(key);
        if (exists !== 0) {
            throw new Error('Redis delete failed');
        }
    });

    await runTest('Analytics Endpoint', async () => {
        if (!authToken) {
            throw new Error('Missing auth token');
        }

        const analytics = await jsonRequest('/analytics/calls', {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (analytics.response.status !== 200) {
            throw new Error(`Analytics failed with status ${analytics.response.status}`);
        }
    });

    await runTest('Billing Endpoint', async () => {
        if (!authToken) {
            throw new Error('Missing auth token');
        }

        const billing = await jsonRequest('/billing/usage', {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (billing.response.status !== 200) {
            throw new Error(`Billing failed with status ${billing.response.status}`);
        }
    });

    await runTest('Leads Endpoint', async () => {
        if (!authToken) {
            throw new Error('Missing auth token');
        }

        const leads = await jsonRequest('/leads', {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (leads.response.status !== 200) {
            throw new Error(`Leads failed with status ${leads.response.status}`);
        }
    });

    if (redisClient?.isOpen) {
        await withTimeout(redisClient.quit(), 3000).catch(() => {
            redisClient.disconnect();
        });
    }

    console.log(`${passedTests}/${totalTests} tests passed`);

    if (failedTests.length) {
        console.log('Failed tests:');
        failedTests.forEach((failure) => console.log(`- ${failure}`));
        process.exitCode = 1;
    }
}

main().catch((error) => {
    console.log(`❌ Test runner failed: ${error.message}`);
    process.exitCode = 1;
});
