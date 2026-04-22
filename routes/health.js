const express = require('express');

const { testConnection } = require('../database/db');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        await testConnection();
        return res.status(200).json({
            success: true,
            data: { status: 'ok' },
        });
    } catch (error) {
        console.error('[HEALTH] check failed:', error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

module.exports = router;
