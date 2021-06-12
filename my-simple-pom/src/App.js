import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import React, { useState, useEffect } from 'react'
import Complete from './Complete';

const PomodoroTimer = () => {

  // change variable names
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = React.useState(100);
  let pomodoroTime = 120

  function pomodoroToggle() {
    setIsActive(!isActive)
  }

  function resetPomodoro() {
    setSeconds(0)
    setProgress(100)
    setIsActive(false)
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
        setProgress(progress => progress - 0.03703704);
      }, 1000);

      if (seconds > 2700) {
       resetPomodoro()
      }
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isActive, seconds, progress])

  return (
    <div className="Container">
      <div className="ProgressbarContainer">
        <CircularProgress size={500} variant="determinate" value={progress} />
      </div>
      <div>

        <h1 className="Time">{seconds}s</h1>
      </div>
      <div className="ButtonContainer">
        <button onClick={pomodoroToggle}>Start</button>
        <button onClick={resetPomodoro}>Reset</button>
      </div>
    </div>
  )
}

export default PomodoroTimer;
