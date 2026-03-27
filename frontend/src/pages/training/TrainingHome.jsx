import { Link } from "react-router-dom";
import TrainingLayout from "../../training/components/TrainingLayout";

const TrainingHome = () => {
  return (
    <TrainingLayout
      title="Training Overview"
      subtitle="Quick start hub for practice modules, scenario paths, and AI-generated drills."
    >
      <section className="training-hero-card">
        <div>
          <p className="training-pill">Quick Intro</p>
          <h3>Build safer instincts in minutes.</h3>
          <p>
            Start with guided scenarios, sharpen decision-making, and test your response style
            with practical simulations.
          </p>
        </div>
        <div className="training-hero-actions">
          <Link className="training-cta" to="/training/paths">
            Go to Training Paths
          </Link>
          <Link className="training-ghost" to="/training/game">
            Open Training Game
          </Link>
        </div>
      </section>

      <section className="training-section-head" aria-label="Training destinations">
        <h3>Where do you want to go?</h3>
        <p>Pick one module and continue.</p>
      </section>

      <section className="training-grid training-grid-three">
        <Link className="training-card" to="/training/paths">
          <p className="training-kicker">Primary</p>
          <h4>Training Paths</h4>
          <p>Browse category-based scenarios and launch simulation drills.</p>
        </Link>

        <Link className="training-card" to="/training/game">
          <p className="training-kicker">Challenge</p>
          <h4>Training Game</h4>
          <p>Play randomized rounds with scoring, streaks, and feedback.</p>
        </Link>

        <Link className="training-card" to="/training/threat-generator">
          <p className="training-kicker">AI Module</p>
          <h4>Threat Generator</h4>
          <p>Generate fresh threat cases to test awareness and response plans.</p>
        </Link>
      </section>
    </TrainingLayout>
  );
};

export default TrainingHome;

