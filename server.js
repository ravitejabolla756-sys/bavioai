require('dotenv').config();

const http = require('http');
const next = require('next');
const express = require('express');
const cors = require('cors');

const healthRoutes = require('./routes/health');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const realtimeRoutes = require('./routes/realtime');
const callRoutes = require('./routes/calls');
const assistantRoutes = require('./routes/assistants');
const leadRoutes = require('./routes/leads');
const analyticsRoutes = require('./routes/analytics');
const billingRoutes = require('./routes/billing');
const authController = require('./controllers/authController');
const analyticsController = require('./controllers/analyticsController');
const { requireAuth } = require('./middleware/authMiddleware');
const { createRealtimeGateway } = require('./services/realtime/realtimeGateway');
const { initRedis } = require('./services/redisClient');

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev, hostname: '0.0.0.0', port: PORT });
const handle = nextApp.getRequestHandler();

app.set('trust proxy', true);

const allowedOrigins = [
    process.env.FRONTEND_URL,
    process.env.NEXT_PUBLIC_SITE_URL,
].filter(Boolean);

const apiMiddlewares = [
    cors({
        origin(origin, callback) {
            if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
                callback(null, true);
                return;
            }

            callback(new Error('Not allowed by CORS'));
        },
        credentials: true,
    }),
    express.json({ limit: '10mb' }),
    express.urlencoded({ extended: false }),
];

app.get('/api', ...apiMiddlewares, (req, res) => {
    res.json({
        status: 'ok',
        service: 'Bavio.ai',
        capabilities: ['website', 'auth', 'calls', 'realtime-voice'],
    });
});

app.use('/health', ...apiMiddlewares, healthRoutes);
app.use('/api/health', ...apiMiddlewares, healthRoutes);
app.use('/auth', ...apiMiddlewares, authRoutes);
app.use('/user', ...apiMiddlewares, userRoutes);
app.get('/api/me', ...apiMiddlewares, requireAuth, authController.getProfile);
app.get('/api/dashboard/overview', ...apiMiddlewares, requireAuth, analyticsController.getDashboard);
app.use('/realtime', ...apiMiddlewares, realtimeRoutes);
app.use('/calls', ...apiMiddlewares, callRoutes);
app.use('/assistants', ...apiMiddlewares, assistantRoutes);
app.use('/leads', ...apiMiddlewares, leadRoutes);
app.use('/analytics', ...apiMiddlewares, analyticsRoutes);
app.use('/billing', ...apiMiddlewares, billingRoutes);

app.all('*', (req, res) => handle(req, res));

const server = http.createServer(app);
const realtimeGateway = createRealtimeGateway({ server });

const serverReady = (async () => {
    try {
        await nextApp.prepare();
    } catch (error) {
        console.error('[NEXT] Startup failed:', error.message);
        process.exit(1);
    }

    try {
        await initRedis();
    } catch (error) {
        console.warn('[REDIS] Startup validation failed. Continuing without realtime session storage.');
    }

    return await new Promise((resolve) => {
        server.listen(PORT, () => {
            console.log(`Bavio.ai server listening on port ${PORT}`);
            console.log('Mounted routes: /health /auth /user /realtime /calls /assistants /leads /analytics /billing /api');
            console.log('Next.js pages ready on the same origin');
            console.log('Realtime WebSocket endpoint ready at /realtime/ws');
            resolve(server);
        });
    });
})();

module.exports = { app, server, realtimeGateway, serverReady, nextApp };
