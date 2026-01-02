import { useEffect, useState } from "react";
import "./App.css";

const DURATIONS = [25, 55, 85, 115, 145, 175, 205, 235, 265, 295];

export default function App() {
  const [minutes, setMinutes] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);

 
  useEffect(() => {
    setTimeLeft(minutes * 60);
    setRunning(false);
  }, [minutes]);

  
  useEffect(() => {
    if (!running) return;

    const id = setInterval(() => {
      setTimeLeft(t => {
        if (t > 0) return t - 1;

        clearInterval(id);
        setRunning(false);
        alert("⏰ Time is up! Take a break or start the next session.");
        return 0;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [running]);

  const formatTime = t => {
    if (t >= 3600) {
      const hr = Math.floor(t / 3600);
      const min = Math.floor((t % 3600) / 60);
      return `${hr} hr ${min} min`;
    } else {
      const m = String(Math.floor(t / 60)).padStart(2, "0");
      const s = String(t % 60).padStart(2, "0");
      return `${m}:${s}`;
    }
  };

  return (
    <div className="app">
      <h1>FocusFlow</h1>
      <p className="subtitle">Calm focus for deep study</p>

      <div className="card">
        <select onChange={e => setMinutes(Number(e.target.value))}>
          {DURATIONS.map(d => (
            <option key={d} value={d}>{d} min</option>
          ))}
        </select>

        <div className="timer">{formatTime(timeLeft)}</div>

        <div className="controls">
          <button onClick={() => setRunning(true)}>Start</button>
          <button onClick={() => setRunning(false)}>Pause</button>
          <button
            className="secondary"
            onClick={() => {
              setTimeLeft(minutes * 60);
              setRunning(false);
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
