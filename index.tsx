/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import {useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom/client';

const formatTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

function App() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive]);


  const handlePlay = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleStop = () => {
    setIsActive(false);
    setSeconds(0);
  };

  return (
    <main className="timer-app">
      <div className="timer-display" role="timer" aria-live="polite">
        {formatTime(seconds)}
      </div>
      <div className="controls">
        <button className="play" onClick={handlePlay} disabled={isActive} aria-label="Play timer">
          Play
        </button>
        <button className="pause" onClick={handlePause} disabled={!isActive} aria-label="Pause timer">
          Pause
        </button>
        <button className="stop" onClick={handleStop} aria-label="Stop and reset timer">
          Stop
        </button>
      </div>
    </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
