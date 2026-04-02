require('dotenv').config();

const http = require('http');
const express = require('express');

const authRoutes = require('./routes/auth');
const realtimeRoutes = require('./routes/realtime');
const webhookRoutes = require('./routes/webhooks');
const { requireAuth } = require('./middleware/authMiddleware');
const { createRealtimeGateway } = require('./services/realtime/realtimeGateway');

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        service: 'Bavio.ai API',
        capabilities: ['auth', 'realtime-voice'],
    });
});

app.use('/auth', authRoutes);
app.use('/realtime', realtimeRoutes);
app.use('/webhooks', webhookRoutes);

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
