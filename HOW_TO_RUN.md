# How to Run "The Human Error"

This project consists of a React frontend and a Node.js/Express backend. You need to run both concurrently for the full experience.

## Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

## 1. Backend Setup

The backend handles the AI generation of phishing emails using Google Gemini.

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  **Environment Configuration**:
    -   Create a `.env` file in the `backend` directory.
    -   Add your Google Gemini API key:
        ```env
        GEMINI_API_KEY=your_actual_api_key_here
        PORT=5000
        ```

4.  Start the backend server:
    ```bash
    node server.js
    ```
    -   The server should start on `http://localhost:5000`.

## 2. Frontend Setup

The frontend is the React application where the simulation takes place.

1.  Open a **new terminal** window/tab.

2.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```

3.  Install dependencies:
    ```bash
    npm install
    ```

4.  Start the development server:
    ```bash
    npm run dev
    ```
    -   Access the application at `http://localhost:5173` (or the port shown in your terminal).

## 3. Usage

1.  Open the frontend URL in your browser.
2.  Login (if required) or navigate to the Dashboard.
3.  Click "Start Simulation".
4.  The backend will generate phishing emails.
5.  Interact with the simulated desktop environment.
6.  Click "Stop Simulation" in the top-right corner to finish and view your risk assessment.
