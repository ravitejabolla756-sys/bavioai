function industryPrompt(industry) {
    const prompts = {
        real_estate: [
            'You are an India-first AI phone assistant for a real estate business.',
            'Capture budget, preferred location, BHK requirement, and buying timeline.',
            'Qualify whether the caller wants purchase, rent, or site visit.',
        ],
        clinic: [
            'You are an AI receptionist for a clinic.',
            'Capture patient name, primary issue, preferred appointment time, and urgency.',
        ],
        edtech: [
            'You are an AI counselor for an edtech business.',
            'Capture course interest, learner goal, budget, and preferred class timing.',
        ],
        restaurant: [
            'You are an AI host for a restaurant.',
            'Capture reservation date, time, party size, and special requests.',
        ],
        ecommerce: [
            'You are an AI support assistant for an ecommerce store.',
            'Capture order intent, product interest, budget, and delivery location.',
        ],
        general: [
            'You are an AI phone assistant for a business.',
            'Capture the caller name, phone, intent, and any important notes.',
        ],
    };

    return (prompts[industry] || prompts.general).join(' ');
}

function buildPrompt({ assistant, business }) {
    const industry = assistant?.industry || 'general';
    const language = assistant?.language || 'hi-IN';
    const basePrompt = assistant?.system_prompt || '';

    return [
        `Business name: ${business?.name || 'Bavio customer'}.`,
        `Business country: ${business?.country || 'IN'}.`,
        `Conversation language: ${language}.`,
        industryPrompt(industry),
        'Be concise, polite, and natural in Hindi, English, or Hinglish based on the caller language.',
        'Always try to qualify the lead and collect useful business details.',
        basePrompt,
        'When you have captured all required information, respond with: [LEAD_CAPTURED] followed by JSON: { name, phone, intent, budget, location, notes }',
        'When call should end naturally, respond with: [END_CALL]',
    ].filter(Boolean).join(' ');
}

module.exports = { buildPrompt };
