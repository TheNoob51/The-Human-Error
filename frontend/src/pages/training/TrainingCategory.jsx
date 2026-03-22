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

  return (
    <TrainingLayout
      title={category.title}
      subtitle="Pick a simulation scenario and decide your response under pressure."
    >
      <section className="training-grid">
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

