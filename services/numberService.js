const supabase = require('../database/db');
const providerFactory = require('../providers/index');

async function buyAndSaveNumber({ client_id, country, assistant_id }) {
    const providerName = country.toUpperCase() === 'IN' ? 'exotel' : 'twilio';
    const provider = providerFactory.getProvider(providerName);

    const phoneNumber = await provider.buyNumber(country);

    const webhookUrl = `${process.env.WEBHOOK_BASE_URL}/telephony/incoming`;
    // Attach the webhook to the purchased number (Twilio only for now)
    if (providerName === 'twilio') {
        const numbers = await provider.client?.incomingPhoneNumbers?.list?.({ phoneNumber, limit: 1 });
        if (numbers && numbers.length > 0) {
            await provider.client.incomingPhoneNumbers(numbers[0].sid).update({
                voiceUrl: webhookUrl,
                voiceMethod: 'POST'
            });
        }
    }

    const { data, error } = await supabase
        .from('phone_numbers')
        .insert([{
            client_id,
            assistant_id: assistant_id || null,
            phone_number: phoneNumber,
            provider: providerName,
            status: 'active'
        }])
        .select()
        .single();

    if (error) throw error;
    return data;
}

async function linkNumberToAssistant({ phone_number_id, assistant_id }) {
    const { data, error } = await supabase
        .from('phone_numbers')
        .update({ assistant_id })
        .eq('id', phone_number_id)
        .select()
        .single();

    if (error) {
        if (error.code === 'PGRST116') throw new Error('Phone number not found');
        throw error;
    }
    return data;
}

async function getNumbersForClient(client_id) {
    // using left join with assistants
    const { data, error } = await supabase
        .from('phone_numbers')
        .select(`
            *,
            assistants (
                name
            )
        `)
        .eq('client_id', client_id)
        .order('created_at', { ascending: false });

    if (error) throw error;

    // map the nested assistant name to top level for backward compatibility
    return data.map(pn => ({
        ...pn,
        assistant_name: pn.assistants ? pn.assistants.name : null,
        assistants: undefined
    }));
}

module.exports = { buyAndSaveNumber, linkNumberToAssistant, getNumbersForClient };
