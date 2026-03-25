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
      const senderRaw = scam.mockSender || "Unknown Sender";
      const senderMatch = senderRaw.match(/^\s*(.*?)\s*<([^>]+)>\s*$/);
      const senderName = senderMatch?.[1] || senderRaw;
      const senderEmail = senderMatch?.[2] || "unknown@source.local";

      return (
        <article className="sim-email-frame" aria-label="Simulated email">
          <div className="sim-email-toolbar">
            <span className="sim-toolbar-pill">Inbox</span>
            <span className="sim-toolbar-pill">Unread</span>
            <span className="sim-toolbar-time">Today, 9:41 AM</span>
          </div>

          <div className="sim-email-shell">
            <header className="sim-email-header">
              <div className="sim-avatar" aria-hidden="true">
                {senderName.charAt(0).toUpperCase()}
              </div>
              <div className="sim-email-headcopy">
                <h4>{scam.mockSubject}</h4>
                <p>
                  <strong>{senderName}</strong>
                  <span>{` <${senderEmail}>`}</span>
                </p>
              </div>
            </header>

            <dl className="sim-email-meta">
              <div>
                <dt>From</dt>
                <dd>{scam.mockSender}</dd>
              </div>
              <div>
                <dt>To</dt>
                <dd>you@company.com</dd>
              </div>
              <div>
                <dt>Subject</dt>
                <dd>{scam.mockSubject}</dd>
              </div>
            </dl>

            <div className="sim-message">{scam.mockBody}</div>
          </div>
        </article>
      );
    }

    if (scam.type === "phone") {
      const senderRaw = scam.mockSender || "Unknown";
      const firstUrl = scam.mockBody.match(/https?:\/\/\S+/i)?.[0] || null;

      return (
        <article className="sim-phone-frame" aria-label="Simulated mobile message">
          <div className="sim-phone-notch" aria-hidden="true" />

          <div className="sim-phone-status">
            <span>9:41</span>
            <span>4G</span>
          </div>

          <div className="sim-phone-appbar">
            <div className="sim-phone-avatar" aria-hidden="true">
              {senderRaw.charAt(0).toUpperCase()}
            </div>
            <div>
              <h4>{senderRaw}</h4>
              <p>Text Message</p>
            </div>
          </div>

          <div className="sim-phone-chat">
            <div className="sim-sms-bubble incoming">
              <p>{scam.mockBody}</p>
              {firstUrl ? <span className="sim-sms-link">{firstUrl}</span> : null}
              <time>Today 9:41 AM</time>
            </div>
          </div>
        </article>
      );
    }

    if (scam.type === "whatsapp") {
      const senderRaw = scam.mockSender || "Unknown";
      const firstUrl = scam.mockBody.match(/https?:\/\/\S+/i)?.[0] || null;

      return (
        <article className="sim-whatsapp-frame" aria-label="Simulated WhatsApp message">
          <div className="sim-whatsapp-appbar">
            <div className="sim-whatsapp-avatar" aria-hidden="true">
              {senderRaw.charAt(0).toUpperCase()}
            </div>
            <div>
              <h4>{senderRaw}</h4>
              <p>online</p>
            </div>
          </div>

          <div className="sim-whatsapp-chat">
            <div className="sim-wa-bubble">
              <small>Forwarded</small>
              <p>{scam.mockBody}</p>
              {firstUrl ? <span className="sim-wa-link">{firstUrl}</span> : null}
              <time>09:41</time>
            </div>
          </div>
        </article>
      );
    }

    if (scam.type === "social") {
      const senderRaw = scam.mockSender || "Unknown Contact";

      return (
        <article className="sim-social-frame" aria-label="Simulated social message">
          <header className="sim-social-head">
            <div className="sim-social-avatar" aria-hidden="true">
              {senderRaw.charAt(0).toUpperCase()}
            </div>
            <div>
              <h4>{senderRaw}</h4>
              <p>{scam.mockSubject || "Direct Message"}</p>
            </div>
            <span className="sim-social-badge">Now</span>
          </header>

          <div className="sim-social-message">
            <p>{scam.mockBody}</p>
            <div className="sim-social-meta">
              <span>Private message</span>
              <span>Needs immediate reply</span>
            </div>
          </div>
        </article>
      );
    }

    if (scam.type === "web") {
      const senderRaw = scam.mockSender || "Unknown Site";
      const firstUrl = scam.mockBody.match(/https?:\/\/\S+/i)?.[0] || "https://secure-update-center.net";

      return (
        <article className="sim-web-frame" aria-label="Simulated phishing website">
          <div className="sim-web-bar">
            <span className="sim-web-dot" />
            <span className="sim-web-dot" />
            <span className="sim-web-dot" />
            <div className="sim-web-address">{firstUrl}</div>
          </div>

          <div className="sim-web-content">
            <h4>{senderRaw}</h4>
            <h5>{scam.mockSubject || "Security Notice"}</h5>
            <p>{scam.mockBody}</p>
            <button type="button" className="sim-web-cta">
              Continue Verification
            </button>
          </div>
        </article>
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
              <Link className="training-ghost" to="/training/paths">
                Back to Training Paths
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
              <Link className="training-cta" to="/training/paths">
                Back to Training Paths
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

