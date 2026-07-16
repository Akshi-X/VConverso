const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const rateLimit = require('express-rate-limit');

// Rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per `window` (here, per 15 minutes)
  message: { success: false, message: 'Too many requests from this IP, please try again after 15 minutes.' }
});

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', authLimiter, authController.register);

// @route   POST /api/auth/login
// @desc    Login user & get token
// @access  Public
router.post('/login', authLimiter, authController.login);

// @route   POST /api/auth/google
// @desc    Authenticate / register user via Google ID token
// @access  Public
router.post('/google', authLimiter, authController.googleAuth);

// @route   GET /api/auth/verify-email/:token
// @desc    Verify user email
// @access  Public
router.get('/verify-email/:token', authController.verifyEmail);

// @route   POST /api/auth/forgot-password
// @desc    Send password reset email
// @access  Public
router.post('/forgot-password', authLimiter, authController.forgotPassword);

// @route   POST /api/auth/reset-password/:token
// @desc    Reset password
// @access  Public
router.post('/reset-password/:token', authLimiter, authController.resetPassword);

module.exports = router;
