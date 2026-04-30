const { randomUUID } = require('crypto');
const WebSocket = require('ws');

const sessionStore = require('./sessionStore');
const VoicePipeline = require('./voicePipeline');
const { createVoiceProviders } = require('../../providers/voice');
const telephonyService = require('../telephony/telephonyService');

function createRealtimeGateway({ server }) {
    const websocketServer = new WebSocket.Server({ noServer: true });
    const providers = createVoiceProviders();
    const pipelines = new Map();
    const connections = new Map();
    const DEBUG = process.env.REALTIME_DEBUG === 'true';

    function debugLog(message, details) {
        if (DEBUG) {
            console.log(`[realtimeGateway:${message}]`, JSON.stringify(details || {}));
        }
    }

    function sendJson(socket, payload) {
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(payload));
        }
    }

    function sendProviderMessages(socket, messages, frameDelayMs = 20) {
        if (!messages || messages.length === 0) {
            return;
        }

        messages.forEach((message, index) => {
            setTimeout(() => {
                sendJson(socket, message);
            }, index * frameDelayMs);
        });
    }

    function getConnectionsForSession(sessionId) {
        if (!connections.has(sessionId)) {
            connections.set(sessionId, new Map());
        }
        return connections.get(sessionId);
    }

    async function getPipeline(sessionId) {
        let pipeline = pipelines.get(sessionId);
        if (!pipeline) {
            pipeline = new VoicePipeline({
                sessionId,
                providers,
                emitEvent: async (type, payload) => {
                    const sessionConnections = getConnectionsForSession(sessionId);

                    for (const connection of sessionConnections.values()) {
                        if (connection.kind === 'client') {
                            sendJson(connection.socket, { type, ...payload });
                            continue;
                        }

                        if (type === 'audio.output') {
                            const providerMessages = telephonyService.buildProviderAudioMessage(connection, payload.audio);
                            if (providerMessages?.length) {
                                sendProviderMessages(connection.socket, providerMessages);
                            }
                            continue;
                        }

                        if (type === 'assistant.interrupted') {
                            const clearMessage = telephonyService.buildClearMessage(connection);
                            if (clearMessage) {
                                sendJson(connection.socket, clearMessage);
                            }
                        }
                    }
                },
            });
            pipelines.set(sessionId, pipeline);
        }

        return pipeline;
    }

    async function closePipeline(sessionId, reason) {
        const pipeline = pipelines.get(sessionId);
        if (pipeline) {
            await pipeline.close(reason);
            pipelines.delete(sessionId);
        }
    }

    websocketServer.on('connection', async (socket, req) => {
        const requestUrl = new URL(req.url, `http://${req.headers.host}`);
        const sessionId = requestUrl.searchParams.get('session_id');
        const provider = requestUrl.searchParams.get('provider');
        const callSid = requestUrl.searchParams.get('call_sid');
        const connectionId = randomUUID();
        const kind = provider ? 'telephony' : 'client';
        const pendingMessages = [];
        let processMessage = null;

        socket.on('message', (rawMessage) => {
            if (processMessage) {
                processMessage(rawMessage).catch((error) => {
                    console.error('[realtimeGateway]', error);
                    sendJson(socket, { type: 'error', error: error.message || 'Realtime pipeline failure.' });
                });
                return;
            }

            pendingMessages.push(rawMessage);
        });

        const session = await sessionStore.get(sessionId);
        if (!session) {
            sendJson(socket, { type: 'error', error: 'Unknown realtime session.' });
            socket.close(1008, 'Unknown realtime session');
            return;
        }

        const metadata = {
            id: connectionId,
            kind,
            provider: provider || 'app',
            call_sid: callSid || null,
            created_at: new Date().toISOString(),
        };

        const sessionConnections = getConnectionsForSession(sessionId);
        sessionConnections.set(connectionId, {
            ...metadata,
            socket,
            streamSid: null,
        });

        const connectionReady = (async () => {
            await sessionStore.addConnectionMetadata(sessionId, connectionId, metadata);
            await sessionStore.markSocketConnected(sessionId, true);
            await getPipeline(sessionId);
            debugLog('connection', { sessionId, connectionId, kind, provider });

            if (kind === 'client') {
                sendJson(socket, {
                    type: 'session.ready',
                    session_id: session.id,
                    status: session.status,
                    welcome_message: session.assistant.welcome_message,
                });
            }
        })();

        processMessage = async (rawMessage) => {
            let message;
            try {
                message = JSON.parse(rawMessage.toString());
                debugLog('message', { sessionId, kind, type: message.type || message.event });
            } catch (error) {
                sendJson(socket, { type: 'error', error: 'Invalid JSON payload.' });
                return;
            }

            await connectionReady;
            const currentConnection = sessionConnections.get(connectionId);
            const pipeline = await getPipeline(sessionId);

            try {
                if (kind === 'client') {
                    switch (message.type) {
                        case 'audio.input':
                            await pipeline.ingestAudioFrame({
                                audioBase64: message.audio,
                                codec: message.codec || 'pcm_s16le',
                                sampleRate: message.sample_rate || 16000,
                            });
                            break;
                        case 'audio.commit':
                            await pipeline.flushInput('final');
                            break;
                        case 'user.text':
                            await sessionStore.appendTranscript(sessionId, {
                                role: 'user',
                                content: message.text || '',
                                metadata: { source: 'text-input' },
                            });
                            await pipeline.generateAssistantResponse();
                            break;
                        case 'session.ping':
                            sendJson(socket, {
                                type: 'session.pong',
                                session_id: sessionId,
                                timestamp: new Date().toISOString(),
                            });
                            break;
                        default:
                            sendJson(socket, { type: 'error', error: `Unsupported message type: ${message.type}` });
                    }
                    return;
                }

                const normalizedMessage = telephonyService.normalizeWsMessage(provider, message);

                switch (normalizedMessage.type) {
                    case 'call.connected':
                        break;
                    case 'call.started':
                        currentConnection.streamSid = normalizedMessage.streamSid;
                        await sessionStore.addConnectionMetadata(sessionId, connectionId, {
                            ...metadata,
                            stream_sid: normalizedMessage.streamSid,
                        });
                        if (!currentConnection.greetingSent && session?.assistant?.welcome_message) {
                            currentConnection.greetingSent = true;
                            await pipeline.speakAssistantText(session.assistant.welcome_message, {
                                source: 'telephony-welcome',
                            });
                        }
                        break;
                    case 'audio.input':
                        await pipeline.ingestAudioFrame(normalizedMessage);
                        break;
                    case 'call.ended':
                        await telephonyService.finalizeCall(provider, callSid || normalizedMessage.callSid, {
                            ended_at: new Date().toISOString(),
                            provider,
                            call_sid: callSid || normalizedMessage.callSid,
                        });
                        await closePipeline(sessionId, 'call-ended');
                        await sessionStore.deleteSession(sessionId);
                        socket.close();
                        break;
                    default:
                        break;
                }
            } catch (error) {
                console.error('[realtimeGateway]', error);
                sendJson(socket, { type: 'error', error: error.message || 'Realtime pipeline failure.' });
            }
        };

        for (const rawMessage of pendingMessages.splice(0, pendingMessages.length)) {
            await processMessage(rawMessage);
        }

        socket.on('close', async () => {
            await connectionReady.catch(() => null);
            sessionConnections.delete(connectionId);
            await sessionStore.removeConnectionMetadata(sessionId, connectionId);

            if (sessionConnections.size === 0) {
                await sessionStore.markSocketConnected(sessionId, false);
                if (kind === 'telephony' && provider && callSid) {
                    await telephonyService.finalizeCall(provider, callSid, {
                        ended_at: new Date().toISOString(),
                        provider,
                        call_sid: callSid,
                        reason: 'socket-closed',
                    });
                    await sessionStore.deleteSession(sessionId);
                }
                await closePipeline(sessionId, 'socket-closed');
            }
        });

        await connectionReady;
    });

    server.on('upgrade', async (req, socket, head) => {
        const requestUrl = new URL(req.url, `http://${req.headers.host}`);

        if (requestUrl.pathname !== '/realtime/ws') {
            return;
        }

        const sessionId = requestUrl.searchParams.get('session_id');
        if (!sessionId || !(await sessionStore.get(sessionId))) {
            socket.destroy();
            return;
        }

        websocketServer.handleUpgrade(req, socket, head, (websocket) => {
            websocketServer.emit('connection', websocket, req);
        });
    });

    return {
        websocketServer,
        pipelines,
    };
}

module.exports = { createRealtimeGateway };
