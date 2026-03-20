import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import TrainingLayout from "../../training/components/TrainingLayout";
import trainingScams from "../../training/data/trainingScams";

const TrainingSimulator = () => {
  const { scamId } = useParams();
  const scam = trainingScams[scamId];

  const [step, setStep] = useState("hook");
  const [isSafeChoice, setIsSafeChoice] = useState(null);

  const mockBody = useMemo(() => {
    if (!scam) return "";

    if (scam.type === "email") {
      return (
        <div className="sim-email-box">
          <p><strong>From:</strong> {scam.mockSender}</p>
          <p><strong>Subject:</strong> {scam.mockSubject}</p>
          <div className="sim-message">{scam.mockBody}</div>
        </div>
      );
    }

    return <div className="sim-message">{scam.mockBody}</div>;
  }, [scam]);

  if (!scam) {
    return <Navigate to="/training" replace />;
  }

  const handleChoice = (safe) => {
    setIsSafeChoice(safe);
    setStep("feedback");
  };

  const feedback = isSafeChoice ? scam.feedbackGood : scam.feedbackBad;

  return (
    <TrainingLayout
      title={`Simulation: ${scam.title}`}
      subtitle="Review the lure, make a decision, and inspect the analysis."
    >
      <section className="sim-panel">
        {step === "hook" ? (
          <>
            <h3>Incoming Scenario</h3>
            {mockBody}
            <div className="sim-choices">
              <button className="choice bad" onClick={() => handleChoice(false)}>
                {scam.actionBad}
              </button>
              <button className="choice good" onClick={() => handleChoice(true)}>
                {scam.actionGood}
              </button>
            </div>
          </>
        ) : null}

        {step === "feedback" ? (
          <>
            <div className={`feedback-card ${isSafeChoice ? "safe" : "danger"}`}>
              <span className="feedback-icon">{feedback.icon}</span>
              <h3>{feedback.title}</h3>
              <p>{feedback.msg}</p>
            </div>
            <div className="sim-choices">
              <button className="training-cta" onClick={() => setStep("analysis")}>
                Analyze Threat
              </button>
              <Link className="training-ghost" to="/training">
                Back to Directory
              </Link>
            </div>
          </>
        ) : null}

        {step === "analysis" ? (
          <>
            <div className="analysis-card">
              <h4>How it Works</h4>
              <p>{scam.edu.how}</p>
            </div>
            <div className="analysis-card">
              <h4>Red Flags</h4>
              <ul>
                {scam.edu.flags.map((flag) => (
                  <li key={flag}>{flag}</li>
                ))}
              </ul>
            </div>
            <div className="analysis-card">
              <h4>Defense Protocol</h4>
              <p>{scam.edu.defense}</p>
            </div>
            <div className="sim-choices">
              <Link className="training-cta" to="/training">
                Back to Directory
              </Link>
              <button
                className="training-ghost"
                onClick={() => {
                  setStep("hook");
                  setIsSafeChoice(null);
                }}
              >
                Replay Scenario
              </button>
            </div>
          </>
        ) : null}
      </section>
    </TrainingLayout>
  );
};

export default TrainingSimulator;
