import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import React, { useState, useEffect } from 'react'
import Complete from './Complete';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const PomodoroTimer = () => {



  // change variable names
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = React.useState(100);

  const timeContainer = {
    width: "300px",
    height: "50px",
    marginTop: "48px",
    borderRadius: "25px",
    backgroundColor: "#9cacdc",
  }
  let pomodoroTime = 120

  function pomodoroToggle() {
    setIsActive(!isActive)
  }

  function resetPomodoro() {
    setSeconds(0)
    setProgress(100)
    setIsActive(false)
  }

  //
  //function 

  const classes = useStyles();

  const [focusTime, setTime] = useState('');
  const [shortBreakInterval, setShortBreakInterval] = useState('')  
  const [longBreakInterval, setLongBreakInterval] = useState('')  
  const [disableLongBreak, setDisableLongBreak] = useState(false)
  const [disableShortBreak, setDisableShortBreak] =useState(false) 

  const handleChangeFocusTime = (event) => {
    setTime(event.target.value)
  }

  const handleChangeShortBreakInterval = (event) => {
    setDisableLongBreak(true)
    setShortBreakInterval(event.target.value)
  }

  const handleChangeLongBreakInterval = (event) => {
    setDisableShortBreak(true)
    setLongBreakInterval(event.target.value)
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
    <div>
    <div className="focus-time-container">
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel>Focus Time</InputLabel>
        <Select 
        value={focusTime}
        onChange={handleChangeFocusTime}
        >
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={45}>45</MenuItem>
          <MenuItem value={60}>60</MenuItem>
        </Select>
      </FormControl>
    </div>
    <div>
    <FormControl className={classes.formControl}>
        <InputLabel>Short Break</InputLabel>
        <Select
        disabled={disableShortBreak}
        value={shortBreakInterval}
        onChange={handleChangeShortBreakInterval}
        >
          <MenuItem value={30}>5</MenuItem>
          <MenuItem value={45}>10</MenuItem>
          <MenuItem value={60}>15</MenuItem>
        </Select>
      </FormControl>
    </div>
    <div>
    <FormControl className={classes.formControl}>
        <InputLabel>Long Break</InputLabel>
        <Select
        disabled={disableLongBreak}
        value={longBreakInterval}
        onChange={handleChangeLongBreakInterval}
        >
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={45}>45</MenuItem>
          <MenuItem value={60}>60</MenuItem>
        </Select>
      </FormControl>
    </div>
  </div>

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
    </div>
  )
}

export default PomodoroTimer;
