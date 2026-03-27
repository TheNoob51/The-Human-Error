# FullExplanation

## 1. Project Overview

The Human Error is a gamified cybersecurity training platform focused on social engineering awareness. It combines a realistic desktop simulation, AI-generated phishing content, behavior tracking, risk scoring, and training mini-modules.

Core goal:
- Put users in believable attack scenarios.
- Observe behavior instead of just testing memorized theory.
- Translate interactions into measurable risk and guidance.

Primary sources:
- [README.md](README.md)
- [frontend/src/App.jsx](frontend/src/App.jsx)
- [backend/server.js](backend/server.js)

---

## 2. High-Level Architecture

The system is split into two apps:

- Frontend (React + Vite): Handles UI, auth state, simulation runtime, training modules, and dashboard analytics.
- Backend (Express): Provides AI endpoints (Gemini), fallback generation logic, and threat generation APIs.

Entry points:
- Frontend boot: [frontend/src/main.jsx](frontend/src/main.jsx)
- Route map: [frontend/src/App.jsx](frontend/src/App.jsx)
- Backend server and route mounting: [backend/server.js](backend/server.js)

Backend route groups:
- Gemini and simulation endpoints: [backend/routes/gemini.js](backend/routes/gemini.js)
- Training threat endpoints: [backend/routes/trainingThreats.js](backend/routes/trainingThreats.js)
- Local threat dataset: [backend/utils/threatData.js](backend/utils/threatData.js)

---

## 3. Frontend Route and Feature Map

Defined in [frontend/src/App.jsx](frontend/src/App.jsx):

- /: Landing page
- /auth, /login, /signup: Authentication UI
- /dashboard: Protected user dashboard
- /simulation: Protected full simulation environment
- /training: Protected training directory
- /training/threat-generator: Threat generation tool
- /training/game: 20-round challenge mode
- /training/simulator/:scamId: Scenario simulator
- /training/:categoryId: Category-specific scenario list

Route protection:
- Implemented by [frontend/src/components/ProtectedRoute.jsx](frontend/src/components/ProtectedRoute.jsx)
- Uses auth context from [frontend/src/context/AuthContext.jsx](frontend/src/context/AuthContext.jsx)

---

## 4. Authentication and User Profile Workflow

Auth providers:
- Email/password
- Google OAuth
- GitHub OAuth

Auth page:
- [frontend/src/pages/Auth.jsx](frontend/src/pages/Auth.jsx)

Auth state lifecycle:
- Firebase auth state listener in [frontend/src/context/AuthContext.jsx](frontend/src/context/AuthContext.jsx)
- On login/signup, user profile is created or hydrated in Firestore via [frontend/src/lib/firestoreService.js](frontend/src/lib/firestoreService.js)

Profile model includes:
- Organization, industry, department, role
- Persona, work environment, experience
- Email domain, tools, simulation focus, notes

Firebase setup:
- [frontend/src/lib/firebase.js](frontend/src/lib/firebase.js)

---

## 5. Dashboard Features and Analytics

Dashboard UI:
- [frontend/src/pages/Dashboard.jsx](frontend/src/pages/Dashboard.jsx)

Main capabilities:
- Load historical simulations from Firestore.
- Fallback to localStorage if Firestore data is unavailable.
- Compute vulnerability score, high/low risk counts, average hesitation.
- Show risk breakdown by urgency, authority, and reward lure patterns.
- Display session timeline and AI explanation.
- Offer simulation/training launch actions.

Profile tailoring pane:
- [frontend/src/components/ProfileDetailsPane.jsx](frontend/src/components/ProfileDetailsPane.jsx)
- Saves updates through upsert logic in [frontend/src/lib/firestoreService.js](frontend/src/lib/firestoreService.js)
- Improves future simulation targeting via profile snapshot usage.

---

## 6. Core Simulation Workflow (End-to-End)

Simulation route orchestration:
- [frontend/src/pages/TurnSimulation.jsx](frontend/src/pages/TurnSimulation.jsx)
- Starts with briefing: [frontend/src/pages/SimulationBriefing.jsx](frontend/src/pages/SimulationBriefing.jsx)
- Then loads desktop environment: [frontend/src/components/simulation/Desktop.jsx](frontend/src/components/simulation/Desktop.jsx)

State engine:
- [frontend/src/context/SimulationContext.jsx](frontend/src/context/SimulationContext.jsx)

What happens when simulation starts:
- Session initialized with sessionId and startTime.
- Profile snapshot captured from user profile data.
- Initial inbox generated (AI first, fallback local templates).
- Selected email set and interaction tracking activated.

Inbox and interactions:
- Mail UI: [frontend/src/components/simulation/apps/MailApp.jsx](frontend/src/components/simulation/apps/MailApp.jsx)
- Browser lure/login page: [frontend/src/components/simulation/apps/BrowserApp.jsx](frontend/src/components/simulation/apps/BrowserApp.jsx)
- Alert simulation window: [frontend/src/components/simulation/apps/SystemAlert.jsx](frontend/src/components/simulation/apps/SystemAlert.jsx)
- Interaction constants: [frontend/src/constants.js](frontend/src/constants.js)

Tracked user actions include:
- Email opened
- Sender inspected
- Phish reported
- Fake link clicked
- Credentials entered
- Legitimate link clicked
- False positive and false negative cases

Risk assignment logic:
- Very high: credentials entered
- High: fake link clicked
- Medium: legitimate link clicked
- Low: report phishing or safe behavior patterns
- Implemented in [frontend/src/context/SimulationContext.jsx](frontend/src/context/SimulationContext.jsx)

Session completion and persistence:
- Save partial result immediately to localStorage.
- Request explanation from backend.
- Update localStorage with final explanation.
- Save final session to Firestore if authenticated.
- Navigate to dashboard once completed.

---

## 7. Desktop OS Simulation Layer

Window management:
- [frontend/src/components/simulation/WindowManager.jsx](frontend/src/components/simulation/WindowManager.jsx)

Desktop shell:
- [frontend/src/components/simulation/Desktop.jsx](frontend/src/components/simulation/Desktop.jsx)
- Window component with drag/minimize/maximize/focus: [frontend/src/components/simulation/SimulationWindow.jsx](frontend/src/components/simulation/SimulationWindow.jsx)
- Taskbar and clock: [frontend/src/components/simulation/Taskbar.jsx](frontend/src/components/simulation/Taskbar.jsx)
- Desktop icons: [frontend/src/components/simulation/DesktopIcon.jsx](frontend/src/components/simulation/DesktopIcon.jsx)
- Shutdown confirmation and screen:
  - [frontend/src/components/simulation/ShutdownModal.jsx](frontend/src/components/simulation/ShutdownModal.jsx)
  - [frontend/src/components/simulation/ShutdownScreen.jsx](frontend/src/components/simulation/ShutdownScreen.jsx)

Stop simulation behavior:
- Clicking stop triggers shutdown modal.
- On confirm, simulation is ended and synced.
- Shutdown screen appears briefly, then redirects to dashboard.

---

## 8. Backend API and AI Workflow

Main backend route file:
- [backend/routes/gemini.js](backend/routes/gemini.js)

Endpoints:
- POST/GET /api/generate-emails
  - Generates phishing email arrays tailored by profile.
  - Uses Gemini when available.
  - Uses deterministic fallback templates if unavailable or invalid response.
- POST /api/generate-phishing
  - Generates one scenario.
- POST /api/generate-alert
  - Generates phishing-style system alert content for update or MFA scenarios.
- POST /api/generate-explanation
  - Generates 3-5 sentence behavior explanation from interactions, risk level, hesitation, and profile context.

Backend resilience patterns:
- Dummy key initialization prevents server crash at startup.
- Every AI route has fallback behavior.
- JSON cleanup removes markdown fences before parsing.

---

## 9. Data Persistence Model

Firestore collections:
- users
- simulation_sessions

User profile behavior:
- Created on first login.
- Lightly merged on subsequent auth events.
- Full upsert supported from profile editor.

Session schema highlights:
- uid
- sessionId
- startTime, endTime
- finalRiskLevel
- explanation
- interactions array
- emailsGenerated
- profileSnapshot
- createdAt server timestamp

Implementation:
- [frontend/src/lib/firestoreService.js](frontend/src/lib/firestoreService.js)

Local fallback:
- simulation_results stored in browser localStorage.
- Ensures dashboard remains useful even if backend/Firestore fails.

---

## 10. Training Subsystem Workflows

### 10.1 Training Hub and Navigation

Files:
- [frontend/src/pages/training/TrainingHome.jsx](frontend/src/pages/training/TrainingHome.jsx)
- [frontend/src/training/components/TrainingLayout.jsx](frontend/src/training/components/TrainingLayout.jsx)
- [frontend/src/training/TrainingStyles.css](frontend/src/training/TrainingStyles.css)
- [frontend/src/training/trainingCatalog.js](frontend/src/training/trainingCatalog.js)

Features:
- Category cards for mission tracks.
- Direct launch to Training Game and Threat Generator.
- Responsive training-specific shell and navigation.

### 10.2 Category and Scenario Simulator

Files:
- [frontend/src/pages/training/TrainingCategory.jsx](frontend/src/pages/training/TrainingCategory.jsx)
- [frontend/src/pages/training/TrainingSimulator.jsx](frontend/src/pages/training/TrainingSimulator.jsx)
- [frontend/src/training/data/trainingScams.js](frontend/src/training/data/trainingScams.js)

Workflow:
- Select category.
- Pick scenario.
- Choose safe/unsafe action.
- Receive immediate feedback.
- View threat analysis with:
  - Attack mechanism
  - Red flags
  - Defense protocol
- Replay or return to directory.

### 10.3 AI Threat Generator

Frontend:
- [frontend/src/pages/training/TrainingThreatGenerator.jsx](frontend/src/pages/training/TrainingThreatGenerator.jsx)

Backend:
- [backend/routes/trainingThreats.js](backend/routes/trainingThreats.js)
- [backend/utils/threatData.js](backend/utils/threatData.js)

Workflow:
- Fetch category list.
- Generate random or category-specific threat.
- Use Gemini first, then local fallback dataset.
- Maintain history and lightweight stats.

Local threat taxonomy includes 10 categories:
- phishing
- malware
- ransomware
- socialEngineering
- passwordAttacks
- ddosAttacks
- cloudSecurity
- iotVulnerabilities
- mobileThreats
- supplyChain

Source:
- [backend/utils/threatData.js](backend/utils/threatData.js)

### 10.4 Training Game (20 Rounds)

Files:
- [frontend/src/pages/training/TrainingGame.jsx](frontend/src/pages/training/TrainingGame.jsx)
- [frontend/src/training/data/gameScenarios.js](frontend/src/training/data/gameScenarios.js)

Game mechanics:
- Difficulty: easy, medium, hard
- Random scenario selection
- 20-round limit
- Score with penalties and streak bonuses
- Instant per-question feedback, prevention tips, risk label
- Final report with achievement tier, accuracy, streak, and score

Scenario pool:
- Large multi-category dataset with helper functions such as getAllScenarios.

---

## 11. UI System and Shared Components

Global theming and base styles:
- [frontend/src/index.css](frontend/src/index.css)

Shared UI:
- Header and auth-aware nav: [frontend/src/components/Header.jsx](frontend/src/components/Header.jsx)
- Button system: [frontend/src/components/Button.jsx](frontend/src/components/Button.jsx)
- Avatar: [frontend/src/components/Avatar.jsx](frontend/src/components/Avatar.jsx)
- Cards, badges, progress, inputs, labels in [frontend/src/components](frontend/src/components)

Notes:
- Styled-components drive most custom UI.
- Framer Motion is used for transitions and interaction feel.
- Training pages use a dedicated CSS stylesheet for consistent visual language.

---

## 12. Practical End-to-End User Journeys

### Journey A: New user to first simulation
- User opens landing page.
- Authenticates with email/Google/GitHub.
- Profile document is initialized in Firestore.
- User enters dashboard and can immediately start simulation.

### Journey B: Profile-aware phishing simulation
- User fills profile details.
- Starts simulation.
- Inbox messages are generated using profile context.
- User actions are logged with timestamps and hesitation.
- Session completes with risk level and AI explanation.
- Results appear in dashboard metrics and history.

### Journey C: Skill-up through training paths
- User enters training directory.
- Runs scenario simulator for curated scam patterns.
- Practices 20-round game for repetitive pattern recognition.
- Uses threat generator for broader threat intelligence exposure.

---

## 13. Reliability and Fallback Strategy

The project is designed to degrade gracefully:
- If Gemini is unavailable, backend falls back to local templates and datasets.
- If Firestore fetch fails, dashboard can read localStorage history.
- If profile details are missing, simulation still runs with generic defaults.
- API response validation protects against malformed model outputs.

Key files:
- [backend/routes/gemini.js](backend/routes/gemini.js)
- [backend/routes/trainingThreats.js](backend/routes/trainingThreats.js)
- [frontend/src/context/SimulationContext.jsx](frontend/src/context/SimulationContext.jsx)
- [frontend/src/lib/firestoreService.js](frontend/src/lib/firestoreService.js)

---

## 14. Summary

The Human Error is not just a phishing quiz app. It is a behavior-centric training platform with:
- Realistic OS-style simulation
- Role/context-tailored lures
- Interaction-level telemetry
- AI-assisted feedback
- Persistent progress analytics
- Separate training pathways for guided learning and challenge practice

This combination supports both awareness training and measurable behavioral improvement over time.
