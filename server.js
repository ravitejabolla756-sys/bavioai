require('dotenv').config();

const cors = require('cors');
const express = require('express');

const { testConnection } = require('./database/db');
const { apiRateLimit } = require('./middleware/rateLimit');
const { connectRedis } = require('./services/redisService');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const callRoutes = require('./routes/calls');
const assistantRoutes = require('./routes/assistants');
const leadRoutes = require('./routes/leads');
const analyticsRoutes = require('./routes/analytics');
const billingRoutes = require('./routes/billing');

const app = express();

const allowedOrigins = [
    process.env.FRONTEND_URL,
    process.env.NEXT_PUBLIC_SITE_URL,
    'http://localhost:3000',
    'https://bavio.in',
].filter(Boolean);

app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
}));
app.use(express.json({
    limit: '25mb',
    verify: (req, res, buffer) => {
        req.rawBody = buffer;
    },
}));
app.use(express.urlencoded({ extended: true }));
app.use(apiRateLimit);

app.get('/', async (req, res) => {
    return res.status(200).json({
        success: true,
        data: {
            service: 'Bavio AI Backend',
            status: 'ok',
        },
    });
});

app.use('/auth', authRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/calls', callRoutes);
app.use('/assistants', assistantRoutes);
app.use('/leads', leadRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/billing', billingRoutes);

function logRoutes() {
    [
        'GET /auth/google',
        'GET /auth/google/callback',
        'GET /auth/callback/google',
        'GET /api/auth/google',
        'GET /api/auth/google/callback',
        'GET /api/auth/callback/google',
        'GET /api/me',
        'GET /api/dashboard/overview',
        'POST /auth/signup',
        'POST /auth/login',
        'GET /auth/profile',
        'PUT /auth/profile',
        'POST /calls/incoming',
        'POST /calls/recording',
        'POST /calls/end',
        'GET /calls',
        'GET /calls/:id',
        'POST /assistants',
        'GET /assistants',
        'PUT /assistants/:id',
        'GET /leads',
        'PUT /leads/:id',
        'GET /analytics/dashboard',
        'POST /billing/subscribe',
        'POST /billing/webhook',
        'GET /billing/usage',
    ].forEach((route) => console.log(`[SERVER] route: ${route}`));
}

async function bootstrap() {
    try {
        await connectRedis();
        await testConnection();

        const port = Number(process.env.PORT || 5000);
        app.listen(port, () => {
            console.log(`[SERVER] listen: ${port}`);
            logRoutes();
        });
    } catch (error) {
        console.error('[SERVER] bootstrap: failed', error.message);
        process.exit(1);
    }
}

bootstrap();

module.exports = { app };
