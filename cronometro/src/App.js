import React, { useState, useEffect, useRef } from "react";
import Counter from "./components/counter";
import myaudio from "./assets/song.mp3"
import './styles/App.scss';

function App() {
  const getYear = new Date().getFullYear();

  const [countMin, setCountMin] = useState(0);
  const [countSec, setCountSec] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [control, setControl] = useState(0);
  const [audio, setAudio] = useState(new Audio(myaudio));

  const minute = useRef();
  const second = useRef();

  const handleChange = () => {
    const getMin = minute.current.value;
    const getSec = second.current.value;

    if (getMin <= 1440 && getMin >= 0) setCountMin(+minute.current.value);
    else setCountMin(0);

    if (getSec <= 59 && getSec >= 0) setCountSec(+second.current.value);
    else setCountSec(0);
  }

  const handleReset = () => {
    setCountMin(0);
    setCountSec(0);
    setIsRunning(false);
    setControl(0);
    audio.pause();
    audio.currentTime = 0;
  };

  useEffect(() => {
    let interval = null;

    if (control === 0 && isRunning) {
      setControl(1);
      audio.play();
      audio.loop = true;
    }

    if (control === 1 && !isRunning) {
      setControl(0);
      audio.play();
      audio.loop = true;
    }

    if (isRunning && countMin >= 0 && countSec > 0) {
      interval = setInterval(() => {
        setCountSec(() => countSec - 1);
      }, 1000);
    } else if (isRunning && countMin > 0 && countSec === 0) {
      setCountMin(() => countMin - 1);
      setCountSec(() => 59);
    } else if (!isRunning && countSec !== 0) {
      clearInterval(interval);
      audio.play();
      audio.loop = true;
      setControl(0);
    } else if (isRunning && countMin === 0 && countSec === 0) {
      audio.play();
      audio.loop = true;
      setControl(0);
      clearInterval(interval);
      alert('ACABOOOOOOOU!');
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [countMin, countSec, isRunning]);
  return (
    <div className="App">
      <header>
        <h1>STRANGER TIMER</h1>
      </header>
      <main>
        <Counter
          minute={minute}
          handleChange={handleChange}
          countMin={countMin}
          second={second}
          countSec={countSec}
          setIsRunning={setIsRunning}
          handleReset={handleReset}
        />
      </main>
    </div>
  );
}

export default App;
