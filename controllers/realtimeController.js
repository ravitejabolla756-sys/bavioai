const realtimeService = require('../services/realtime/realtimeService');

function buildWebSocketUrl(req, sessionId) {
    const forwardedProto = req.headers['x-forwarded-proto'];
    const protocol = forwardedProto || (req.secure ? 'https' : 'http');
    const wsProtocol = protocol === 'https' ? 'wss' : 'ws';

    return `${wsProtocol}://${req.get('host')}/realtime/ws?session_id=${sessionId}`;
}

async function createSession(req, res) {
    try {
        const session = await realtimeService.createSession({
            businessId: req.user.business_id,
            assistantId: req.body.assistant_id || null,
            systemPrompt: req.body.system_prompt,
            welcomeMessage: req.body.welcome_message,
            voice: req.body.voice,
            metadata: req.body.metadata,
        });

        return res.status(201).json({
            success: true,
            session: {
                ...session,
                websocket_url: buildWebSocketUrl(req, session.id),
            },
        });
    } catch (err) {
        console.error('[realtimeController.createSession]', err);
        return res.status(500).json({
            success: false,
            error: 'Failed to create realtime session.',
        });
    }
}

async function getSession(req, res) {
    try {
        const session = await realtimeService.getSession(req.params.id);

        if (!session || session.business_id !== req.user.business_id) {
            return res.status(404).json({
                success: false,
                error: 'Realtime session not found.',
            });
        }

        return res.status(200).json({
            success: true,
            session,
        });
    } catch (err) {
        console.error('[realtimeController.getSession]', err);
        return res.status(500).json({
            success: false,
            error: 'Failed to fetch realtime session.',
        });
    }
}

module.exports = { createSession, getSession };
