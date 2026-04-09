require('dotenv').config();

const http = require('http');
const express = require('express');

const authRoutes = require('./routes/auth');
const callsRoutes = require('./routes/calls');
const assistantsRoutes = require('./routes/assistants');
const analyticsRoutes = require('./routes/analytics');
const leadsRoutes = require('./routes/leads');
const realtimeRoutes = require('./routes/realtime');
const webhookRoutes = require('./routes/webhooks');
const voiceRoutes = require('./routes/voiceRoutes');
const twilioRoutes = require('./routes/twilioRoutes');
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
app.use('/calls', callsRoutes);
app.use('/assistants', assistantsRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/leads', leadsRoutes);
app.use('/realtime', realtimeRoutes);
app.use('/webhooks', webhookRoutes);
app.use('/voice', voiceRoutes);
app.use('/twilio', twilioRoutes);

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
