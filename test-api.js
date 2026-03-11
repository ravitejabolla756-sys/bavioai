async function runTests() {
    const baseUrl = 'http://localhost:3000';
    const testCallId = `test_${Date.now()}`;

    console.log('--- Phase 1: Starting Call ---');
    try {
        const startResponse = await fetch(`${baseUrl}/calls/start`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                phone_number: '+1234567890',
                call_id: testCallId
            })
        });
        const startData = await startResponse.json();
        console.log('Start Result:', JSON.stringify(startData, null, 2));

        console.log('\n--- Phase 2: Sending Transcript ---');
        const transcriptResponse = await fetch(`${baseUrl}/calls/transcript`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                call_id: testCallId,
                transcript: "This test was performed via the automated Node.js script."
            })
        });
        const transcriptData = await transcriptResponse.json();
        console.log('Transcript Result:', JSON.stringify(transcriptData, null, 2));

        console.log('\n--- Phase 3: Verifying Data ---');
        const verifyResponse = await fetch(`${baseUrl}/calls/transcripts`);
        const verifyData = await verifyResponse.json();
        console.log(`Success! Total transcripts in DB: ${verifyData.count}`);

    } catch (err) {
        console.error('Test Failed:', err.message);
        console.log('Make sure your server is running with "node server.js" first!');
    }
}

runTests();
