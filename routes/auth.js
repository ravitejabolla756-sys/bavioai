/**
 * routes/auth.js
 * Bavio.ai — Auth routes
 *
 * POST  /auth/signup  — register a new business
 * POST  /auth/login   — log in and receive JWT
 * GET   /auth/me      — get current business info (protected)
 */

const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { authenticateJWT } = require('../middleware/auth');

// Public routes
router.post('/signup', authController.signup);
router.post('/login',  authController.login);

// Protected route — requires valid JWT
router.get('/me', authenticateJWT, authController.me);

module.exports = router;
