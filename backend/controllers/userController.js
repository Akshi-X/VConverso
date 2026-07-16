const db = require('../config/db');

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const tableName = db.getDbType() === 'postgres' ? 'users' : 'User';
    
    const [users] = await db.query(
      `SELECT user_id, name, email, avatar, bio, native_language, learning_goal, email_verified, created_at 
       FROM ${tableName} WHERE user_id = ?`, 
      [userId]
    );

    if (!users || users.length === 0) return res.status(404).json({ success: false, message: 'User not found' });

    // Fetch badges
    const [badges] = await db.query(
      `SELECT b.*, ub.earned_at 
       FROM Badges b 
       JOIN UserBadges ub ON b.badge_id = ub.badge_id 
       WHERE ub.user_id = ?`,
      [userId]
    );

    const userProfile = { ...users[0], badges: badges || [] };
    res.status(200).json({ success: true, profile: userProfile });
  } catch (err) {
    console.error('[Get Profile Error]', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { name, bio, native_language, learning_goal } = req.body;
    const tableName = db.getDbType() === 'postgres' ? 'users' : 'User';

    await db.query(
      `UPDATE ${tableName} 
       SET name = COALESCE(?, name), 
           bio = COALESCE(?, bio), 
           native_language = COALESCE(?, native_language), 
           learning_goal = COALESCE(?, learning_goal) 
       WHERE user_id = ?`,
      [name, bio, native_language, learning_goal, userId]
    );

    res.status(200).json({ success: true, message: 'Profile updated' });
  } catch (err) {
    console.error('[Update Profile Error]', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.uploadAvatar = async (req, res) => {
  try {
    const userId = req.user.user_id;
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

    const avatarUrl = `/uploads/avatars/${req.file.filename}`;
    const tableName = db.getDbType() === 'postgres' ? 'users' : 'User';

    await db.query(`UPDATE ${tableName} SET avatar = ? WHERE user_id = ?`, [avatarUrl, userId]);

    res.status(200).json({ success: true, avatarUrl });
  } catch (err) {
    console.error('[Upload Avatar Error]', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getLeaderboard = async (req, res) => {
  try {
    const tableName = db.getDbType() === 'postgres' ? 'users' : 'User';
    // Join Scores and User table to get top XP
    const [leaderboard] = await db.query(
      `SELECT u.user_id, u.name, u.avatar, SUM(s.total_score) as total_xp 
       FROM ${tableName} u 
       JOIN Scores s ON u.user_id = s.user_id 
       GROUP BY u.user_id, u.name, u.avatar 
       ORDER BY total_xp DESC 
       LIMIT 50`
    );

    res.status(200).json({ success: true, leaderboard: leaderboard || [] });
  } catch (err) {
    console.error('[Get Leaderboard Error]', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
