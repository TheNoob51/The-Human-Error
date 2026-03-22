import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import TurnSimulation from "./pages/TurnSimulation";
import TrainingHome from "./pages/training/TrainingHome";
import TrainingCategory from "./pages/training/TrainingCategory";
import TrainingSimulator from "./pages/training/TrainingSimulator";
import TrainingThreatGenerator from "./pages/training/TrainingThreatGenerator";
import TrainingGame from "./pages/training/TrainingGame";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/login" element={<Auth initialMode="login" />} />
          <Route path="/signup" element={<Auth initialMode="signup" />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/simulation"
            element={
              <ProtectedRoute>
                <TurnSimulation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/training"
            element={
              <ProtectedRoute>
                <TrainingHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/training/threat-generator"
            element={
              <ProtectedRoute>
                <TrainingThreatGenerator />
              </ProtectedRoute>
            }
          />
          <Route
            path="/training/game"
            element={
              <ProtectedRoute>
                <TrainingGame />
              </ProtectedRoute>
            }
          />
          <Route
            path="/training/simulator/:scamId"
            element={
              <ProtectedRoute>
                <TrainingSimulator />
              </ProtectedRoute>
            }
          />
          <Route
            path="/training/:categoryId"
            element={
              <ProtectedRoute>
                <TrainingCategory />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

