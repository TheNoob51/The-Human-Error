import { Link } from "react-router-dom";
import TrainingLayout from "../../training/components/TrainingLayout";
import { trainingCategories } from "../../training/trainingCatalog";

const TrainingPaths = () => {
  return (
    <TrainingLayout
      title="Training Paths"
      subtitle="Choose a focused category and launch a simulation scenario."
    >
      <section className="training-section-head" aria-label="Category overview">
        <h3>Available Paths</h3>
        <p>Select one track to start practical decision-based practice.</p>
      </section>

      <section className="training-grid">
        {trainingCategories.map((category) => (
          <Link className="training-card" key={category.id} to={`/training/${category.id}`}>
            <div className="training-card-head">
              <div className="training-card-icon">{category.icon}</div>
              <span className={`training-difficulty training-difficulty-${String(category.difficulty || "medium").toLowerCase()}`}>
                {category.difficulty || "Medium"}
              </span>
            </div>
            <p className="training-kicker">Mission Track</p>
            <h4>{category.title}</h4>
            <p>{category.description}</p>
          </Link>
        ))}
      </section>
    </TrainingLayout>
  );
};

export default TrainingPaths;
