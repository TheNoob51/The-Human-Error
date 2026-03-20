import { useEffect, useMemo, useState } from "react";
import TrainingLayout from "../../training/components/TrainingLayout";

const severityClass = {
  Low: "sev-low",
  Medium: "sev-medium",
  High: "sev-high",
  Critical: "sev-critical",
};

const API_BASE_URL = "http://localhost:5000/api";

const TrainingThreatGenerator = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentThreat, setCurrentThreat] = useState(null);
  const [history, setHistory] = useState([]);
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

      setCurrentThreat(data);
      setHistory((prev) => [data, ...prev].slice(0, 20));
    } catch (err) {
      setError(err.message || "Could not generate threat.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TrainingLayout
      title="AI Threat Generator"
      subtitle="Generate realistic cybersecurity threat cases for drill practice and response planning."
    >
      <section className="generator-controls">
        <div className="control-group">
          <label>Category</label>
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

        <button className="training-cta" onClick={generateThreat} disabled={loading}>
          {loading ? "Generating..." : "Generate Threat"}
        </button>
      </section>

      <section className="stats-row">
        <article className="stat-card"><span>Total Generated</span><strong>{stats.generated}</strong></article>
        <article className="stat-card"><span>Categories Covered</span><strong>{stats.categories}</strong></article>
        <article className="stat-card"><span>Critical Cases</span><strong>{stats.critical}</strong></article>
      </section>

      {error ? <p className="error-text">{error}</p> : null}

      <section className="generator-grid">
        <article className="threat-card">
          {!currentThreat ? (
            <p>Generate a threat to begin.</p>
          ) : (
            <>
              <div className="threat-head">
                <h3>{currentThreat.title}</h3>
                <span className={`severity ${severityClass[currentThreat.riskLevel] || "sev-medium"}`}>
                  {currentThreat.riskLevel}
                </span>
              </div>
              <p className="threat-category">{currentThreat.categoryTitle || currentThreat.category}</p>
              <p>{currentThreat.description}</p>
              <h4>Prevention</h4>
              <ul>
                {(currentThreat.prevention || []).map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </>
          )}
        </article>

        <aside className="history-card">
          <h4>Recent Threats</h4>
          {history.length === 0 ? <p>No history yet.</p> : null}
          {history.map((item, idx) => (
            <button
              key={`${item.title}-${idx}`}
              className="history-item"
              onClick={() => setCurrentThreat(item)}
            >
              <strong>{item.title}</strong>
              <span>{item.category} • {item.riskLevel}</span>
            </button>
          ))}
        </aside>
      </section>
    </TrainingLayout>
  );
};

export default TrainingThreatGenerator;
