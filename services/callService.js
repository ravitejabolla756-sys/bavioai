const supabase = require('../database/db');

async function getCallsForClient(client_id) {
    const { data: phoneNumbers, error: phoneErr } = await supabase
        .from('phone_numbers')
        .select('id, phone_number, provider')
        .eq('client_id', client_id);

    if (phoneErr) throw phoneErr;
    if (!phoneNumbers || phoneNumbers.length === 0) return [];

    const phoneNumberIds = phoneNumbers.map(pn => pn.id);

    const { data: calls, error: callsErr } = await supabase
        .from('calls')
        .select('*')
        .in('phone_number_id', phoneNumberIds)
        .order('created_at', { ascending: false });

    if (callsErr) throw callsErr;

    // Map phone number details to the calls
    const pnMap = phoneNumbers.reduce((acc, pn) => {
        acc[pn.id] = pn;
        return acc;
    }, {});

    return calls.map(c => ({
        ...c,
        phone_number: pnMap[c.phone_number_id]?.phone_number,
        provider: pnMap[c.phone_number_id]?.provider
    }));
}

async function getUsageForClient(client_id) {
    const { data: usageLogs, error: ulErr } = await supabase
        .from('usage_logs')
        .select(`
            *,
            calls (
                caller_number,
                duration,
                call_status
            )
        `)
        .eq('client_id', client_id)
        .order('created_at', { ascending: false });

    if (ulErr) throw ulErr;

    // Flatten logic for backward compatibility
    const mappedLogs = usageLogs.map(log => ({
        ...log,
        caller_number: log.calls?.caller_number,
        duration: log.calls?.duration,
        call_status: log.calls?.call_status,
        calls: undefined
    }));

    const { data: client, error: clErr } = await supabase
        .from('clients')
        .select('usage_minutes')
        .eq('id', client_id)
        .single();

    if (clErr && clErr.code !== 'PGRST116') throw clErr;

    // Calculate total cost manually
    const total_cost = usageLogs.reduce((acc, log) => acc + Number(log.cost || 0), 0);

    return {
        summary: {
            usage_minutes: client ? client.usage_minutes : 0,
            total_cost
        },
        logs: mappedLogs
    };
}

module.exports = { getCallsForClient, getUsageForClient };
