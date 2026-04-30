const supabase = require('../database/db');

/**
 * Service to handle Database Operations for the AI Call System
 */
class AICallService {

    /**
     * Store the caller number and start time when a call comes in.
     */
    async createCall(callerNumber) {
        try {
            console.log(`[AICallService] Creating call record for: ${callerNumber}`);

            const { data, error } = await supabase
                .from('calls')
                .insert([{
                    caller_number: callerNumber,
                    started_at: new Date().toISOString()
                }])
                .select()
                .single();

            if (error) {
                console.error('[AICallService] Error inserting call:', error);
                throw error;
            }

            return data;
        } catch (error) {
            console.error('[AICallService] Exception in createCall:', error.message);
            throw error;
        }
    }

    /**
     * Update the existing call record with the end time and duration.
     */
    async endCall(callId, duration) {
        try {
            console.log(`[AICallService] Ending call: ${callId} with duration: ${duration}s`);

            const { data, error } = await supabase
                .from('calls')
                .update({
                    ended_at: new Date().toISOString(),
                    duration: duration
                })
                .eq('id', callId)
                .select()
                .single();

            if (error) {
                console.error('[AICallService] Error updating call end status:', error);
                throw error;
            }

            return data;
        } catch (error) {
            console.error('[AICallService] Exception in endCall:', error.message);
            throw error;
        }
    }

    /**
     * Fetch the most recent calls.
     */
    async getLatestCalls(limit = 50) {
        try {
            console.log(`[AICallService] Fetching latest ${limit} calls`);

            const { data, error } = await supabase
                .from('calls')
                .select('*')
                .order('started_at', { ascending: false })
                .limit(limit);

            if (error) {
                console.error('[AICallService] Error fetching latest calls:', error);
                throw error;
            }

            return data;
        } catch (error) {
            console.error('[AICallService] Exception in getLatestCalls:', error.message);
            throw error;
        }
    }
}

module.exports = new AICallService();
