require('dotenv').config();

const http = require('http');
const express = require('express');

const authRoutes = require('./routes/auth');
const realtimeRoutes = require('./routes/realtime');
const webhookRoutes = require('./routes/webhooks');
const { requireAuth } = require('./middleware/authMiddleware');
const { createRealtimeGateway } = require('./services/realtime/realtimeGateway');
const { testConnection } = require('./database/db');

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        service: 'Bavio.ai API',
        capabilities: ['auth', 'calls', 'realtime-voice', 'voice-orchestrator'],
    });
});

app.get('/health', async (req, res) => {
    try {
        await testConnection();
        res.status(200).json({ success: true, data: { status: 'ok' } });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.use('/auth', authRoutes);
app.use('/realtime', realtimeRoutes);
app.use('/webhooks', webhookRoutes);

function mountOptionalRoute(basePath, modulePath) {
    try {
        const router = require(modulePath);
        app.use(basePath, router);
        console.log(`[SERVER] route mounted: ${basePath}`);
    } catch (error) {
        if (error.code === 'MODULE_NOT_FOUND') {
            console.warn(`[SERVER] route skipped: ${basePath} (${error.message})`);
            return;
        }

        throw error;
    }
}

mountOptionalRoute('/calls', './routes/calls');
mountOptionalRoute('/assistants', './routes/assistants');
mountOptionalRoute('/analytics', './routes/analytics');
mountOptionalRoute('/leads', './routes/leads');
mountOptionalRoute('/voice', './routes/voiceRoutes');
mountOptionalRoute('/twilio', './routes/twilioRoutes');

app.get('/protected', requireAuth, (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    });
});

const server = http.createServer(app);
const realtimeGateway = createRealtimeGateway({ server });

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Bavio.ai server listening on port ${PORT}`);
    console.log('Realtime WebSocket endpoint ready at /realtime/ws');
});

module.exports = { app, server, realtimeGateway };
