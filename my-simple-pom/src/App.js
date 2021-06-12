import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect } from 'react'

const PomodoroTimer = () => {

  // change variable names
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function pomodoroToggle(){
    setIsActive(!isActive)
  }

  function resetPomodoro(){
    setSeconds(0)
    setIsActive(false)
  }

  useEffect(() => {
    let interval = null;
    if(isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if(!isActive && seconds !== 0) {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [isActive, seconds])

  return (
    <div>
      <div>
      {seconds}s
      </div>
      <div>
        <button onClick={pomodoroToggle}>Start</button>
        <button onClick={resetPomodoro}>Reset</button>
      </div>
    </div>
  )
}

export default PomodoroTimer;
