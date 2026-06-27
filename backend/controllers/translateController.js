const db = require('../config/db');

const PHONETIC_DICTIONARY = {
  // Spanish
  'hola': 'OH-lah',
  'gracias': 'GRAH-syahs',
  'buenos días': 'BWEH-nohs DEE-ahs',
  'buenos dias': 'BWEH-nohs DEE-ahs',
  'buenas tardes': 'BWEH-nahs TAR-dehs',
  'buenas noches': 'BWEH-nahs NOH-chehs',
  'cómo estás': 'KOH-moh ehs-TAHS',
  'como estas': 'KOH-moh ehs-TAHS',
  'de nada': 'deh NAH-dah',
  'por favor': 'pohr fah-VOHR',
  'adiós': 'ah-DYOHS',
  'adios': 'ah-DYOHS',
  'lo siento': 'loh SYEHN-toh',
  'sí': 'see',
  'si': 'see',
  'no': 'noh',
  'te amo': 'teh AH-moh',
  '¿cómo te llamas?': 'KOH-moh teh YAH-mahs',
  'como te llamas': 'KOH-moh teh YAH-mahs',
  'me llamo': 'meh YAH-moh',
  
  // French
  'bonjour': 'bohn-ZHOOR',
  'merci': 'mair-SEE',
  's\'il vous plaît': 'seel voo PLEH',
  'sil vous plait': 'seel voo PLEH',
  'de rien': 'duh RYAHn',
  'au revoir': 'oh ruh-VWAR',
  'oui': 'wee',
  'non': 'nohn',
  'je t\'aime': 'zhuh TEM',
  'je taime': 'zhuh TEM',
  'comment ça va': 'koh-mahn sah VAH',
  'comment ca va': 'koh-mahn sah VAH',
  'enchanté': 'ahn-shahn-TAY',
  'enchante': 'ahn-shahn-TAY',
  
  // German
  'hallo': 'HAH-loh',
  'danke': 'DAHN-kuh',
  'bitte': 'BIT-uh',
  'guten tag': 'GOO-ten TAHK',
  'auf wiedersehen': 'owf VEE-der-zayn',
  'ja': 'yah',
  'nein': 'nine',
  'ich liebe dich': 'ikh LEE-buh dikh',
  'wie geht es dir': 'vee gayt es deer',
  'wie gehts': 'vee gayts'
};

exports.translateText = async (req, res) => {
  const { text, from, to } = req.body;

  if (!text || !from || !to) {
    return res.status(400).json({
      success: false,
      message: 'Please provide text, from, and to parameters.'
    });
  }

  try {
    // Request translation (dt=t) and romanization/transliteration (dt=rm)
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(from)}&tl=${encodeURIComponent(to)}&dt=t&dt=rm&q=${encodeURIComponent(text)}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Google Translate API responded with status ${response.status}`);
    }
    
    const data = await response.json();
    
    let translatedText = '';
    let googlePronunciation = '';
    
    if (data && data[0]) {
      data[0].forEach(item => {
        if (item[0]) {
          translatedText += item[0];
        }
        // Google Translate returns transliteration/pronunciation in item[2] of the metadata array
        if (item[0] === null && item[2]) {
          googlePronunciation += item[2];
        }
      });
    }

    // Determine pronunciation
    let pronunciation = '';
    const cleanOutput = translatedText.trim().toLowerCase().replace(/[¿?¡!.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    
    if (PHONETIC_DICTIONARY[cleanOutput]) {
      pronunciation = PHONETIC_DICTIONARY[cleanOutput];
    } else if (googlePronunciation) {
      pronunciation = googlePronunciation;
    } else {
      // Fallback: if translating to non-English and no pronunciation was returned, use translated text
      pronunciation = to !== 'en' ? translatedText : '';
    }

    // Update daily challenge translations count
    const userId = req.user ? req.user.user_id : null;
    if (userId) {
      try {
        const todayStr = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
        const [existing] = await db.query(
          'SELECT translations_count, last_activity_date FROM DailyChallenge WHERE user_id = ? LIMIT 1',
          [userId]
        );

        if (existing && existing.length > 0) {
          const row = existing[0];
          if (row.last_activity_date === todayStr) {
            const newCount = (row.translations_count || 0) + 1;
            await db.query(
              'UPDATE DailyChallenge SET translations_count = ? WHERE user_id = ?',
              [newCount, userId]
            );
          } else {
            await db.query(
              'UPDATE DailyChallenge SET translations_count = 1, last_activity_date = ? WHERE user_id = ?',
              [todayStr, userId]
            );
          }
        } else {
          await db.query(
            'INSERT INTO DailyChallenge (user_id, translations_count, last_activity_date, total_bonus_xp, last_claimed_at) VALUES (?, 1, ?, 0, NULL)',
            [userId, todayStr]
          );
        }
      } catch (dbErr) {
        console.error('[Translation Daily Tracker Error]:', dbErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      translatedText,
      pronunciation,
      from,
      to
    });
  } catch (error) {
    console.error('[Translation Error]:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to perform translation.',
      error: error.message
    });
  }
};
