const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const fs = require('fs');

// Ensure uploads directory exists
if (!fs.existsSync('uploads/avatars')) {
  fs.mkdirSync('uploads/avatars', { recursive: true });
}

// Configure multer for avatar uploads
const upload = multer({ 
  dest: 'uploads/avatars/',
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});

router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, userController.updateProfile);
router.post('/profile/avatar', authMiddleware, upload.single('avatar'), userController.uploadAvatar);
router.get('/leaderboard', authMiddleware, userController.getLeaderboard);

module.exports = router;
