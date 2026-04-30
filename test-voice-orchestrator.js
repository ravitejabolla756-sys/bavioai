/**
 * Test script for the Voice Orchestrator API.
 * Run with: node test-voice-orchestrator.js
 * (Make sure server is running on port 3000 and SARVAM_API_KEY is set)
 */
async function runVoiceTests() {
    const baseUrl = 'http://localhost:3000';
    let sessionId = null;

    console.log('=== Voice Orchestrator - Full Call Simulation ===\n');

    // --- Step 1: Initial Turn (starts session) ---
    console.log('--- Step 1: POST /voice/respond (Initial) ---');
    try {
        const response = await fetch(`${baseUrl}/voice/respond`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                transcript: 'Hello, I want to book an appointment'
            })
        });
        const data = await response.json();

        if (data.sessionId && (data.text || data.audio)) {
            sessionId = data.sessionId;
            console.log('✅ PASS — Session created:', sessionId);
            console.log(`   AI Text: "${data.text ? data.text.substring(0, 60) : 'N/A'}..."`);
        } else {
            console.log('❌ FAIL —', JSON.stringify(data, null, 2));
            return; // Stop if initial fails
        }
    } catch (err) {
        console.log('❌ FAIL —', err.message);
        return;
    }

    // --- Step 2: Follow-up Turn (maintains context) ---
    console.log('\n--- Step 2: POST /voice/respond (Follow-up) ---');
    try {
        const response = await fetch(`${baseUrl}/voice/respond`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                sessionId: sessionId,
                transcript: 'My name is Ravi'
            })
        });
        const data = await response.json();

        if (data.sessionId === sessionId && data.text) {
            console.log('✅ PASS — Follow-up succeeded for session:', sessionId);
            console.log(`   AI Text: "${data.text.substring(0, 60)}..."`);
        } else {
            console.log('❌ FAIL —', JSON.stringify(data, null, 2));
        }
    } catch (err) {
        console.log('❌ FAIL —', err.message);
    }

    // --- Step 3: End Call ---
    console.log('\n--- Step 3: POST /voice/end ---');
    try {
        const response = await fetch(`${baseUrl}/voice/end`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId: sessionId })
        });
        const data = await response.json();

        if (data.status === 'session ended') {
            console.log('✅ PASS — Session ended successfully');
        } else {
            console.log('❌ FAIL —', JSON.stringify(data, null, 2));
        }
    } catch (err) {
        console.log('❌ FAIL —', err.message);
    }

    console.log('\n=== Simulation Complete ===');
}

runVoiceTests();
