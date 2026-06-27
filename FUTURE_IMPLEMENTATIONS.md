# VConverso — Future Implementations Roadmap

A structured breakdown of planned features and enhancements for the VConverso Language Learning Management System, organized by priority and domain.

---

## 1. AI & Smart Learning

### 1.1 Conversational AI Practice Partner
- Integrate a Claude/GPT-powered chatbot that simulates real conversations in the target language
- Context-aware dialogue that adapts to the learner's current topic (e.g., greetings if on Topic 1)
- Correction mode: AI flags grammar/vocabulary errors inline and explains them

### 1.2 AI Writing Feedback
- Learner writes a short paragraph in the target language; AI scores grammar, vocabulary, and fluency
- Detailed error breakdown with corrected version and explanation

### 1.3 AI-Generated Quiz Questions
- Admin trigger to auto-generate MCQ questions from any note content using an LLM
- Reduces content-creation overhead for new languages and topics

### 1.4 Adaptive Difficulty Engine
- Track per-user error patterns across quiz submissions
- Automatically surface weaker topics as "Priority Review" on the dashboard
- Adjust quiz question difficulty based on rolling accuracy score

---

## 2. Gamification & Motivation

### 2.1 Achievement Badge System
- Badges awarded for milestones: first quiz passed, 7-day streak, 100% on a topic, polyglot (2+ languages), etc.
- Badge gallery displayed on the user profile page
- Animated unlock notification (extend existing confetti system)

### 2.2 Level & Rank System
| Level | XP Range | Title |
|-------|----------|-------|
| 1 | 0–499 | Novice |
| 2 | 500–1499 | Apprentice |
| 3 | 1500–3499 | Scholar |
| 4 | 3500–6999 | Linguist |
| 5 | 7000+ | Polyglot Legend |

- XP bar shown on dashboard below the name card
- Level-up animation triggered on threshold crossing

### 2.3 Weekly Challenges
- Fresh challenge set every Monday (e.g., "Complete 3 quizzes this week", "Score 90%+ twice")
- Separate from daily claim; rewards larger XP bonus
- Progress tracker visible on dashboard

### 2.4 Streak Freeze
- Users can earn or purchase a one-time "Streak Shield" to protect a streak if they miss a day
- Adds a compelling reason to stay engaged without punishing travel/busy schedules

---

## 3. Content & Curriculum Expansion

### 3.1 New Languages
Priority additions based on global demand:
- Italian, Portuguese, Japanese, Mandarin Chinese, Arabic, Hindi, Korean

### 3.2 Spaced Repetition System (SRS) — Flashcards
- Vocabulary flashcard mode separate from quizzes
- SM-2 algorithm schedules card reviews at increasing intervals
- Per-card status: New → Learning → Review → Mastered

### 3.3 Audio Pronunciation Module
- Native-speaker audio clips attached to each vocabulary item and note
- Text-to-speech (TTS) fallback using Web Speech API for cost-free baseline
- Learner records their own pronunciation; waveform displayed for visual comparison

### 3.4 Listening Comprehension Exercises
- Short audio clips with transcription-gap exercises
- Scored and saved to progress like quizzes

### 3.5 Writing Exercises
- Prompted free-write exercises (e.g., "Describe your morning routine in French")
- Submitted text stored; AI feedback returned asynchronously

---

## 4. Social & Community

### 4.1 Global Leaderboard
- Weekly and all-time boards ranked by XP
- Filter by language to see how you rank within a specific course
- Top 3 highlighted with gold/silver/bronze styling

### 4.2 Friends System
- Send/accept friend requests by username
- View friends' progress, streaks, and badges on a "Friends" tab
- Friendly XP comparison widget on dashboard

### 4.3 Discussion Board
- Per-topic comment thread for learners to ask questions and share notes
- Upvote helpful comments
- Instructor/admin replies pinned at the top

---

## 5. User Profile & Settings

### 5.1 Profile Page (`/profile`)
- Display name, avatar (uploaded or selected from preset set)
- Bio / native language / learning goal
- Public badge wall and earned certificates
- Joined date and total study time

### 5.2 Study Schedule & Reminders
- User sets preferred daily study time (e.g., 20 minutes/day at 8 PM)
- Browser push notification or email reminder fires if no activity logged by that time

### 5.3 Dark / Light Theme Toggle
- Persist user preference in localStorage or user record
- Extend current CSS variable system — the existing HSL token structure makes this straightforward

### 5.4 Account Settings
- Change password (with current-password verification)
- Change display name
- Delete account with full data wipe confirmation

---

## 6. Admin & Instructor Panel

### 6.1 CMS Dashboard (`/admin`)
- Protected route accessible only to `role = admin` users
- CRUD interface for Languages, Topics, Notes, Quizzes, Questions
- Rich-text editor for Notes content (replace raw text with markdown/HTML)

### 6.2 User Management
- View all registered users, their enrollment status, and XP
- Soft-ban / suspend user accounts
- Reset a user's password manually

### 6.3 Analytics for Instructors
- Per-topic pass rate, average score, and most-missed questions
- Funnel view: enrolled → attempted quiz → passed
- Exportable CSV reports

---

## 7. Auth & Security Improvements

### 7.1 Email Verification on Registration
- Send a 6-digit OTP or magic link to verify the email address before activating the account
- Unverified accounts blocked from accessing private routes

### 7.2 OAuth Social Login
- "Continue with Google" via Passport.js or Supabase Auth
- Eliminates password management for users who prefer it

### 7.3 Password Reset Flow
- "Forgot Password" link on login page
- Sends time-limited reset link to registered email

### 7.4 Refresh Token Rotation
- Current implementation uses a single JWT; add refresh tokens with sliding expiry
- Revoke all sessions on password change

### 7.5 Rate Limiting
- Apply `express-rate-limit` to `/api/auth/login` and `/api/auth/register`
- Prevents brute-force and credential-stuffing attacks

---

## 8. Performance & Infrastructure

### 8.1 Redis Caching Layer
- Cache language/topic/note lookups that change infrequently
- Invalidate on admin CMS updates
- Reduces database query load under concurrent users

### 8.2 Full-Text Search
- Search bar in the navbar that queries topics and notes content
- Backed by SQLite FTS5 (local) or PostgreSQL full-text search (production)

### 8.3 File Upload Service
- Profile avatars, audio clips, and note attachments stored in Supabase Storage or S3
- Signed URL generation on the backend; no direct client-to-bucket uploads

### 8.4 Structured Logging & Error Monitoring
- Replace `console.error` calls with a structured logger (e.g., `pino`)
- Integrate Sentry for runtime error capture in both frontend and backend
- API request/response timing tracked for performance profiling

### 8.5 Database Migrations
- Replace manual `schema.sql` with a migration runner (e.g., `db-migrate` or `Knex` migrations)
- Version-controlled schema changes that run automatically on deploy

---

## 9. Mobile & Offline

### 9.1 Progressive Web App (PWA)
- Add `manifest.json` and service worker to enable "Add to Home Screen"
- Cache static assets and last-viewed lesson for offline reading

### 9.2 React Native Mobile App
- Shared API layer already in place — mobile client can consume the same `/api` endpoints
- Offline quiz mode with sync on reconnect
- Push notifications via Firebase Cloud Messaging

---

## 10. Certifications & Credentials

### 10.1 Course Completion Certificate
- Auto-generated PDF certificate when a user reaches 100% progress in a language
- Includes user name, language, date, and a verifiable certificate ID
- Shareable via public URL (`/certificate/:cert_id`)

### 10.2 Proficiency Level Badges
- A1 → C2 (CEFR-aligned) badges unlocked as quiz average crosses defined thresholds
- Displayed on profile and certificate

---

## 11. Analytics & Study Insights (Learner-Facing)

- "Your Weak Areas" section on the dashboard — topics with below-70% average score
- Time-series graph: XP earned per day over the last 30 days
- Accuracy trend per language (moving average across attempts)
- Estimated time to completion based on current pace

---

## Implementation Priority Summary

| Priority | Feature |
|----------|---------|
| High | Email verification, password reset, rate limiting |
| High | Profile page + avatar |
| High | Achievement badge system |
| High | Leaderboard |
| Medium | SRS flashcards |
| Medium | Admin CMS panel |
| Medium | Audio pronunciation clips |
| Medium | Weekly challenges |
| Medium | Dark mode toggle |
| Low | AI conversation partner |
| Low | React Native app |
| Low | Certifications / CEFR badges |
| Low | Listening comprehension module |

---

*Last updated: June 2026 — VConverso v1.x*
