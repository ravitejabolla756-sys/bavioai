const supabase = require('../database/db');
const axios = require('axios');
const { DEFAULT_SYSTEM_PROMPT } = require('../utils/defaultPrompt');

async function createAssistant({ client_id, name, system_prompt }) {
    const prompt = system_prompt || DEFAULT_SYSTEM_PROMPT;
    const vapiKey = process.env.VAPI_API_KEY;
    let vapiAssistantId = null;

    if (vapiKey) {
        const vapiRes = await axios.post(
            'https://api.vapi.ai/assistant',
            {
                name,
                voice: { provider: '11labs', voiceId: 'burt' },
                model: {
                    provider: 'openai',
                    model: 'gpt-4',
                    messages: [{ role: 'system', content: prompt }]
                },
                firstMessage: 'Hello! Thank you for calling. How can I help you today?'
            },
            { headers: { Authorization: `Bearer ${vapiKey}`, 'Content-Type': 'application/json' } }
        );
        vapiAssistantId = vapiRes.data.id;
    } else {
        vapiAssistantId = `mock_vapi_${Date.now()}`;
    }

    const { data, error } = await supabase
        .from('assistants')
        .insert([{
            client_id,
            name,
            system_prompt: prompt,
            vapi_assistant_id: vapiAssistantId
        }])
        .select()
        .single();

    if (error) throw error;
    return data;
}

async function updateAssistant({ assistant_id, name, system_prompt }) {
    const payload = {};
    if (name !== undefined) payload.name = name;
    if (system_prompt !== undefined) payload.system_prompt = system_prompt;

    if (Object.keys(payload).length === 0) {
        throw new Error('No fields to update');
    }

    payload.updated_at = new Date().toISOString();

    const { data: assistant, error } = await supabase
        .from('assistants')
        .update(payload)
        .eq('id', assistant_id)
        .select()
        .single();

    if (error) {
        if (error.code === 'PGRST116') throw new Error('Assistant not found');
        throw error;
    }

    // Sync updated prompt to VAPI if api key is available
    const vapiKey = process.env.VAPI_API_KEY;
    if (vapiKey && assistant.vapi_assistant_id && !assistant.vapi_assistant_id.startsWith('mock_')) {
        try {
            await axios.patch(
                `https://api.vapi.ai/assistant/${assistant.vapi_assistant_id}`,
                {
                    ...(name && { name }),
                    ...(system_prompt && {
                        model: {
                            provider: 'openai',
                            model: 'gpt-4',
                            messages: [{ role: 'system', content: system_prompt }]
                        }
                    })
                },
                { headers: { Authorization: `Bearer ${vapiKey}`, 'Content-Type': 'application/json' } }
            );
        } catch (err) {
            console.error('Failed to sync assistant update to VAPI:', err.message);
        }
    }

    return assistant;
}

async function deleteAssistant(assistant_id) {
    // Remove from VAPI first
    const { data: assistant, error: fetchError } = await supabase
        .from('assistants')
        .select('*')
        .eq('id', assistant_id)
        .single();

    if (fetchError) {
        if (fetchError.code === 'PGRST116') throw new Error('Assistant not found');
        throw fetchError;
    }

    const vapiKey = process.env.VAPI_API_KEY;

    if (vapiKey && assistant.vapi_assistant_id && !assistant.vapi_assistant_id.startsWith('mock_')) {
        try {
            await axios.delete(
                `https://api.vapi.ai/assistant/${assistant.vapi_assistant_id}`,
                { headers: { Authorization: `Bearer ${vapiKey}` } }
            );
        } catch (err) {
            console.error('Failed to delete assistant from VAPI:', err.message);
        }
    }

    // Unlink phone numbers that reference this assistant
    await supabase
        .from('phone_numbers')
        .update({ assistant_id: null })
        .eq('assistant_id', assistant_id);

    // Delete from database
    const { error: deleteError } = await supabase
        .from('assistants')
        .delete()
        .eq('id', assistant_id);

    if (deleteError) throw deleteError;

    return { message: 'Assistant deleted successfully' };
}

async function getAssistantById(assistant_id) {
    const { data, error } = await supabase
        .from('assistants')
        .select('*')
        .eq('id', assistant_id)
        .single();

    if (error) {
        if (error.code === 'PGRST116') throw new Error('Assistant not found');
        throw error;
    }
    return data;
}

async function getAssistantsForClient(client_id) {
    const { data, error } = await supabase
        .from('assistants')
        .select('*')
        .eq('client_id', client_id)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
}

module.exports = {
    createAssistant,
    updateAssistant,
    deleteAssistant,
    getAssistantById,
    getAssistantsForClient
};
