const db = require('../config/db');

const ESSAY_TOPICS = [
  "essay structure & transitions",
  "mi familia",
  "mi equipo favorito",
  "mi casa",
  "mi universidad",
  "mi ciudad",
  "essay writing"
];

const isEssay = (name) => ESSAY_TOPICS.includes(name.trim().toLowerCase());

/**
 * Checks if a given topic's quiz is locked for a specific user.
 * 
 * Rules:
 * 1. Standard learning modules quiz unlocks sequentially. First module is always unlocked.
 * 2. Essay Writing modules quiz unlocks once Module 20 (index 19 in standard modules) is passed with >= 65%.
 */
async function isTopicLocked(userId, topicId) {
  try {
    // 1. Find language_id for this topic
    const [topicRes] = await db.query(
      'SELECT language_id FROM Topics WHERE topic_id = ?',
      [topicId]
    );
    if (!topicRes || topicRes.length === 0) {
      return true; // Lock if topic doesn't exist
    }
    const languageId = topicRes[0].language_id;

    // 2. Fetch all topics with their quizzes and the user's best attempts
    const [topics] = await db.query(
      `SELECT 
        t.topic_id, 
        t.topic_name,
        q.total_marks,
        MAX(a.score) as best_score
      FROM Topics t
      LEFT JOIN Quizzes q ON t.topic_id = q.topic_id
      LEFT JOIN Attempts a ON q.quiz_id = a.quiz_id AND a.user_id = ?
      WHERE t.language_id = ?
      GROUP BY t.topic_id, t.topic_name, q.total_marks
      ORDER BY t.topic_id ASC`,
      [userId, languageId]
    );

    // 3. Separate standard vs essay topics
    const standardTopics = topics.filter(t => !isEssay(t.topic_name));

    // Find the target topic to check
    const targetTopic = topics.find(t => t.topic_id === parseInt(topicId));
    if (!targetTopic) return true;

    // 4. Determine lock status based on type
    if (isEssay(targetTopic.topic_name)) {
      // Essay Writing: unlocks once Module 20 is completed
      // In Spanish, standardTopics.length is 20, so we check standardTopics[19]
      // In other languages we check the last standard topic
      const thresholdIndex = Math.min(19, standardTopics.length - 1);
      if (thresholdIndex < 0) {
        return false; // No standard topics to block it
      }
      
      const milestoneTopic = standardTopics[thresholdIndex];
      const milestoneMarks = milestoneTopic.total_marks;
      const milestoneBest = milestoneTopic.best_score;
      
      if (milestoneMarks !== null && milestoneMarks > 0) {
        if (milestoneBest !== null) {
          const pct = (milestoneBest / milestoneMarks) * 100;
          return pct < 65; // Locked if score is less than 65%
        }
        return true; // Locked if no attempt
      }
      return false; // Unlocked if no quiz on milestone
    } else {
      // Standard learning module: sequential unlock
      const targetIndex = standardTopics.findIndex(t => t.topic_id === parseInt(topicId));
      if (targetIndex <= 0) {
        return false; // First standard topic is always unlocked
      }
      
      // Check the immediately preceding standard topic
      const prevTopic = standardTopics[targetIndex - 1];
      const prevMarks = prevTopic.total_marks;
      const prevBest = prevTopic.best_score;
      
      if (prevMarks !== null && prevMarks > 0) {
        if (prevBest !== null) {
          const pct = (prevBest / prevMarks) * 100;
          return pct < 65; // Locked if previous score is less than 65%
        }
        return true; // Locked if no attempt
      }
      return false; // Unlocked if previous topic had no quiz
    }
  } catch (err) {
    console.error('Error checking topic lock status:', err.message);
    return true; // Safe fallback is locked
  }
}

module.exports = {
  isTopicLocked,
  isEssay
};
