import { Link } from "react-router-dom";
import TrainingLayout from "../../training/components/TrainingLayout";
import { trainingCategories } from "../../training/trainingCatalog";

const TrainingHome = () => {
  return (
    <TrainingLayout
      title="Training Directory"
      subtitle="Select a category to launch immersive simulations and decision-driven practice."
    >
      <section className="training-hero-card">
        <div>
          <p className="training-pill">Live Practice Mode</p>
          <h3>Think like an attacker, respond like a defender.</h3>
          <p>
            Explore realistic social-engineering simulations, run AI-generated threat drills,
            and sharpen your security judgment with instant feedback.
          </p>
        </div>
        <div className="training-hero-actions">
          <Link className="training-cta" to="/training/game">
            Start Game
          </Link>
          <Link className="training-ghost" to="/training/threat-generator">
            Open Threat Generator
          </Link>
        </div>
      </section>

      <section className="training-section-head" aria-label="Category overview">
        <h3>Training Paths</h3>
        <p>Choose a track to start focused practice with realistic lures and guided feedback.</p>
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

export default TrainingHome;

