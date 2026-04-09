const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
    try {
        const authHeader = req.headers.authorization || '';

        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, error: 'Authentication required' });
        }

        const token = authHeader.slice(7).trim();

        if (!token) {
            return res.status(401).json({ success: false, error: 'Authentication required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
            id: decoded.id,
            email: decoded.email,
        };

        return next();
    } catch (error) {
        console.error('[AUTH] verify: failed', error.message);
        return res.status(401).json({
            success: false,
            error: error.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid token',
        });
    }
}

module.exports = { requireAuth };
