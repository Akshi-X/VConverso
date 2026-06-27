const express = require('express');
const router = express.Router();
const translateController = require('../controllers/translateController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST /api/translate
// @desc    Translate text between Spanish, English, French, and German
// @access  Private (Requires JWT token)
router.post('/', authMiddleware, translateController.translateText);

module.exports = router;
