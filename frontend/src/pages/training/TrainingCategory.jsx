import { Link, Navigate, useParams } from "react-router-dom";
import TrainingLayout from "../../training/components/TrainingLayout";
import { getCategoryById } from "../../training/trainingCatalog";
import trainingScams from "../../training/data/trainingScams";

const previewText = (text = "", max = 180) => {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}...`;
};

const TrainingCategory = () => {
  const { categoryId } = useParams();
  const category = getCategoryById(categoryId);

  if (!category) {
    return <Navigate to="/training" replace />;
  }

  const categoryScams = category.scamIds
    .map((id) => ({ id, ...trainingScams[id] }))
    .filter((item) => Boolean(item.title));

  const estimatedDuration = `${Math.max(6, categoryScams.length * 3)}-${Math.max(10, categoryScams.length * 4)} mins`;

  return (
    <TrainingLayout
      title={category.title}
      subtitle="Pick a simulation scenario and decide your response under pressure."
    >
      <section className="training-category-overview">
        <article>
          <p className="training-kicker">Track Brief</p>
          <h3>{category.title}</h3>
          <p>{category.description}</p>
        </article>
        <div className="training-category-metrics">
          <span className={`training-difficulty training-difficulty-${String(category.difficulty || "medium").toLowerCase()}`}>
            {category.difficulty || "Medium"}
          </span>
          <span className="training-tag">{categoryScams.length} Scenarios</span>
          <span className="training-tag">{estimatedDuration}</span>
        </div>
      </section>

      <section className="training-grid training-scenarios-grid">
        {categoryScams.map((scam) => (
          <article key={scam.id} className="training-card scenario-card">
            <div className="training-card-head">
              <div className="training-card-icon">{category.icon}</div>
              <div className="training-card-meta">
                <span className="training-tag">{String(scam.type || "scenario").toUpperCase()}</span>
                <span className={`training-difficulty training-difficulty-${String(category.difficulty || "medium").toLowerCase()}`}>
                  {category.difficulty || "Medium"}
                </span>
              </div>
            </div>
            <p className="training-kicker">Mission Scenario</p>
            <h4>{scam.title}</h4>
            <p className="scenario-preview">{previewText(scam.mockBody)}</p>
            <div className="scenario-inline-meta">
              <span>Channel: {String(scam.type || "Scenario").toUpperCase()}</span>
              <span>Action Focus: Verify before trust</span>
            </div>
            <div className="scenario-actions">
              <Link className="training-cta" to={`/training/simulator/${scam.id}`}>
                Launch Simulation
              </Link>
            </div>
          </article>
        ))}
      </section>
    </TrainingLayout>
  );
};

export default TrainingCategory;

