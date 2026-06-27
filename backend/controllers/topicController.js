const db = require('../config/db');

/**
 * Fetch all topics for a selected language
 * GET /api/topics/:language_id
 */
exports.getTopicsByLanguage = async (req, res) => {
  const { language_id } = req.params;

  try {
    // 1. Fetch language details first to confirm it exists
    const [langInfo] = await db.query(
      'SELECT * FROM Language WHERE language_id = ?',
      [language_id]
    );

    if (!langInfo || langInfo.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Selected language not found.'
      });
    }

    const userId = req.user.user_id;

    // 2. Fetch topics with their quizzes and the user's best attempts
    const [topicsWithQuiz] = await db.query(
      `SELECT 
        t.topic_id, 
        t.topic_name, 
        t.topic_description, 
        t.language_id,
        q.quiz_id,
        q.total_marks,
        MAX(a.score) as best_score
      FROM Topics t
      LEFT JOIN Quizzes q ON t.topic_id = q.topic_id
      LEFT JOIN Attempts a ON q.quiz_id = a.quiz_id AND a.user_id = ?
      WHERE t.language_id = ?
      GROUP BY t.topic_id, t.topic_name, t.topic_description, t.language_id, q.quiz_id, q.total_marks
      ORDER BY t.topic_id ASC`,
      [userId, language_id]
    );

    // 3. Separate standard vs essay topics in memory to calculate locks in one go
    const { isEssay } = require('../utils/lockCheck');
    const standardTopics = topicsWithQuiz.filter(t => !isEssay(t.topic_name));

    // Find if Module 20 (index 19 in standard modules) is completed
    const thresholdIndex = Math.min(19, standardTopics.length - 1);
    let essayUnlocked = false;
    if (thresholdIndex >= 0) {
      const milestone = standardTopics[thresholdIndex];
      if (milestone.total_marks !== null && milestone.total_marks > 0 && milestone.best_score !== null) {
        const pct = (milestone.best_score / milestone.total_marks) * 100;
        if (pct >= 65) {
          essayUnlocked = true;
        }
      }
    }

    // Now map standard topics with sequential unlock rules
    let previousPassed = true;
    const topicsMap = {};
    
    for (let i = 0; i < standardTopics.length; i++) {
      const t = standardTopics[i];
      const isLocked = !previousPassed;
      topicsMap[t.topic_id] = isLocked;
      
      let passedQuiz = false;
      if (t.total_marks !== null && t.total_marks > 0) {
        if (t.best_score !== null) {
          const pct = (t.best_score / t.total_marks) * 100;
          if (pct >= 65) {
            passedQuiz = true;
          }
        }
      } else {
        passedQuiz = true;
      }
      previousPassed = !isLocked && passedQuiz;
    }

    const topics = topicsWithQuiz.map((topic) => {
      const bestScore = topic.best_score;
      const totalMarks = topic.total_marks;
      
      let quizPercentage = 0;
      if (totalMarks !== null && totalMarks > 0) {
        if (bestScore !== null) {
          quizPercentage = (bestScore / totalMarks) * 100;
        }
      } else {
        quizPercentage = 100;
      }
      
      let isQuizLocked = true;
      if (isEssay(topic.topic_name)) {
        isQuizLocked = !essayUnlocked;
      } else {
        isQuizLocked = !!topicsMap[topic.topic_id];
      }
      
      return {
        topic_id: topic.topic_id,
        language_id: topic.language_id,
        topic_name: topic.topic_name,
        topic_description: topic.topic_description,
        is_quiz_locked: isQuizLocked,
        is_locked: false, // General module access is always unlocked
        best_score: bestScore,
        total_marks: totalMarks,
        quiz_id: topic.quiz_id,
        quiz_percentage: quizPercentage
      };
    });

    res.status(200).json({
      success: true,
      language: langInfo[0],
      topics
    });
  } catch (err) {
    console.error('[Topics Error]:', err.message);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve topics for this language.'
    });
  }
};
