import { useMemo, useState } from "react";
import TrainingLayout from "../../training/components/TrainingLayout";
import { getAllScenarios } from "../../training/data/gameScenarios";

const scoringRules = {
  easy: { correct: 10, wrong: -5, streakBonus: 0 },
  medium: { correct: 20, wrong: -10, streakBonus: 5 },
  hard: { correct: 50, wrong: -20, streakBonus: 15 },
};

const getAchievement = (accuracy, maxStreak) => {
  if (maxStreak >= 10) return "Unstoppable";
  if (accuracy >= 90) return "Expert";
  if (accuracy >= 75) return "Strong";
  if (accuracy >= 50) return "Learning";
  return "Getting Started";
};

const TrainingGame = () => {
  const allScenarios = useMemo(() => getAllScenarios(), []);

  const [phase, setPhase] = useState("start");
  const [difficulty, setDifficulty] = useState("medium");
  const [current, setCurrent] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [usedIds, setUsedIds] = useState([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);

  const totalPlayed = correct + wrong;
  const accuracy = totalPlayed > 0 ? Math.round((correct / totalPlayed) * 100) : 0;

  const pickScenario = (exclude = []) => {
    const available = allScenarios.filter((scenario) => !exclude.includes(scenario.id));
    if (available.length === 0) return null;
    const selected = available[Math.floor(Math.random() * available.length)];
    return selected;
  };

  const startGame = (mode) => {
    const first = pickScenario([]);
    setDifficulty(mode);
    setCurrent(first);
    setUsedIds(first ? [first.id] : []);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setCorrect(0);
    setWrong(0);
    setFeedback(null);
    setPhase("play");
  };

  const submitAnswer = (optionId) => {
    if (!current) return;

    const isCorrect = current.correctAnswers.includes(optionId);
    const rules = scoringRules[difficulty];

    if (isCorrect) {
      const nextStreak = streak + 1;
      const bonus = nextStreak > 1 && nextStreak % 3 === 0 ? rules.streakBonus * Math.floor(nextStreak / 3) : 0;
      setScore((prev) => prev + rules.correct + bonus);
      setStreak(nextStreak);
      setMaxStreak((prev) => (nextStreak > prev ? nextStreak : prev));
      setCorrect((prev) => prev + 1);
    } else {
      setScore((prev) => Math.max(0, prev + rules.wrong));
      setStreak(0);
      setWrong((prev) => prev + 1);
    }

    setFeedback({
      isCorrect,
      explanation: current.explanation,
      prevention: current.prevention,
      riskLevel: current.riskLevel,
    });
    setPhase("feedback");
  };

  const nextScenario = () => {
    const next = pickScenario(usedIds);
    if (!next || totalPlayed >= 19) {
      setPhase("results");
      return;
    }

    setCurrent(next);
    setUsedIds((prev) => [...prev, next.id]);
    setFeedback(null);
    setPhase("play");
  };

  return (
    <TrainingLayout
      title="Training Game"
      subtitle="Challenge mode with randomized scenarios, streak scoring, and instant response analysis."
    >
      {phase === "start" ? (
        <section className="game-start">
          <h3>Choose Difficulty</h3>
          <div className="difficulty-grid">
            <button className="difficulty-btn" onClick={() => startGame("easy")}>Easy</button>
            <button className="difficulty-btn" onClick={() => startGame("medium")}>Medium</button>
            <button className="difficulty-btn" onClick={() => startGame("hard")}>Hard</button>
          </div>
          <p>20-round challenge using realistic phishing, SMS, social, and malware scenarios.</p>
        </section>
      ) : null}

      {phase === "play" && current ? (
        <section className="game-play">
          <div className="game-stats">
            <span>Difficulty: {difficulty}</span>
            <span>Score: {score}</span>
            <span>Streak: {streak}</span>
            <span>Round: {totalPlayed + 1}/20</span>
          </div>

          <article className="scenario-block">
            <h3>{current.title}</h3>
            <p className="scenario-meta">{current.category || current.type} • {current.riskLevel}</p>
            <pre>{current.content}</pre>

            <div className="options-grid">
              {current.options.map((option) => (
                <button key={option.id} className="option-btn" onClick={() => submitAnswer(option.id)}>
                  <span>{option.emoji}</span> {option.text}
                </button>
              ))}
            </div>
          </article>
        </section>
      ) : null}

      {phase === "feedback" && feedback ? (
        <section className={`feedback-card ${feedback.isCorrect ? "safe" : "danger"}`}>
          <h3>{feedback.isCorrect ? "You are safe" : "You got hacked"}</h3>
          <p>{feedback.explanation}</p>
          <p><strong>Risk Level:</strong> {feedback.riskLevel}</p>
          <h4>Prevention Tips</h4>
          <ul>
            {feedback.prevention.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
          <button className="training-cta" onClick={nextScenario}>
            Next Scenario
          </button>
        </section>
      ) : null}

      {phase === "results" ? (
        <section className="results-card">
          <h3>Game Over</h3>
          <p>Achievement: {getAchievement(accuracy, maxStreak)}</p>
          <div className="results-grid">
            <article><span>Final Score</span><strong>{score}</strong></article>
            <article><span>Accuracy</span><strong>{accuracy}%</strong></article>
            <article><span>Correct</span><strong>{correct}</strong></article>
            <article><span>Wrong</span><strong>{wrong}</strong></article>
            <article><span>Max Streak</span><strong>{maxStreak}</strong></article>
            <article><span>Difficulty</span><strong>{difficulty}</strong></article>
          </div>
          <button className="training-cta" onClick={() => setPhase("start")}>Play Again</button>
        </section>
      ) : null}
    </TrainingLayout>
  );
};

export default TrainingGame;

