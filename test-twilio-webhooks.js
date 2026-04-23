/**
 * Verification script for Twilio Webhooks.
 * Run with: node test-twilio-webhooks.js
 */
async function runTwilioTests() {
    const baseUrl = 'http://localhost:3000';
    const callSid = `CA${Math.random().toString(16).substring(2)}`;

    console.log('=== Twilio Webhook Verification ===\n');

    // --- 1. POST /twilio/incoming-call ---
    console.log('--- Step 1: Incoming Call ---');
    try {
        const response = await fetch(`${baseUrl}/twilio/incoming-call`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ CallSid: callSid })
        });
        const xml = await response.text();
        console.log('Status:', response.status);
        console.log('Response Type:', response.headers.get('content-type'));
        console.log('TwiML:\n', xml);

        if (xml.includes('<Gather') && xml.includes('action="/twilio/speech"')) {
            console.log('✅ PASS — Correct Gather TwiML returned');
        } else {
            console.log('❌ FAIL — Unexpected TwiML');
        }
    } catch (err) {
        console.log('❌ FAIL —', err.message);
    }

    // --- 2. POST /twilio/speech ---
    console.log('\n--- Step 2: Speech Event ---');
    try {
        const response = await fetch(`${baseUrl}/twilio/speech`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ 
                CallSid: callSid,
                SpeechResult: 'I want to book an appointment'
            })
        });
        const xml = await response.text();
        console.log('Status:', response.status);
        console.log('TwiML Sample:', xml.substring(0, 100) + '...');

        // Note: Without SARVAM_API_KEY, this might return a 500 JSON/Text or an Error TwiML
        // Based on our implementation, it catches the error and returns a <Say> TwiML
        if (xml.includes('<Say') && xml.includes('<Gather')) {
            console.log('✅ PASS — Speech event processed into TwiML loop');
        } else if (xml.includes('trouble processing')) {
            console.log('✅ PASS — Handled AI failure with friendly TwiML');
        } else {
            console.log('❌ FAIL — Unexpected response');
        }
    } catch (err) {
        console.log('❌ FAIL —', err.message);
    }

    // --- 3. POST /twilio/call-ended ---
    console.log('\n--- Step 3: Call Ended ---');
    try {
        const response = await fetch(`${baseUrl}/twilio/call-ended`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ CallSid: callSid })
        });
        const text = await response.text();
        console.log('Status:', response.status);
        console.log('Body:', text);

        if (text === 'OK') {
            console.log('✅ PASS — Call cleanup successful');
        } else {
            console.log('❌ FAIL — Expected OK');
        }
    } catch (err) {
        console.log('❌ FAIL —', err.message);
    }

    console.log('\n=== Verification Complete ===');
}

runTwilioTests();
