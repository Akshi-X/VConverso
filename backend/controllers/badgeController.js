const db = require('../config/db');

exports.getAllBadges = async (req, res) => {
  try {
    const [badges] = await db.query('SELECT * FROM Badges');
    res.status(200).json({ success: true, badges: badges || [] });
  } catch (err) {
    console.error('[Get Badges Error]', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Helper function to award a badge (called internally)
exports.awardBadge = async (userId, badgeName) => {
  try {
    // 1. Get badge ID by name
    const [badges] = await db.query('SELECT badge_id FROM Badges WHERE name = ?', [badgeName]);
    if (!badges || badges.length === 0) return false;
    
    const badgeId = badges[0].badge_id;

    // 2. Check if user already has it
    const [existing] = await db.query('SELECT * FROM UserBadges WHERE user_id = ? AND badge_id = ?', [userId, badgeId]);
    if (existing && existing.length > 0) return false; // Already has badge
    
    // 3. Award badge
    await db.query('INSERT INTO UserBadges (user_id, badge_id) VALUES (?, ?)', [userId, badgeId]);
    return true; // Newly awarded
  } catch (err) {
    console.error('[Award Badge Error]', err);
    return false;
  }
};
