function industryPrompt(industry) {
    const prompts = {
        real_estate: 'Capture: buyer budget, preferred location, BHK type, ready-to-move or under-construction, timeline.',
        clinic: 'Capture: patient name, phone, health issue, preferred appointment time.',
        edtech: 'Capture: student name, phone, course interest, current qualification, budget.',
        restaurant: 'Capture: customer name, phone, reservation date/time, party size.',
        general: 'Capture: caller name, phone, and reason for calling.',
    };

    return prompts[industry] || prompts.general;
}

function buildPrompt({ assistant, business }) {
    const businessName = business?.name || 'Bavio business';
    const language = assistant?.language || 'hi-IN';
    const industry = assistant?.industry || 'general';
    const customPrompt = String(assistant?.system_prompt || '').trim();

    return [
        `You are an AI voice assistant for ${businessName}.`,
        `Speak naturally in ${language} (Hindi/Hinglish/English).`,
        'Keep responses SHORT — max 2 sentences per turn.',
        'Be warm, helpful, and professional.',
        '',
        'When you have captured: name, phone, and at least one of (budget / intent / location / appointment_time), add to your response on a NEW LINE:',
        '[LEAD_CAPTURED]',
        '{"name":"...","phone":"...","intent":"...","budget":"...","location":"..."}',
        '',
        'When the conversation is naturally complete, add:',
        '[END_CALL]',
        '',
        industryPrompt(industry),
        customPrompt,
    ].filter(Boolean).join('\n');
}

module.exports = { buildPrompt };
