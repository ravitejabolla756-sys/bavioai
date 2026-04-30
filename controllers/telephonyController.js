const supabase = require('../database/db');
const providerFactory = require('../providers/index');
const billingService = require('../services/billingService');

async function handleIncoming(req, res) {
    try {
        const body = req.body;

        // Detect the provider by looking at the body signature
        const isExotel = Boolean(body.CallSid && body.Status && body.From);
        const providerName = isExotel ? 'exotel' : 'twilio';
        const provider = providerFactory.getProvider(providerName);

        const callData = await provider.handleIncomingCall(req);
        const { providerCallId, callerNumber, calledNumber } = callData;

        // Look up the phone number record
        const { data: numData, error: numErr } = await supabase
            .from('phone_numbers')
            .select('*')
            .eq('phone_number', calledNumber)
            .single();

        if (numErr || !numData) {
            console.warn(`No phone_number record found for ${calledNumber}`);
        } else {
            const phoneNumberId = numData.id;

            // Query first to ignore conflict if call exists (upsert/on conflict ignore equivalent)
            const { data: existingCall } = await supabase
                .from('calls')
                .select('id')
                .eq('provider_call_id', providerCallId)
                .single();

            if (!existingCall) {
                // Insert initial call log (duration/cost will be updated by /status webhook)
                await supabase
                    .from('calls')
                    .insert([{
                        phone_number_id: phoneNumberId,
                        provider_call_id: providerCallId,
                        caller_number: callerNumber,
                        call_status: 'in-progress',
                        duration: 0,
                        cost: 0
                    }]);
            }
        }

        // Respond based on provider
        if (providerName === 'twilio') {
            res.set('Content-Type', 'text/xml');
            return res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?><Response><Say>Welcome to Bavio AI. Connecting you to your assistant.</Say></Response>`);
        }
        res.status(200).send('OK');
    } catch (err) {
        console.error('Incoming call error:', err);
        res.status(500).json({ error: err.message });
    }
}

async function handleStatus(req, res) {
    try {
        const body = req.body;
        const providerCallId = body.CallSid;
        const callStatus = body.CallStatus;
        const durationSeconds = parseInt(body.CallDuration || body.Duration || '0');

        if (!providerCallId) return res.status(400).json({ error: 'Missing CallSid' });

        // Find the call record
        const { data: call, error: callErr } = await supabase
            .from('calls')
            .select('*')
            .eq('provider_call_id', providerCallId)
            .single();

        if (callErr || !call) {
            return res.status(404).json({ error: 'Call not found' });
        }

        if (callStatus === 'completed' && durationSeconds > 0) {
            await billingService.processCallEnd({
                providerCallId,
                phoneNumberId: call.phone_number_id,
                callerNumber: call.caller_number,
                durationSeconds
            });
        } else {
            // Update the status only
            await supabase
                .from('calls')
                .update({ call_status: callStatus, duration: durationSeconds })
                .eq('provider_call_id', providerCallId);
        }

        res.status(200).send('OK');
    } catch (err) {
        console.error('Call status error:', err);
        res.status(500).json({ error: err.message });
    }
}

module.exports = { handleIncoming, handleStatus };
