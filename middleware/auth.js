const { requireAuth } = require('./authMiddleware');

module.exports = {
    authenticateJWT: requireAuth,
    requireAuth,
};
