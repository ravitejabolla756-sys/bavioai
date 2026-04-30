const supabase = require('../database/db');

class CallsController {
    /**
     * POST /calls/start
     * Inserts a new call record with status "started".
     */
    async startCall(req, res) {
        try {
            const { phone_number, call_id } = req.body;

            if (!phone_number || !call_id) {
                return res.status(400).json({
                    success: false,
                    message: "phone_number and call_id are required in the request body."
                });
            }

            console.log(`[CallsController] Starting call: ${call_id} for ${phone_number}`);

            const { data, error } = await supabase
                .from('calls')
                .insert([{
                    phone_number: phone_number,
                    call_id: call_id,
                    status: 'started',
                    created_at: new Date().toISOString()
                }])
                .select()
                .single();

            if (error) {
                console.error('[CallsController] Supabase insert error:', error);
                throw error;
            }

            return res.status(201).json({
                success: true,
                message: "Call record created successfully.",
                data: data
            });

        } catch (error) {
            console.error('[CallsController] Exception in startCall:', error.message);
            return res.status(500).json({
                success: false,
                message: "Internal server error while starting call.",
                error: error.message
            });
        }
    }
}

module.exports = new CallsController();
