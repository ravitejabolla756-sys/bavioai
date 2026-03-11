const supabase = require('../database/db');
const providerFactory = require('../providers/index');

const COST_PER_MINUTE = 0.05; // $0.05 per minute

async function processCallEnd({ providerCallId, phoneNumberId, callerNumber, durationSeconds, provider }) {
    const durationMinutes = Math.ceil(durationSeconds / 60);
    const cost = parseFloat((durationMinutes * COST_PER_MINUTE).toFixed(4));

    // Insert call record
    const { data: call, error: callErr } = await supabase
        .from('calls')
        .insert([{
            phone_number_id: phoneNumberId,
            provider_call_id: providerCallId,
            caller_number: callerNumber,
            call_status: 'completed',
            duration: durationSeconds,
            cost: cost
        }])
        .select()
        .single();
    if (callErr) throw callErr;

    // Get client_id from phone_numbers
    const { data: numData, error: numErr } = await supabase
        .from('phone_numbers')
        .select('client_id')
        .eq('id', phoneNumberId)
        .single();

    if (numErr && numErr.code !== 'PGRST116') throw numErr;
    const clientId = numData ? numData.client_id : null;

    if (clientId) {
        // Insert usage log
        const { error: logErr } = await supabase
            .from('usage_logs')
            .insert([{
                client_id: clientId,
                call_id: call.id,
                minutes_used: durationMinutes,
                cost: cost
            }]);
        if (logErr) throw logErr;

        // Update client usage_minutes using an RPC or getting current then updating.
        // We will fetch and update since Supabase vanilla client doesn't support increment directly w/o RPC
        const { data: clientData, error: clientErr } = await supabase
            .from('clients')
            .select('usage_minutes')
            .eq('id', clientId)
            .single();

        if (!clientErr && clientData) {
            await supabase
                .from('clients')
                .update({ usage_minutes: (clientData.usage_minutes || 0) + durationMinutes })
                .eq('id', clientId);
        }
    }

    return call;
}

module.exports = { processCallEnd, COST_PER_MINUTE };
