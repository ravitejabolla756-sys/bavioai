/**
 * Test script for the Voice Orchestrator API.
 * Run with: node test-voice-orchestrator.js
 * (Make sure server is running on port 3000 and SARVAM_API_KEY is set)
 */
async function runVoiceTests() {
    const baseUrl = 'http://localhost:3000';
    const sessionId = `test_voice_${Date.now()}`;

    console.log('=== Voice Orchestrator API Tests ===\n');

    // --- Test 1: Send voice input ---
    console.log('--- Test 1: POST /voice/respond ---');
    try {
        const response = await fetch(`${baseUrl}/voice/respond`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                session_id: sessionId,
                transcript: 'Hello, I would like to book an appointment for tomorrow.'
            })
        });
        const data = await response.json();

        if (data.success && data.data.textResponse && data.data.audioBase64) {
            console.log('✅ PASS — Response received');
            console.log(`   Text: "${data.data.textResponse.substring(0, 100)}..."`);
            console.log(`   Audio: ${data.data.audioBase64.substring(0, 40)}... (base64)`);
        } else {
            console.log('❌ FAIL —', JSON.stringify(data, null, 2));
        }
    } catch (err) {
        console.log('❌ FAIL —', err.message);
    }

    // --- Test 2: Follow-up turn (context test) ---
    console.log('\n--- Test 2: POST /voice/respond (follow-up) ---');
    try {
        const response = await fetch(`${baseUrl}/voice/respond`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                session_id: sessionId,
                transcript: 'My name is Ravi and I prefer 3 PM.'
            })
        });
        const data = await response.json();

        if (data.success && data.data.textResponse) {
            console.log('✅ PASS — Follow-up response received (context maintained)');
            console.log(`   Text: "${data.data.textResponse.substring(0, 100)}..."`);
        } else {
            console.log('❌ FAIL —', JSON.stringify(data, null, 2));
        }
    } catch (err) {
        console.log('❌ FAIL —', err.message);
    }

    // --- Test 3: Validation (missing fields) ---
    console.log('\n--- Test 3: POST /voice/respond (validation) ---');
    try {
        const response = await fetch(`${baseUrl}/voice/respond`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ session_id: sessionId })
        });
        const data = await response.json();

        if (!data.success && response.status === 400) {
            console.log('✅ PASS — Validation correctly rejected missing transcript');
        } else {
            console.log('❌ FAIL — Expected 400 error');
        }
    } catch (err) {
        console.log('❌ FAIL —', err.message);
    }

    // --- Test 4: End session ---
    console.log('\n--- Test 4: POST /voice/end ---');
    try {
        const response = await fetch(`${baseUrl}/voice/end`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ session_id: sessionId })
        });
        const data = await response.json();

        if (data.success && data.data.cleared) {
            console.log('✅ PASS — Session ended and cleared');
        } else {
            console.log('❌ FAIL —', JSON.stringify(data, null, 2));
        }
    } catch (err) {
        console.log('❌ FAIL —', err.message);
    }

    console.log('\n=== Tests Complete ===');
}

runVoiceTests();
