import React, { useEffect, useState } from 'react'
import './style.css'
import propTypes from 'prop-types'

import useInterval from '../../hooks/useInterval'

export default function TaskTimer({ done, subTime, timer, id }) {
  const [timerId, setTimerId] = useState(false)

  const timeToString = () => {
    const min = Math.floor(timer / 60)
    const sec = timer % 60
    return `${min}:${sec.toString().padStart(2, '0')}`
  }

  const stopTimer = () => {
    setTimerId(false)
  }

  useEffect(() => {
    if (timer <= 0 || done) {
      stopTimer()
    }
  }, [timer])

  const startTimer = () => {
    if (!timerId && timer > 0) {
      setTimerId(true)
    }
  }

  useInterval(
    () => {
      subTime(id, timer - 1)
    },
    timerId ? 1000 : null
  )

  return (
    <span className="timer">
      <button className="timer-start" type="button" disabled={done || timer === 0} onClick={startTimer} name="true" />
      <button className="timer-stop" type="button" disabled={done || timer === 0} onClick={stopTimer} name="false" />
      {timeToString()}
    </span>
  )
}

TaskTimer.defaultProps = {
  done: true,
  subTime: () => {},
  id: 0,
  timer: 0,
}

TaskTimer.propTypes = {
  done: propTypes.bool,
  subTime: propTypes.func,
  id: propTypes.number,
  timer: propTypes.number,
}
