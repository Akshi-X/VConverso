const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { OAuth2Client } = require('google-auth-library');
const crypto = require('crypto');

const JWT_SECRET = process.env.JWT_SECRET || 'language_learning_jwt_secret_token_key_2026';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

/**
 * Register a new user
 * POST /api/auth/register
 */
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide all required fields (name, email, password).' 
    });
  }

  try {
    // 1. Check if user already exists
    const [existingUsers] = await db.query(
      'SELECT * FROM User WHERE email = ?',
      [email]
    );

    if (existingUsers && existingUsers.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'A user with this email address already exists.' 
      });
    }

    // 2. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Generate verification token
    const verificationToken = crypto.randomBytes(20).toString('hex');

    // 4. Create user in the database
    let userId;
    if (db.getDbType() === 'postgres') {
      const [result] = await db.query(
        'INSERT INTO users (name, email, password, reset_token) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, email, hashedPassword, verificationToken]
      );
      userId = result.insertId || (result[0] && result[0].user_id);
    } else {
      const [result] = await db.query(
        'INSERT INTO User (name, email, password, reset_token) VALUES (?, ?, ?, ?)',
        [name, email, hashedPassword, verificationToken]
      );
      userId = result.insertId;
    }

    // Mock sending email
    console.log(`\n==============================================`);
    console.log(`✉️ MOCK EMAIL SENT TO: ${email}`);
    console.log(`🔗 Verification Link: http://localhost:5173/verify-email?token=${verificationToken}`);
    console.log(`==============================================\n`);

    // 4. Initialize Scores table entries for this user for all active languages (DISABLED for cinematic onboarding selection flow)
    /*
    const [languages] = await db.query('SELECT language_id FROM Language');
    for (const lang of languages) {
      await db.query(
        'INSERT INTO Scores (user_id, language_id, total_score, progress_percentage) VALUES (?, ?, 0, 0.0) ON DUPLICATE KEY UPDATE total_score = total_score',
        [userId, lang.language_id]
      ).catch(async (err) => {
        // Handle database specific behaviors: SQLite uses INSERT OR IGNORE, MySQL has ON DUPLICATE KEY.
        // If ON DUPLICATE KEY fails or is ignored due to SQLite fallback, we can catch and retry with simple insert/ignore
        await db.query(
          'INSERT OR IGNORE INTO Scores (user_id, language_id, total_score, progress_percentage) VALUES (?, ?, 0, 0.0)',
          [userId, lang.language_id]
        ).catch(() => {});
      });
    }
    */

    // 5. Generate JWT token
    const token = jwt.sign(
      { user_id: userId, name, email },
      JWT_SECRET,
      { expiresIn: '7d' } // Token lasts 7 days
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully!',
      token,
      user: {
        user_id: userId,
        name,
        email
      }
    });

  } catch (err) {
    console.error('[Registration Error]:', err.message);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during registration. Please try again.' 
    });
  }
};

/**
 * Login existing user
 * POST /api/auth/login
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide both email and password.' 
    });
  }

  try {
    // 1. Find user by email
    const [users] = await db.query(
      'SELECT * FROM User WHERE email = ?',
      [email]
    );

    if (!users || users.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid credentials. User not found.' 
      });
    }

    const user = users[0];

    // 2. Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid credentials. Password matches incorrectly.' 
      });
    }

    // 3. Generate JWT token
    const token = jwt.sign(
      { user_id: user.user_id, name: user.name, email: user.email, email_verified: user.email_verified },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      message: 'Logged in successfully!',
      token,
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.error('[Login Error]:', err.message);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during login. Please try again.' 
    });
  }
};

/**
 * Google OAuth sign-in
 * POST /api/auth/google
 * Body: { idToken }
 */
exports.googleAuth = async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ success: false, message: 'Missing idToken' });
  }

  try {
    const ticket = await googleClient.verifyIdToken({ idToken, audience: GOOGLE_CLIENT_ID || undefined });
    const payload = ticket.getPayload();

    const email = payload.email;
    const name = payload.name || '';

    // Check existing user
    const [users] = await db.query('SELECT * FROM User WHERE email = ?', [email]);

    let userId;

    if (users && users.length > 0) {
      userId = users[0].user_id;
    } else {
      // Create a new user with empty password (Google users won't use password login)
      const [result] = await db.query('INSERT INTO User (name, email, password) VALUES (?, ?, ?)', [name, email, '']);
      userId = result.insertId;
    }

    const token = jwt.sign({ user_id: userId, name, email }, JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      success: true,
      message: 'Google authentication successful',
      token,
      user: {
        user_id: userId,
        name,
        email
      }
    });
  } catch (err) {
    console.error('[Google Auth Error]:', err.message);
    console.error('[Google Auth Error Stack]:', err.stack);
    
    // Provide more specific error messages
    let errorMessage = 'Google authentication failed';
    
    if (err.message.includes('invalid_grant')) {
      errorMessage = 'Invalid or expired Google token';
    } else if (err.message.includes('audience')) {
      errorMessage = 'Token audience mismatch - verify your Google Client ID';
    } else if (err.message.includes('could not determine')) {
      errorMessage = 'Google Client ID not configured on server';
    }
    
    res.status(500).json({ success: false, message: errorMessage });
  }
};

/**
 * Verify Email
 * GET /api/auth/verify-email/:token
 */
exports.verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const tableName = db.getDbType() === 'postgres' ? 'users' : 'User';
    const [users] = await db.query(`SELECT * FROM ${tableName} WHERE reset_token = ?`, [token]);

    if (!users || users.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid or expired verification token.' });
    }

    await db.query(`UPDATE ${tableName} SET email_verified = 1, reset_token = NULL WHERE user_id = ?`, [users[0].user_id]);

    res.status(200).json({ success: true, message: 'Email verified successfully.' });
  } catch (err) {
    console.error('[Verify Email Error]:', err.message);
    res.status(500).json({ success: false, message: 'Server error during verification.' });
  }
};

/**
 * Forgot Password
 * POST /api/auth/forgot-password
 */
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ success: false, message: 'Please provide an email address.' });
  }

  try {
    const tableName = db.getDbType() === 'postgres' ? 'users' : 'User';
    const [users] = await db.query(`SELECT * FROM ${tableName} WHERE email = ?`, [email]);

    if (!users || users.length === 0) {
      return res.status(404).json({ success: false, message: 'No user found with that email address.' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    const expireTime = db.getDbType() === 'postgres' 
      ? new Date(Date.now() + 3600000).toISOString() 
      : new Date(Date.now() + 3600000).toISOString().slice(0, 19).replace('T', ' '); // 1 hour

    await db.query(`UPDATE ${tableName} SET reset_token = ?, reset_token_expiry = ? WHERE user_id = ?`, [resetToken, expireTime, users[0].user_id]);

    // Mock sending email
    console.log(`\n==============================================`);
    console.log(`✉️ MOCK PASSWORD RESET EMAIL SENT TO: ${email}`);
    console.log(`🔗 Reset Link: http://localhost:5173/reset-password?token=${resetToken}`);
    console.log(`==============================================\n`);

    res.status(200).json({ success: true, message: 'Password reset email sent.' });
  } catch (err) {
    console.error('[Forgot Password Error]:', err.message);
    res.status(500).json({ success: false, message: 'Server error during password reset request.' });
  }
};

/**
 * Reset Password
 * POST /api/auth/reset-password/:token
 */
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ success: false, message: 'Please provide a new password.' });
  }

  try {
    const tableName = db.getDbType() === 'postgres' ? 'users' : 'User';
    const [users] = await db.query(`SELECT * FROM ${tableName} WHERE reset_token = ?`, [token]);

    if (!users || users.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid or expired reset token.' });
    }

    const user = users[0];
    const expiry = new Date(user.reset_token_expiry);
    if (expiry < new Date()) {
      return res.status(400).json({ success: false, message: 'Reset token has expired.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await db.query(`UPDATE ${tableName} SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE user_id = ?`, [hashedPassword, user.user_id]);

    res.status(200).json({ success: true, message: 'Password reset successfully. You can now log in.' });
  } catch (err) {
    console.error('[Reset Password Error]:', err.message);
    res.status(500).json({ success: false, message: 'Server error during password reset.' });
  }
};
