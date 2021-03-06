import React from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format'
import { Button, Row, Col } from 'react-bootstrap'
import { useState } from 'react';

momentDurationFormatSetup(moment)

const Timer = props => {
  const [intervalId, setIntervalId] = useState(null)
  const [timerLength, setTimerLength] = useState(0)
  
const decrementTimerLength = () => {
  const newTimerLength = timerLength - 60

  if (newTimerLength < 0) {
    setTimerLength(0)
  } else {
    setTimerLength(newTimerLength)
  }
};

// const incrementTimerLength = () => {
//   setTimerLength(timerLength + 60)
// };

const incrementTimerLengthByTen = () => {
  setTimerLength(timerLength + 600)
};

const handleClose = () => {
  props.removeTimer(props.id);
};

const isStarted = intervalId !== null

const handleStartStopClick = () => {
  if (isStarted) {
  clearInterval(intervalId)
  setIntervalId(null)
  } else {
    const newIntervalId = setInterval(() => {
    setTimerLength(prevTimerLength => {
      const newTimerLength = prevTimerLength - 1;
      if (newTimerLength >= 0) {
        return prevTimerLength - 1
      }
      return prevTimerLength
    });
  }, 1000);
  setIntervalId(newIntervalId)
  }
}

const handleReset = () => {
  clearInterval(intervalId)
  setIntervalId(null)
  setTimerLength(0)
}

const timerLengthMinutes = moment.duration(timerLength, 's').format('mm:ss', {trim: false})

return (
  <div className="timer">
    <Row>
      <Col>
      <input className="timerInput" ></input>
      </Col>
    </Row>
    <Button className="timerButton" variant="outline-dark" onClick={handleStartStopClick}>{isStarted ? 'Stop' : 'Start'}</Button>
    <Button className="timerButton" variant="outline-dark" onClick={handleReset}>Reset</Button>
    <p className="counter">{timerLengthMinutes}</p>
    <Button className="timerButton" variant="outline-dark" onClick={decrementTimerLength}>-1</Button>
    <Button className="timerButton" variant="outline-dark" onClick={handleClose}>X</Button>
    <Button className="timerButton" variant="outline-dark" onClick={incrementTimerLengthByTen}>+10</Button>
  </div>
)
}
  
export default Timer;
