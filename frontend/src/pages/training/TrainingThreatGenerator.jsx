import { useEffect, useMemo, useState } from "react";
import TrainingLayout from "../../training/components/TrainingLayout";
import { useAuth } from "../../context/AuthContext";
import {
  getUserThreatBriefings,
  saveThreatBriefing,
  updateThreatBriefing,
} from "../../lib/firestoreService";
import { API_BASE_URL } from "../../constants";

const severityClass = {
  Low: "sev-low",
  Medium: "sev-medium",
  High: "sev-high",
  Critical: "sev-critical",
};

const riskOptions = ["Low", "Medium", "High", "Critical"];

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
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRiskLevel, setSelectedRiskLevel] = useState("");
  const [currentThreat, setCurrentThreat] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyQuery, setHistoryQuery] = useState("");
  const [cloudLoading, setCloudLoading] = useState(false);
  const [savingToCloud, setSavingToCloud] = useState(false);
  const [updatingCloudThreat, setUpdatingCloudThreat] = useState(false);
  const [cloudNotice, setCloudNotice] = useState("");
  const [improveDraft, setImproveDraft] = useState({
    title: "",
    description: "",
    preventionText: "",
  });
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

  useEffect(() => {
    const loadCloudThreats = async () => {
      if (!user?.uid) {
        setHistory([]);
        return;
      }

      setCloudLoading(true);
      setCloudNotice("");

      try {
        const cloudThreats = await getUserThreatBriefings(user.uid);
        const mapped = cloudThreats.map((threat) => ({
          ...threat,
          cloudId: threat.id,
          savedInCloud: true,
        }));
        setHistory(mapped);
      } catch {
        setCloudNotice("Unable to load saved threats right now.");
      } finally {
        setCloudLoading(false);
      }
    };

    loadCloudThreats();
  }, [user?.uid]);

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
      const params = new URLSearchParams();
      if (selectedCategory) params.set("category", selectedCategory);
      if (selectedRiskLevel) params.set("riskLevel", selectedRiskLevel);

      const endpoint = selectedCategory
        ? `${API_BASE_URL}/threats/generate?${params.toString()}`
        : `${API_BASE_URL}/threats/random${params.toString() ? `?${params.toString()}` : ""}`;

      const res = await fetch(endpoint);
      if (!res.ok) throw new Error("Failed to generate threat");
      const data = await res.json();

      const enrichedThreat = {
        ...data,
        generatedAt: new Date().toISOString(),
        savedInCloud: false,
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

  useEffect(() => {
    if (!currentThreat) {
      setImproveDraft({ title: "", description: "", preventionText: "" });
      return;
    }

    setImproveDraft({
      title: currentThreat.title || "",
      description: currentThreat.description || "",
      preventionText: (currentThreat.prevention || []).join("\n"),
    });
  }, [currentThreat]);

  const normalizePreventionText = (value) => {
    return value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const handleSaveCurrentThreat = async () => {
    if (!user?.uid || !currentThreat) {
      setCloudNotice("Sign in and generate a threat before saving.");
      return;
    }

    if (currentThreat.savedInCloud && currentThreat.cloudId) {
      setCloudNotice("This threat is already saved in cloud.");
      return;
    }

    setSavingToCloud(true);
    setCloudNotice("");

    try {
      const newId = await saveThreatBriefing(user.uid, currentThreat);
      const savedThreat = {
        ...currentThreat,
        cloudId: newId,
        savedInCloud: true,
      };

      setCurrentThreat(savedThreat);
      setHistory((prev) => {
        const next = prev.map((item) => (item === currentThreat ? savedThreat : item));
        return next;
      });
      setCloudNotice("Threat saved to cloud.");
    } catch {
      setCloudNotice("Could not save threat to cloud.");
    } finally {
      setSavingToCloud(false);
    }
  };

  const handleImproveAndSave = async () => {
    if (!user?.uid || !currentThreat?.cloudId) {
      setCloudNotice("Save the threat first, then improve it.");
      return;
    }

    const updatedThreat = {
      ...currentThreat,
      title: improveDraft.title.trim() || currentThreat.title,
      description: improveDraft.description.trim() || currentThreat.description,
      prevention: normalizePreventionText(improveDraft.preventionText),
      updatedAtLocal: new Date().toISOString(),
      savedInCloud: true,
    };

    setUpdatingCloudThreat(true);
    setCloudNotice("");

    try {
      await updateThreatBriefing(user.uid, currentThreat.cloudId, {
        title: updatedThreat.title,
        description: updatedThreat.description,
        prevention: updatedThreat.prevention,
      });

      setCurrentThreat(updatedThreat);
      setHistory((prev) => prev.map((item) => (
        item.cloudId === currentThreat.cloudId ? { ...item, ...updatedThreat } : item
      )));
      setCloudNotice("Threat improvements saved to cloud.");
    } catch {
      setCloudNotice("Could not update the cloud threat.");
    } finally {
      setUpdatingCloudThreat(false);
    }
  };

  return (
    <TrainingLayout
      title="AI Threat Generator"
      subtitle="Generate realistic threat briefings and review key risk patterns in a focused workspace."
    >

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

        <div className="control-group">
          <label>Threat Level</label>
          <select
            value={selectedRiskLevel}
            onChange={(event) => setSelectedRiskLevel(event.target.value)}
          >
            <option value="">Any Level</option>
            {riskOptions.map((level) => (
              <option value={level} key={level}>{level}</option>
            ))}
          </select>
        </div>

        <div className="generator-actions">
          <button className="training-cta" onClick={generateThreat} disabled={loading}>
            {loading ? "Generating..." : "Generate Threat"}
          </button>
          <button
            className="training-ghost"
            onClick={handleSaveCurrentThreat}
            disabled={!currentThreat || savingToCloud || !user?.uid}
          >
            {savingToCloud ? "Saving..." : "Save To Cloud"}
          </button>
          <button
            className="training-ghost"
            onClick={() => {
              setHistory([]);
              setCurrentThreat(null);
            }}
            disabled={history.length === 0 && !currentThreat && !cloudLoading}
          >
            Clear Session
          </button>
        </div>
      </section>

      {cloudNotice ? <p className="cloud-note">{cloudNotice}</p> : null}

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
              {currentThreat.savedInCloud ? <p className="cloud-tag">Saved In Cloud</p> : null}

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

              <section className="dossier-block improve-block">
                <h4>Improve And Save</h4>
                <input
                  className="improve-input"
                  value={improveDraft.title}
                  onChange={(event) => setImproveDraft((prev) => ({ ...prev, title: event.target.value }))}
                  placeholder="Improve title"
                />
                <textarea
                  className="improve-textarea"
                  value={improveDraft.description}
                  onChange={(event) => setImproveDraft((prev) => ({ ...prev, description: event.target.value }))}
                  rows={4}
                  placeholder="Improve description"
                />
                <textarea
                  className="improve-textarea"
                  value={improveDraft.preventionText}
                  onChange={(event) => setImproveDraft((prev) => ({ ...prev, preventionText: event.target.value }))}
                  rows={4}
                  placeholder="One prevention item per line"
                />
                <button
                  className="training-cta"
                  onClick={handleImproveAndSave}
                  disabled={updatingCloudThreat || !currentThreat.savedInCloud || !user?.uid}
                >
                  {updatingCloudThreat ? "Saving Improvements..." : "Save Improvements"}
                </button>
              </section>
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

          {cloudLoading ? <p className="history-empty">Loading cloud threats...</p> : null}

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

