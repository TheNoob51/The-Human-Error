# The Human Error

A gamified cybersecurity training platform that simulates social engineering and phishing attacks inside a realistic fake desktop OS environment. Users interact with AI-generated phishing emails, fake credential-capture pages, and system alerts — then receive a vulnerability score and AI-powered behavioral analysis.

> **Capstone Project 2026** — Built by Gyan

---

## Features

- **Simulated Desktop OS** — Draggable windows, taskbar with live clock, desktop icons, minimize/maximize/close
- **Phishing Email Inbox** — AI-generated (Gemini) or fallback emails with inspect sender & report phishing actions
- **Fake Browser Login** — Credential-capture simulation that logs user behavior
- **System Alert Popups** — Fake malware warnings that test user judgment
- **Behavioral Analytics** — Risk scoring based on user interactions (credentials entered, links clicked, phishing reported)
- **Hesitation-Time Tracking** — Measures how long users take to make decisions per email
- **AI-Powered Explanations** — Google Gemini generates personalized analysis of user performance
- **Firebase Auth** — Email/password + Google + GitHub OAuth
- **Firestore Database** — Per-user session persistence with full interaction history
- **Security Dashboard** — Vulnerability score, risk profile, dynamic risk breakdown (urgency/authority/reward), session history with AI analysis

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 7, styled-components, Framer Motion |
| Backend | Express 5, Google Generative AI SDK |
| Auth | Firebase Authentication (Email, Google, GitHub) |
| Database | Cloud Firestore |
| AI | Google Gemini 2.0 Flash |
| Icons | Lucide React, Simple Icons |

---

## Project Structure

```
├── backend/
│   ├── server.js              # Express server
│   ├── routes/gemini.js       # Gemini AI endpoints
│   └── .env                   # GEMINI_API_KEY, PORT
│
├── frontend/
│   ├── src/
│   │   ├── pages/             # Landing, Auth, Dashboard, TurnSimulation
│   │   ├── components/        # Reusable UI (Button, Card, Badge, etc.)
│   │   ├── components/simulation/  # Desktop OS (WindowManager, Taskbar, apps/)
│   │   ├── context/           # AuthContext, SimulationContext
│   │   └── lib/               # firebase.js, firestoreService.js
│   └── .env                   # VITE_FIREBASE_* config
```

---

## Setup

### Prerequisites
- Node.js 18+
- Firebase project with **Authentication** (Email, Google, GitHub) and **Firestore** enabled
- Google Gemini API key

### Backend
```bash
cd backend
npm install
# Create .env with:
# GEMINI_API_KEY=your_key_here
# PORT=5000
npm start
```

### Frontend
```bash
cd frontend
npm install
# Create .env with your Firebase config:
# VITE_FIREBASE_API_KEY=...
# VITE_FIREBASE_AUTH_DOMAIN=...
# VITE_FIREBASE_PROJECT_ID=...
# VITE_FIREBASE_STORAGE_BUCKET=...
# VITE_FIREBASE_MESSAGING_SENDER_ID=...
# VITE_FIREBASE_APP_ID=...
npm run dev
```

### Firebase Setup (Required)
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Enable **Authentication** → Sign-in methods: Email/Password, Google, GitHub
3. Enable **Cloud Firestore** → Start in test mode
4. Create a composite index for `simulation_sessions` collection: `uid` (Ascending) + `createdAt` (Descending)

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/generate-emails` | Generate 3 phishing emails via Gemini (with fallback) |
| POST | `/api/generate-phishing` | Generate single phishing scenario |
| POST | `/api/generate-explanation` | AI analysis of user performance |

---

## License

MIT