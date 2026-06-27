# VConverso - Language Learning Management System (LMS)

VConverso is a complete, modular, secure, and beautiful full-stack Language Learning Management System designed as a comprehensive learning pathway app.

---

## 🚀 Key Features

* **🎓 Sequential Curriculum Pathway**: Lock-step progression. Quizzes are locked sequentially until the previous quiz is passed with a score of $\ge 65\%$. 
* **✍️ Essay Modules Unlocker**: High-level essay writing modules (21-26) automatically unlock once Quiz 20 is successfully passed.
* **🌐 Dynamic Translation Tool**: A two-column translation workbench supporting US-English, European-Spanish, European-French, and German.
* **🔊 Localized Native Voiceover (TTS)**: High-quality Text-to-Speech voiceover powered by the browser's native Web Speech API.
* **🗣️ English Phonetic Pronunciation Guide**: Displays standard phonetic respelling guides for common greetings alongside Google Translate transliteration metadata (`dt=rm`).
* **⚡ Gamified Daily Milestones**: A daily vocabulary workout requiring you to translate 5 phrases before unlocking the claimable **+150 XP bonus** (persisted and verified in the database).
* **🔥 Timezone-Safe Streak Counter**: Tracks your daily learning streak dynamically using local-timezone constructors to avoid date-shifting bugs.
* **📱 Mobile Network Ready**: Dynamic host-detection resolves the server's local network IP automatically, enabling seamless testing on mobile phones connected to the same Wi-Fi network.

---

## 🏁 How to Run Locally

### 1. Launch the Backend Server
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Start the development server with automatic file reload (runs on Port `5000`):
   ```bash
   npm run dev
   ```

*Note: The backend automatically falls back to a local SQLite database (`backend/database.sqlite`) populated with initial language data if no PostgreSQL credentials are provided!*

### 2. Launch the Frontend React Client
1. Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Start the Vite React client with local network hosting (runs on Port `3000`):
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to `http://localhost:3000` (or `http://<YOUR_IP>:3000` on your mobile phone).

---

## 📂 Project Directory Structure

```
VConverso/
├── database/
│   └── schema.sql                # Complete MySQL/PostgreSQL DDL schema
├── backend/
│   ├── config/
│   │   └── db.js                 # Universal DB Adapter (MySQL/Postgre + SQLite Fallback)
│   ├── controllers/
│   │   ├── authController.js     # User registration & password encryption
│   │   ├── langController.js     # Retrieves language configurations
│   │   ├── topicController.js     # Serves curriculum syllabus
│   │   ├── noteController.js     # Lesson notes reader
│   │   ├── quizController.js     # Scoring algorithm & quiz reports
│   │   ├── translateController.js # Dynamic Translation, Transliteration & Phonetic lookup
│   │   └── progressController.js # Prepares student progress & daily milestones
│   ├── middleware/
│   │   └── authMiddleware.js     # Protects private routes via JWT verification
│   ├── routes/
│   │   ├── auth.js               # Route mapping for registration/login
│   │   ├── languages.js
│   │   ├── topics.js
│   │   ├── notes.js
│   │   ├── quizzes.js            # Handles quizzes, questions, and submits
│   │   ├── translate.js          # Handles secure text-to-speech & translation requests
│   │   └── progress.js
│   ├── .env                      # Backend local environment variables
│   ├── package.json              # Backend dependencies & dev scripts
│   ├── server.js                 # Express server bound to 0.0.0.0
│   └── database.sqlite           # Local SQLite database (auto-seeded)
├── frontend/
│   ├── public/
│   │   └── assets/
│   │       └── images/           # Local image assets
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx        # Glassmorphic responsive header navigation
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Context API for user authentication session
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx     # Card-based secure login
│   │   │   ├── RegisterPage.jsx  # Student onboarding
│   │   │   ├── LanguagePage.jsx  # Elegant pathway cards with flag gradients
│   │   │   ├── TopicsPage.jsx    # Curriculum topics listing
│   │   │   ├── NotesPage.jsx     # Learning notes reading room
│   │   │   ├── QuizPage.jsx      # Interactive quiz assessment and review report
│   │   │   └── DashboardPage.jsx # Analytics dashboard, daily milestones, and Translate tool
│   │   ├── services/
│   │   │   └── api.js            # Axios client with host-detection and JWT headers
│   │   ├── App.jsx               # React Router DOM 6 configuration and Guards
│   │   ├── index.css             # HSL-derived premium glassmorphic stylesheet
│   │   └── main.jsx              # React mounting root
│   ├── .env                      # Frontend local environment variables
│   ├── index.html                # SEO metadata and Google Fonts setup
│   ├── package.json              # Frontend dependencies & hosts dev script
│   └── vite.config.js            # Vite configurations setting server to Port 3000
```
