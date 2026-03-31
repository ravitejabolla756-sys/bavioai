require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { generalLimiter, apiLimiter } = require('./middleware/rateLimit');

const supabase = require('./database/db');

// ------- Database Verification -------
async function verifySupabaseConnection() {
    try {
        // Query minimal data via supabase client to verify connection
        // Using 'calls' table as it was recently created in the AI schema
        const { data, error } = await supabase.from('calls').select('id').limit(1);
        if (error) throw error;
        console.log('Supabase JS Client connection OK (Verified via "calls" table)');
    } catch (error) {
        console.error('Supabase JS Client connection failed:', error.message);
    }
}

verifySupabaseConnection();

const app = express();
const PORT = process.env.PORT || 3000;

// ------- Global Middleware -------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(generalLimiter);

// ------- Test Database Route -------
app.get('/test-db', async (req, res) => {
    try {
        const { data: call, error } = await supabase
            .from('calls')
            .insert({
                caller_number: '+18005550000',
                started_at: new Date().toISOString()
            })
            .select()
            .single();

        if (error) throw error;

        res.status(200).json({
            success: true,
            message: "Test call inserted",
            data: call
        });
    } catch (err) {
        console.error('Test DB Route Error:', err);
        res.status(500).json({
            success: false,
            message: "Failed to insert test call",
            error: err.message
        });
    }
});

// ------- AI Call Start Route -------
app.post('/calls/start', async (req, res) => {
    try {
        const { phone_number, call_id } = req.body;

        if (!phone_number || !call_id) {
            return res.status(400).json({
                success: false,
                message: "phone_number and call_id are required"
            });
        }

        const { data: call, error } = await supabase
            .from('calls')
            .insert({
                phone_number,
                call_id,
                status: 'started',
                created_at: new Date().toISOString()
            })
            .select()
            .single();

        if (error) throw error;

        res.status(201).json({
            success: true,
            message: "Call record created",
            data: call
        });
    } catch (err) {
        console.error('Calls Start Route Error:', err);
        res.status(500).json({
            success: false,
            message: "Failed to create call record",
            error: err.message
        });
    }
});

// ------- AI Call Transcript Route -------
app.post('/calls/transcript', async (req, res) => {
    try {
        const { call_id, transcript } = req.body;

        if (!call_id || !transcript) {
            return res.status(400).json({
                success: false,
                message: "call_id and transcript are required"
            });
        }

        const { data: record, error } = await supabase
            .from('transcripts')
            .insert({
                call_id,
                transcript,
                created_at: new Date().toISOString()
            })
            .select()
            .single();

        if (error) throw error;

        res.status(201).json({
            success: true,
            message: "Transcript recorded",
            data: record
        });
    } catch (err) {
        console.error('Calls Transcript Route Error:', err);
        res.status(500).json({
            success: false,
            message: "Failed to record transcript",
            error: err.message
        });
    }
});

// ------- Fetch Transcripts (FOR VERIFICATION) -------
app.get('/calls/transcripts', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('transcripts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        res.status(200).json({
            success: true,
            count: data.length,
            data: data
        });
    } catch (err) {
        console.error('Fetch Transcripts Error:', err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch transcripts",
            error: err.message
        });
    }
});

// ------- AI Call Update Route -------
app.post('/calls/update', async (req, res) => {
    try {
        const { call_id, status, duration } = req.body;

        if (!call_id) {
            return res.status(400).json({
                success: false,
                message: "call_id is required"
            });
        }

        const updateData = {
            ended_at: new Date().toISOString()
        };
        if (status) updateData.status = status;
        if (duration) updateData.duration = duration;

        const { data: call, error } = await supabase
            .from('calls')
            .update(updateData)
            .eq('call_id', call_id)
            .select()
            .single();

        if (error) throw error;

        res.status(200).json({
            success: true,
            message: "Call record updated",
            data: call
        });
    } catch (err) {
        console.error('Calls Update Route Error:', err);
        res.status(500).json({
            success: false,
            message: "Failed to update call record",
            error: err.message
        });
    }
});

// ------- API Routes -------
const clientsRoutes = require('./routes/clients');
const assistantsRoutes = require('./routes/assistants');
const numbersRoutes = require('./routes/numbers');
const callsRoutes = require('./routes/calls');
const usageRoutes = require('./routes/usage');
const telephonyRoutes = require('./routes/telephony');
const aiCallsRoutes = require('./routes/aiCalls');
const voiceRoutes = require('./routes/voiceRoutes');
const twilioRoutes = require('./routes/twilioRoutes');

app.use('/clients', clientsRoutes);
app.use('/assistants', apiLimiter, assistantsRoutes);
app.use('/numbers', apiLimiter, numbersRoutes);
app.use('/calls', apiLimiter, callsRoutes);
app.use('/usage', apiLimiter, usageRoutes);
app.use('/telephony', telephonyRoutes);
app.use('/', aiCallsRoutes);
app.use('/voice', voiceRoutes);
app.use('/twilio', twilioRoutes);

// ------- Health Check -------
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', service: 'Bavio AI Backend', version: '2.0.0' });
});

// ------- Start Server -------
app.listen(PORT, () => {
    console.log(`Bavio AI Backend running on port ${PORT}`);
});

module.exports = app;
