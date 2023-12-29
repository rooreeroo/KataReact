import React from 'react'
import './style.css'
import propTypes from 'prop-types'

export default class TaskTimer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timerId: null,
    }
  }

  componentDidUpdate(prevProps) {
    const { timer, done } = this.props
    const { timerId } = this.state
    if ((prevProps.timer !== timer && timer <= 0) || done) {
      clearInterval(timerId)
    }
  }

  componentWillUnmount() {
    this.stopTimer()
  }

  timeToString = () => {
    const { timer } = this.props
    const min = Math.floor(timer / 60)
    const sec = timer % 60
    return `${min}:${sec.toString().padStart(2, '0')}`
  }

  startTimer = () => {
    const { subTime, timer, id } = this.props
    const { timerId } = this.state
    let newTimer
    if (!timerId && timer > 0) {
      this.setState({
        timerId: setInterval(() => {
          // eslint-disable-next-line
          newTimer = this.props.timer - 1
          subTime(id, newTimer)
        }, 1000),
      })
    }
  }
  // Без отключения eslint
  // startTimer = () => {
  //   const { subTime, timer, id } = this.props
  //   const { timerId } = this.state
  //   let newTimer = timer
  //   if (!timerId && timer > 0) {
  //     this.setState({
  //       timerId: setInterval(() => {
  //         newTimer -= 1
  //         subTime(id, newTimer)
  //       }, 1000),
  //     })
  //   }
  // }

  stopTimer = () => {
    const { timerId } = this.state
    clearInterval(timerId)
    this.setState({ timerId: null })
  }

  render() {
    const { done, timer } = this.props
    return (
      <span className="timer">
        <button
          className="timer-start"
          type="button"
          disabled={done || timer === 0}
          onClick={this.startTimer}
          name="true"
        />
        <button
          className="timer-stop"
          type="button"
          disabled={done || timer === 0}
          onClick={this.stopTimer}
          name="false"
        />
        {this.timeToString()}
      </span>
    )
  }
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
