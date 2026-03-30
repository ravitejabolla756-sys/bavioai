/**
 * middleware/auth.js
 * Bavio.ai — JWT Authentication Middleware
 *
 * Reads:  Authorization: Bearer <token>
 * Writes: req.user = { business_id, email }
 *
 * Rejects:
 *  - Missing token         → 401
 *  - Expired / invalid JWT → 401
 */

const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            error: 'Authentication required. Provide a valid Bearer token.',
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the business identity to the request — available in all route handlers
        req.user = {
            business_id: decoded.business_id,
            email: decoded.email,
        };

        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, error: 'Token expired. Please log in again.' });
        }
        return res.status(401).json({ success: false, error: 'Invalid token.' });
    }
}

module.exports = { authenticateJWT };
