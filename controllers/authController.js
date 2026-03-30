/**
 * controllers/authController.js
 * Bavio.ai — Auth controller
 *
 * Responsibilities:
 *  - Validate inputs
 *  - Call authService
 *  - Sign JWTs
 *  - Return structured JSON responses
 *  - Handle errors with correct HTTP status codes
 */

const jwt = require('jsonwebtoken');
const authService = require('../services/authService');

// ---------------------------------------------------------------------------
// JWT helper
// ---------------------------------------------------------------------------
function signToken(business) {
    return jwt.sign(
        { business_id: business.id, email: business.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
}

// ---------------------------------------------------------------------------
// POST /auth/signup
// ---------------------------------------------------------------------------
async function signup(req, res) {
    try {
        const { name, email, phone, password } = req.body;

        // --- Input validation ---
        if (!name || !email || !phone || !password) {
            return res.status(400).json({
                success: false,
                error: 'name, email, phone, and password are all required.',
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, error: 'Invalid email format.' });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                error: 'Password must be at least 8 characters long.',
            });
        }

        // --- Create business ---
        const business = await authService.signupBusiness({ name, email, phone, password });
        const token = signToken(business);

        return res.status(201).json({
            success: true,
            message: 'Account created successfully.',
            token,
            business,
        });

    } catch (err) {
        if (err.code === 'DUPLICATE_EMAIL') {
            return res.status(409).json({ success: false, error: err.message });
        }
        if (err.code === 'DUPLICATE_PHONE') {
            return res.status(409).json({ success: false, error: err.message });
        }
        console.error('[authController.signup]', err.message, err.details || '');
        return res.status(500).json({ success: false, error: 'Internal server error during signup.', detail: err.message });
    }
}

// ---------------------------------------------------------------------------
// POST /auth/login
// ---------------------------------------------------------------------------
async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'email and password are required.' });
        }

        const business = await authService.loginBusiness(email, password);
        const token = signToken(business);

        return res.status(200).json({
            success: true,
            message: 'Login successful.',
            token,
            business,
        });

    } catch (err) {
        if (err.code === 'INVALID_CREDENTIALS') {
            return res.status(401).json({ success: false, error: err.message });
        }
        if (err.code === 'ACCOUNT_SUSPENDED') {
            return res.status(403).json({ success: false, error: err.message });
        }
        console.error('[authController.login]', err);
        return res.status(500).json({ success: false, error: 'Internal server error during login.' });
    }
}

// ---------------------------------------------------------------------------
// GET /auth/me  (protected)
// ---------------------------------------------------------------------------
async function me(req, res) {
    try {
        // req.user is attached by the JWT middleware
        const business = await authService.getBusinessById(req.user.business_id);

        return res.status(200).json({
            success: true,
            business,
        });

    } catch (err) {
        if (err.code === 'NOT_FOUND') {
            return res.status(404).json({ success: false, error: err.message });
        }
        console.error('[authController.me]', err);
        return res.status(500).json({ success: false, error: 'Internal server error.' });
    }
}

module.exports = { signup, login, me };
