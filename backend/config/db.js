let sqlite3 = null;
let Pool = null;

const path = require('path');
const fs = require('fs');

let dbType = 'sqlite';
let sqliteDb = null;
let pgPool = null;

// Load environment variables relative to this config file
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

/**
 * Helper to rename User table references to users for PostgreSQL reserved keyword compatibility
 */
function wrapUserTable(sql) {
  return sql.replace(/\bUser\b/g, 'users');
}

/**
 * Initialize the Database Adapter
 */
async function initDb() {
  const databaseUrl = process.env.DATABASE_URL;
  const dbTypeEnv = process.env.DB_TYPE || '';
  const isPostgresRequested = dbTypeEnv.toLowerCase() === 'postgres' || dbTypeEnv.toLowerCase() === 'supabase';

  // 1. Try PostgreSQL / Supabase if DATABASE_URL is provided OR if DB_TYPE is set to postgres/supabase
  if (databaseUrl || isPostgresRequested) {
    try {
      console.log(`[Database] Attempting to connect to PostgreSQL (Supabase)...`);
      
      // Lazy load pg Pool
      if (!Pool) {
        Pool = require('pg').Pool;
      }

      if (databaseUrl) {
        pgPool = new Pool({
          connectionString: databaseUrl,
          ssl: {
            rejectUnauthorized: false // Required for secure Supabase connections
          }
        });
      } else {
        pgPool = new Pool({
          host: process.env.DB_HOST || 'localhost',
          user: process.env.DB_USER || 'postgres',
          password: process.env.DB_PASSWORD || '',
          database: process.env.DB_NAME || 'postgres',
          port: process.env.DB_PORT || 5432,
          ssl: {
            rejectUnauthorized: false
          }
        });
      }

      // Test connection
      const client = await pgPool.connect();
      console.log(`[Database] Successfully connected to PostgreSQL (Supabase) database.`);
      client.release();

      dbType = 'postgres';

      // Check if tables exist, and seed if they are empty
      await seedPostgresIfEmpty();
      
      // Ensure daily challenge tracking columns exist in PostgreSQL
      await pgPool.query('ALTER TABLE DailyChallenge ADD COLUMN IF NOT EXISTS translations_count INT DEFAULT 0;').catch(() => {});
      await pgPool.query('ALTER TABLE DailyChallenge ADD COLUMN IF NOT EXISTS last_activity_date VARCHAR(10) NULL;').catch(() => {});

      return;
    } catch (err) {
      console.warn(`[Database WARNING] Failed to connect to PostgreSQL: ${err.message}`);
      console.log('[Database] Falling back to SQLite local database options...');
    }
  }

  // 2. Fallback to SQLite
  dbType = 'sqlite';
  const dbPath = path.join(__dirname, '..', 'database.sqlite');

  // Lazy load sqlite3
  if (!sqlite3) {
    sqlite3 = require('sqlite3');
  }

  sqliteDb = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('[Database ERROR] Could not initialize SQLite database:', err.message);
    } else {
      console.log(`[Database] SQLite database successfully connected at: ${dbPath}`);
    }
  });

  // Enable foreign key constraints in SQLite
  sqliteDb.run('PRAGMA foreign_keys = ON;');

  // Create tables and seed data
  await initSQLiteSchemaAndSeed();
}

/**
 * Run a PostgreSQL query with automatic translation of MySQL/SQLite syntax to PostgreSQL
 */
async function postgresQuery(sql, params = []) {
  let convertedSql = wrapUserTable(sql);

  // Convert standard SQL parameter placeholders from ? to $1, $2, etc.
  let index = 1;
  convertedSql = convertedSql.replace(/\?/g, () => `$${index++}`);

  // Emulate lastID/insertId behavior by appending RETURNING * for inserts
  const isInsert = convertedSql.trim().toLowerCase().startsWith('insert');
  if (isInsert && !convertedSql.toLowerCase().includes('returning')) {
    convertedSql = convertedSql.trim();
    if (convertedSql.endsWith(';')) {
      convertedSql = convertedSql.slice(0, -1);
    }
    convertedSql += ' RETURNING *';
  }

  const res = await pgPool.query(convertedSql, params);

  if (isInsert) {
    let insertId = null;
    if (res.rows && res.rows.length > 0) {
      const firstRow = res.rows[0];
      // Automatically detect primary key column (ends with _id or is id)
      const idKey = Object.keys(firstRow).find(key => key.toLowerCase().endsWith('_id') || key.toLowerCase() === 'id');
      if (idKey) {
        insertId = firstRow[idKey];
      }
    }
    const result = {
      insertId: insertId,
      affectedRows: res.rowCount
    };
    return [result, null];
  } else if (convertedSql.trim().toLowerCase().startsWith('update') || convertedSql.trim().toLowerCase().startsWith('delete')) {
    const result = {
      affectedRows: res.rowCount
    };
    return [result, null];
  } else {
    // Return rows for SELECT queries
    return [res.rows, null];
  }
}

/**
 * Run an SQLite query with standard mysql2 format return [rows, fields]
 */
function sqliteQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    const isSelect = sql.trim().toLowerCase().startsWith('select') ||
      sql.trim().toLowerCase().startsWith('pragma') ||
      sql.trim().toLowerCase().startsWith('show');

    if (isSelect) {
      sqliteDb.all(sql, params, (err, rows) => {
        if (err) {
          console.error(`[SQLite Error] Query: ${sql} | Error: ${err.message}`);
          reject(err);
        } else {
          resolve([rows, null]);
        }
      });
    } else {
      sqliteDb.run(sql, params, function (err) {
        if (err) {
          console.error(`[SQLite Error] Run: ${sql} | Error: ${err.message}`);
          reject(err);
        } else {
          const result = {
            insertId: this.lastID,
            affectedRows: this.changes
          };
          resolve([result, null]);
        }
      });
    }
  });
}

/**
 * Seed PostgreSQL / Supabase if it was just created/empty
 */
async function seedPostgresIfEmpty() {
  try {
    // Check if the Language table exists in the database
    const tableCheck = await pgPool.query(
      "SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'language')"
    );
    const exists = tableCheck.rows && tableCheck.rows[0] && tableCheck.rows[0].exists;

    if (!exists) {
      console.log('[Database] PostgreSQL tables not found on Supabase. Importing schema and sample data...');

      const schemaPath = path.join(__dirname, '..', '..', 'database', 'schema_postgres.sql');
      if (fs.existsSync(schemaPath)) {
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');
        const statements = schemaSql
          .split(';')
          .map(stmt => stmt.split('\n').filter(line => !line.trim().startsWith('--')).join('\n').trim())
          .filter(stmt => stmt.length > 0);

        for (const statement of statements) {
          // Wrap User table name references in PostgreSQL double quotes dynamically
          const pgStatement = wrapUserTable(statement);
          await pgPool.query(pgStatement);
        }
        console.log('[Database] PostgreSQL schema imported and seeded successfully.');
      } else {
        console.warn('[Database WARNING] schema_postgres.sql not found at ' + schemaPath);
      }
    }
  } catch (err) {
    console.error('[Database ERROR] Error checking/seeding PostgreSQL tables:', err.message);
  }
}

/**
 * Create and Seed SQLite Database
 */
function initSQLiteSchemaAndSeed() {
  return new Promise((resolve) => {
    sqliteDb.serialize(async () => {
      sqliteDb.run(`
        CREATE TABLE IF NOT EXISTS User (
          user_id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `);

      sqliteDb.run(`
        CREATE TABLE IF NOT EXISTS Language (
          language_id INTEGER PRIMARY KEY AUTOINCREMENT,
          language_name TEXT NOT NULL,
          language_image TEXT NOT NULL,
          description TEXT
        );
      `);

      sqliteDb.run(`
        CREATE TABLE IF NOT EXISTS Topics (
          topic_id INTEGER PRIMARY KEY AUTOINCREMENT,
          language_id INTEGER NOT NULL,
          topic_name TEXT NOT NULL,
          topic_description TEXT,
          FOREIGN KEY (language_id) REFERENCES Language(language_id) ON DELETE CASCADE
        );
      `);

      sqliteDb.run(`
        CREATE TABLE IF NOT EXISTS Notes (
          note_id INTEGER PRIMARY KEY AUTOINCREMENT,
          topic_id INTEGER NOT NULL,
          title TEXT NOT NULL,
          content TEXT NOT NULL,
          FOREIGN KEY (topic_id) REFERENCES Topics(topic_id) ON DELETE CASCADE
        );
      `);

      sqliteDb.run(`
        CREATE TABLE IF NOT EXISTS Quizzes (
          quiz_id INTEGER PRIMARY KEY AUTOINCREMENT,
          topic_id INTEGER NOT NULL,
          quiz_title TEXT NOT NULL,
          total_marks INTEGER NOT NULL,
          FOREIGN KEY (topic_id) REFERENCES Topics(topic_id) ON DELETE CASCADE
        );
      `);

      sqliteDb.run(`
        CREATE TABLE IF NOT EXISTS Qs (
          question_id INTEGER PRIMARY KEY AUTOINCREMENT,
          quiz_id INTEGER NOT NULL,
          question_text TEXT NOT NULL,
          option_a TEXT NOT NULL,
          option_b TEXT NOT NULL,
          option_c TEXT NOT NULL,
          option_d TEXT NOT NULL,
          correct_answer TEXT NOT NULL,
          FOREIGN KEY (quiz_id) REFERENCES Quizzes(quiz_id) ON DELETE CASCADE
        );
      `);

      sqliteDb.run(`
        CREATE TABLE IF NOT EXISTS Answers (
          answer_id INTEGER PRIMARY KEY AUTOINCREMENT,
          question_id INTEGER NOT NULL,
          user_id INTEGER NOT NULL,
          selected_answer TEXT NOT NULL,
          FOREIGN KEY (question_id) REFERENCES Qs(question_id) ON DELETE CASCADE,
          FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE
        );
      `);

      sqliteDb.run(`
        CREATE TABLE IF NOT EXISTS Attempts (
          attempt_id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          quiz_id INTEGER NOT NULL,
          attempt_date DATETIME DEFAULT CURRENT_TIMESTAMP,
          score INTEGER NOT NULL,
          FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE,
          FOREIGN KEY (quiz_id) REFERENCES Quizzes(quiz_id) ON DELETE CASCADE
        );
      `);

      sqliteDb.run(`
        CREATE TABLE IF NOT EXISTS Scores (
          score_id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          language_id INTEGER NOT NULL,
          total_score INTEGER DEFAULT 0,
          progress_percentage REAL DEFAULT 0.0,
          FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE,
          FOREIGN KEY (language_id) REFERENCES Language(language_id) ON DELETE CASCADE,
          UNIQUE (user_id, language_id)
        );
      `);

      sqliteDb.run(`
        CREATE TABLE IF NOT EXISTS DailyChallenge (
          challenge_id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          total_bonus_xp INTEGER NOT NULL DEFAULT 0,
          last_claimed_at TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE,
          UNIQUE (user_id)
        );
      `);

      sqliteDb.all('PRAGMA table_info(DailyChallenge);', [], (pragmaErr, cols) => {
        if (!pragmaErr && Array.isArray(cols)) {
          const names = cols.map(c => c.name);
          if (!names.includes('total_bonus_xp')) {
            sqliteDb.run('ALTER TABLE DailyChallenge ADD COLUMN total_bonus_xp INTEGER NOT NULL DEFAULT 0;');
          }
          if (!names.includes('last_claimed_at')) {
            sqliteDb.run('ALTER TABLE DailyChallenge ADD COLUMN last_claimed_at TEXT;');
          }
          if (!names.includes('translations_count')) {
            sqliteDb.run('ALTER TABLE DailyChallenge ADD COLUMN translations_count INTEGER NOT NULL DEFAULT 0;');
          }
          if (!names.includes('last_activity_date')) {
            sqliteDb.run('ALTER TABLE DailyChallenge ADD COLUMN last_activity_date TEXT;');
          }
          if (names.includes('bonus_xp') && names.includes('claimed_date') && !names.includes('total_bonus_xp')) {
            sqliteDb.run('UPDATE DailyChallenge SET total_bonus_xp = bonus_xp WHERE total_bonus_xp = 0;');
            sqliteDb.run('UPDATE DailyChallenge SET last_claimed_at = claimed_date WHERE last_claimed_at IS NULL;');
          }
        }
      });

      sqliteDb.get("SELECT COUNT(*) as count FROM Language", [], async (err, row) => {
        if (row && row.count === 0) {
          console.log('[Database] SQLite database empty. Seeding sample language data...');

          const schemaPath = path.join(__dirname, '..', '..', 'database', 'schema.sql');
          if (fs.existsSync(schemaPath)) {
            const schemaSql = fs.readFileSync(schemaPath, 'utf8');
            const statements = schemaSql
              .split(';')
              .map(stmt => stmt.split('\n').filter(line => !line.trim().startsWith('--')).join('\n').trim())
              .filter(stmt => stmt.length > 0 && stmt.toLowerCase().startsWith('insert'));

            for (const statement of statements) {
              sqliteDb.run(statement, (insertErr) => {
                if (insertErr) {
                  console.warn(`[Database WARNING] SQLite seed error: ${insertErr.message} on statement: ${statement}`);
                }
              });
            }
            console.log('[Database] SQLite seeded with languages, topics, notes, and quiz questions.');
          } else {
            console.warn('[Database WARNING] schema.sql not found for SQLite seeding. Seeding manually...');
          }
        }
        resolve();
      });
    });
  });
}

// Wrapper query function that supports standard mysql2 query parameters
async function query(sql, params) {
  if (dbType === 'postgres') {
    return await postgresQuery(sql, params);
  } else {
    return await sqliteQuery(sql, params);
  }
}

// Export initialization function and query wrapper
module.exports = {
  initDb,
  query,
  getDbType: () => dbType
};
