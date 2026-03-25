import { useEffect, useMemo, useState } from "react";
import TrainingLayout from "../../training/components/TrainingLayout";

const severityClass = {
  Low: "sev-low",
  Medium: "sev-medium",
  High: "sev-high",
  Critical: "sev-critical",
};

const API_BASE_URL = "http://localhost:5000/api";

const formatTime = (isoString) => {
  if (!isoString) return "Now";
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "Now";
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const deriveSignals = (threat) => {
  const source = `${threat?.title || ""} ${threat?.description || ""}`.toLowerCase();
  const map = [
    { key: "urgency", label: "Urgency Trigger" },
    { key: "credential", label: "Credential Harvesting" },
    { key: "spoof", label: "Identity Spoofing" },
    { key: "download", label: "Malware Delivery" },
    { key: "payment", label: "Financial Fraud" },
    { key: "account", label: "Account Takeover" },
    { key: "social", label: "Social Manipulation" },
  ];

  const matches = map.filter((item) => source.includes(item.key)).map((item) => item.label);
  return matches.length > 0 ? matches.slice(0, 4) : ["Behavioral Deception", "Trust Exploitation"];
};

const TrainingThreatGenerator = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentThreat, setCurrentThreat] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyQuery, setHistoryQuery] = useState("");
  const [analystNotes, setAnalystNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/threats/categories`);
        if (!res.ok) return;
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : []);
      } catch {
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  const stats = useMemo(() => {
    return {
      generated: history.length,
      categories: new Set(history.map((item) => item.category)).size,
      critical: history.filter((item) => item.riskLevel === "Critical").length,
    };
  }, [history]);

  const generateThreat = async () => {
    setLoading(true);
    setError("");

    try {
      const endpoint = selectedCategory
        ? `${API_BASE_URL}/threats/generate?category=${encodeURIComponent(selectedCategory)}`
        : `${API_BASE_URL}/threats/random`;

      const res = await fetch(endpoint);
      if (!res.ok) throw new Error("Failed to generate threat");
      const data = await res.json();

      const enrichedThreat = {
        ...data,
        generatedAt: new Date().toISOString(),
      };

      setCurrentThreat(enrichedThreat);
      setHistory((prev) => [enrichedThreat, ...prev].slice(0, 20));
    } catch (err) {
      setError(err.message || "Could not generate threat.");
    } finally {
      setLoading(false);
    }
  };

  const filteredHistory = useMemo(() => {
    const query = historyQuery.trim().toLowerCase();
    if (!query) return history;

    return history.filter((item) => {
      const stack = `${item.title} ${item.category} ${item.riskLevel}`.toLowerCase();
      return stack.includes(query);
    });
  }, [history, historyQuery]);

  const activeSignals = useMemo(() => deriveSignals(currentThreat || {}), [currentThreat]);

  return (
    <TrainingLayout
      title="AI Threat Generator"
      subtitle="Create realistic threat briefings with AI, inspect patterns, and build faster response instincts."
    >
      <section className="generator-hero-card">
        <div>
          <p className="generator-kicker">Threat Lab</p>
          <h3>Generate scenario-grade attacks for tabletop exercises</h3>
          <p>
            Pick a category, generate a threat, and analyze risk signals before you run response drills.
          </p>
        </div>
        <div className="generator-hero-pill">Model: Live API</div>
      </section>

      <section className="generator-controls generator-controls-redesign">
        <div className="control-group">
          <label>Threat Category</label>
          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            <option value="">Random Category</option>
            {categories.map((cat) => (
              <option value={cat.id} key={cat.id}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group control-group-wide">
          <label>Analyst Notes</label>
          <textarea
            value={analystNotes}
            onChange={(event) => setAnalystNotes(event.target.value)}
            rows={2}
            placeholder="Optional context for your team: high-value assets, active incidents, or constraints..."
          />
        </div>

        <div className="generator-actions">
          <button className="training-cta" onClick={generateThreat} disabled={loading}>
            {loading ? "Generating..." : "Generate Threat"}
          </button>
          <button
            className="training-ghost"
            onClick={() => {
              setHistory([]);
              setCurrentThreat(null);
            }}
            disabled={history.length === 0 && !currentThreat}
          >
            Clear Session
          </button>
        </div>
      </section>

      <section className="stats-row">
        <article className="stat-card">
          <span>Total Generated</span>
          <strong>{stats.generated}</strong>
        </article>
        <article className="stat-card">
          <span>Categories Covered</span>
          <strong>{stats.categories}</strong>
        </article>
        <article className="stat-card">
          <span>Critical Cases</span>
          <strong>{stats.critical}</strong>
        </article>
      </section>

      {error ? <p className="error-text">{error}</p> : null}

      <section className="generator-grid">
        <article className="threat-card threat-card-redesign">
          {!currentThreat ? (
            <div className="threat-empty-state">
              <h4>No active threat dossier</h4>
              <p>Generate a threat to view AI output, severity profile, and prevention controls.</p>
            </div>
          ) : (
            <>
              <div className="threat-head">
                <h3>{currentThreat.title}</h3>
                <span className={`severity ${severityClass[currentThreat.riskLevel] || "sev-medium"}`}>
                  {currentThreat.riskLevel}
                </span>
              </div>
              <p className="threat-category">{currentThreat.categoryTitle || currentThreat.category}</p>

              <section className="dossier-block">
                <h4>Threat Summary</h4>
                <p>{currentThreat.description}</p>
              </section>

              <section className="dossier-block">
                <h4>Detected Signals</h4>
                <div className="signal-tags">
                  {activeSignals.map((signal) => (
                    <span key={signal}>{signal}</span>
                  ))}
                </div>
              </section>

              <section className="dossier-block">
                <h4>Prevention Protocol</h4>
                <ul>
                  {(currentThreat.prevention || []).map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </section>

              {analystNotes.trim() ? (
                <section className="dossier-block analyst-notes">
                  <h4>Analyst Notes</h4>
                  <p>{analystNotes}</p>
                </section>
              ) : null}
            </>
          )}
        </article>

        <aside className="history-card history-card-redesign">
          <div className="history-head">
            <h4>Recent Threats</h4>
            <span>{history.length}/20</span>
          </div>

          <input
            className="history-search"
            type="text"
            value={historyQuery}
            onChange={(event) => setHistoryQuery(event.target.value)}
            placeholder="Search title, category, severity..."
          />

          {filteredHistory.length === 0 ? <p className="history-empty">No matching history.</p> : null}

          {filteredHistory.map((item, idx) => (
            <button
              key={`${item.title}-${idx}`}
              className="history-item"
              onClick={() => setCurrentThreat(item)}
            >
              <div className="history-item-top">
                <strong>{item.title}</strong>
                <em>{formatTime(item.generatedAt)}</em>
              </div>
              <span>{item.category} • {item.riskLevel}</span>
            </button>
          ))}
        </aside>
      </section>
    </TrainingLayout>
  );
};

export default TrainingThreatGenerator;

