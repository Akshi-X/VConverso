const db = require('../config/db');

/**
 * Fetch progress analytics for a specific user
 * GET /api/progress/:user_id
 */
exports.getUserProgress = async (req, res) => {
  const { user_id } = req.params;

  try {
    // 1. Double check that user exists
    const [userInfo] = await db.query(
      'SELECT user_id, name, email FROM User WHERE user_id = ?',
      [user_id]
    );

    if (!userInfo || userInfo.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    // 2. Total quizzes attempted (unique quizzes) & Total attempts count (excluding English)
    const [attemptStats] = await db.query(
      `SELECT COUNT(a.attempt_id) as total_attempts, COUNT(DISTINCT a.quiz_id) as unique_quizzes 
       FROM Attempts a 
       JOIN Quizzes q ON a.quiz_id = q.quiz_id
       JOIN Topics t ON q.topic_id = t.topic_id
       JOIN Language l ON t.language_id = l.language_id
       WHERE a.user_id = ? AND LOWER(l.language_name) != 'english'`,
      [user_id]
    );

    const totalAttempts = attemptStats[0].total_attempts || 0;
    const uniqueQuizzesAttempted = attemptStats[0].unique_quizzes || 0;

    // 3. Average score across all attempts (excluding English)
    const [avgStats] = await db.query(
      `SELECT AVG(a.score) as avg_score 
       FROM Attempts a 
       JOIN Quizzes q ON a.quiz_id = q.quiz_id
       JOIN Topics t ON q.topic_id = t.topic_id
       JOIN Language l ON t.language_id = l.language_id
       WHERE a.user_id = ? AND LOWER(l.language_name) != 'english'`,
      [user_id]
    );
    const averageScore = avgStats[0].avg_score ? parseFloat(parseFloat(avgStats[0].avg_score).toFixed(2)) : 0.0;

    // 4. Overall Progress percentage (prefer non-English languages, but fall back to any language if needed)
    const [progressStats] = await db.query(
      `SELECT AVG(s.progress_percentage) as avg_progress 
       FROM Scores s 
       JOIN Language l ON s.language_id = l.language_id
       WHERE s.user_id = ? AND LOWER(l.language_name) != 'english'`,
      [user_id]
    );
    let overallProgress = progressStats[0].avg_progress;

    if (overallProgress === null || overallProgress === undefined) {
      const [fallbackProgress] = await db.query(
        `SELECT AVG(progress_percentage) as avg_progress 
         FROM Scores 
         WHERE user_id = ?`,
        [user_id]
      );
      overallProgress = fallbackProgress[0].avg_progress;
    }

    overallProgress = overallProgress ? parseFloat(parseFloat(overallProgress).toFixed(2)) : 0.0;

    // 5. Language-wise performance details (excluding English)
    const [languagePerformance] = await db.query(
      `SELECT 
        l.language_id, 
        l.language_name, 
        l.language_image,
        COALESCE(s.total_score, 0) as total_score, 
        COALESCE(s.progress_percentage, 0.0) as progress_percentage,
        (CASE WHEN s.user_id IS NOT NULL THEN 1 ELSE 0 END) as enrolled
      FROM Language l 
      LEFT JOIN Scores s ON l.language_id = s.language_id AND s.user_id = ?
      WHERE LOWER(l.language_name) != 'english'
      ORDER BY l.language_id ASC`,
      [user_id]
    );

    const [dailyChallengeRows] = await db.query(
      `SELECT total_bonus_xp, last_claimed_at, translations_count, last_activity_date
       FROM DailyChallenge
       WHERE user_id = ?
       LIMIT 1`,
      [user_id]
    );

    let dailyChallenge = {
      claimed: false,
      total_bonus_xp: 0,
      last_claimed_at: null,
      next_claim_at: null,
      translations_count: 0,
      completed: false
    };

    if (dailyChallengeRows && dailyChallengeRows.length > 0) {
      const row = dailyChallengeRows[0];
      const lastClaimedAt = row.last_claimed_at ? new Date(row.last_claimed_at) : null;
      const now = new Date();
      const timeSinceClaimMs = lastClaimedAt ? now.getTime() - lastClaimedAt.getTime() : Number.MAX_SAFE_INTEGER;
      const cooldownMs = 24 * 60 * 60 * 1000;
      const claimed = lastClaimedAt && timeSinceClaimMs < cooldownMs;
      const nextClaimAt = claimed ? new Date(lastClaimedAt.getTime() + cooldownMs).toISOString() : null;

      const todayStr = now.toISOString().slice(0, 10);
      const isTodayActivity = row.last_activity_date === todayStr;
      const count = isTodayActivity ? (row.translations_count || 0) : 0;

      dailyChallenge = {
        claimed,
        total_bonus_xp: row.total_bonus_xp || 0,
        last_claimed_at: row.last_claimed_at,
        next_claim_at: nextClaimAt,
        translations_count: count,
        completed: count >= 5
      };
    }

    // 6. Calculate user learning streak dynamically
    const [attemptDates] = await db.query(
      'SELECT attempt_date FROM Attempts WHERE user_id = ?',
      [user_id]
    );

    const [challengeDates] = await db.query(
      'SELECT last_claimed_at FROM DailyChallenge WHERE user_id = ?',
      [user_id]
    );

    const activeDates = new Set();

    attemptDates.forEach(row => {
      if (row.attempt_date) {
        const d = new Date(row.attempt_date);
        const localDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        activeDates.add(localDate);
      }
    });

    challengeDates.forEach(row => {
      if (row.last_claimed_at) {
        const d = new Date(row.last_claimed_at);
        const localDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        activeDates.add(localDate);
      }
    });

    let streakCount = 0;
    if (activeDates.size > 0) {
      const sortedDates = Array.from(activeDates).sort().reverse(); // Newest first
      const today = new Date();
      const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

      const parseLocalDate = (dateStr) => {
        const [y, m, d] = dateStr.split('-').map(Number);
        return new Date(y, m - 1, d);
      };

      // Streak is active if most recent activity was today or yesterday
      if (sortedDates[0] === todayStr || sortedDates[0] === yesterdayStr) {
        streakCount = 1;
        let currentDate = parseLocalDate(sortedDates[0]);
        
        for (let i = 1; i < sortedDates.length; i++) {
          const prevDate = new Date(currentDate);
          prevDate.setDate(prevDate.getDate() - 1);
          const prevDateStr = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}-${String(prevDate.getDate()).padStart(2, '0')}`;
          
          if (sortedDates[i] === prevDateStr) {
            streakCount++;
            currentDate = prevDate;
          } else {
            break;
          }
        }
      }
    }

    // 7. Recent quiz attempts (excluding English)
    const [recentAttempts] = await db.query(
      `SELECT 
        a.attempt_id, 
        a.attempt_date, 
        a.score, 
        q.quiz_title, 
        t.topic_name, 
        l.language_name 
      FROM Attempts a 
      JOIN Quizzes q ON a.quiz_id = q.quiz_id 
      JOIN Topics t ON q.topic_id = t.topic_id 
      JOIN Language l ON t.language_id = l.language_id 
      WHERE a.user_id = ? AND LOWER(l.language_name) != 'english'
      ORDER BY a.attempt_date DESC 
      LIMIT 5`,
      [user_id]
    );

    res.status(200).json({
      success: true,
      user: userInfo[0],
      analytics: {
        total_attempts: totalAttempts,
        unique_quizzes_attempted: uniqueQuizzesAttempted,
        average_score: averageScore,
        overall_progress_percentage: overallProgress,
        languages: languagePerformance,
        daily_challenge: dailyChallenge,
        recent_activity: recentAttempts,
        streak_count: streakCount
      }
    });

  } catch (err) {
    console.error('[Progress Dashboard Error]:', err.message);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve progress data.'
    });
  }
};

/**
 * Claim the daily XP challenge for the current user and persist the result.
 * POST /api/progress/daily-challenge/claim
 */
exports.claimDailyChallenge = async (req, res) => {
  const userId = req.user.user_id;
  const bonusXp = 150;

  try {
    const [existingRows] = await db.query(
      'SELECT total_bonus_xp, last_claimed_at, translations_count, last_activity_date FROM DailyChallenge WHERE user_id = ? LIMIT 1',
      [userId]
    );

    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);
    const cooldownMs = 24 * 60 * 60 * 1000;
    let nextClaimAt = null;

    if (!existingRows || existingRows.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Daily mission incomplete. You have only completed 0 / 5 translations today.'
      });
    }

    const existing = existingRows[0];
    const isTodayActivity = existing.last_activity_date === todayStr;
    const count = isTodayActivity ? (existing.translations_count || 0) : 0;

    if (count < 5) {
      return res.status(400).json({
        success: false,
        message: `Daily mission incomplete. You have only completed ${count} / 5 translations today.`
      });
    }

    const lastClaimedAt = existing.last_claimed_at ? new Date(existing.last_claimed_at) : null;
    const timeSinceLastClaim = lastClaimedAt ? now.getTime() - lastClaimedAt.getTime() : Number.MAX_SAFE_INTEGER;

    if (lastClaimedAt && timeSinceLastClaim < cooldownMs) {
      nextClaimAt = new Date(lastClaimedAt.getTime() + cooldownMs).toISOString();
      return res.status(400).json({
        success: false,
        message: `Daily XP can only be claimed once every 24 hours. Next claim available at ${nextClaimAt}.`,
        daily_challenge: {
          claimed: true,
          total_bonus_xp: existing.total_bonus_xp || 0,
          last_claimed_at: existing.last_claimed_at,
          next_claim_at: nextClaimAt,
          translations_count: count,
          completed: true
        }
      });
    }

    const newTotal = (existing.total_bonus_xp || 0) + bonusXp;
    await db.query(
      'UPDATE DailyChallenge SET total_bonus_xp = ?, last_claimed_at = ? WHERE user_id = ?',
      [newTotal, now.toISOString().replace('T', ' ').slice(0, 19), userId]
    );

    nextClaimAt = new Date(now.getTime() + cooldownMs).toISOString();
    return res.status(200).json({
      success: true,
      message: 'Daily challenge claimed successfully.',
      daily_challenge: {
        claimed: true,
        total_bonus_xp: newTotal,
        last_claimed_at: now.toISOString(),
        next_claim_at: nextClaimAt,
        translations_count: count,
        completed: true
      }
    });
  } catch (err) {
    console.error('[Claim Daily Challenge Error]:', err.message);
    res.status(500).json({
      success: false,
      message: 'Failed to claim the daily challenge.'
    });
  }
};
