import { Link, useLocation } from "react-router-dom";
import "../TrainingStyles.css";

const navItems = [
  { to: "/training", label: "Directory" },
  { to: "/training/threat-generator", label: "Threat Generator" },
  { to: "/training/game", label: "Training Game" },
  { to: "/dashboard", label: "Dashboard" },
];

const TrainingLayout = ({ title, subtitle, children }) => {
  const location = useLocation();

  return (
    <div className="training-shell">
      <div className="training-orb training-orb-a" />
      <div className="training-orb training-orb-b" />
      <div className="training-orb training-orb-c" />

      <header className="training-header">
        <div className="training-logo-wrap">
          <span className="training-logo-badge">🛡️</span>
          <div>
            <p className="training-logo-kicker">The Human Error</p>
            <h1 className="training-logo-title">Training</h1>
          </div>
        </div>

        <nav className="training-nav">
          {navItems.map((item) => {
            const active = item.to === "/training"
              ? location.pathname.startsWith("/training") && !location.pathname.startsWith("/training/threat-generator") && !location.pathname.startsWith("/training/game")
              : location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`training-nav-link ${active ? "active" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="training-main">
        <section className="training-title-bar">
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </section>

        {children}
      </main>
    </div>
  );
};

export default TrainingLayout;
