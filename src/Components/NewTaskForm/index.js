import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './style.css'

export default function NewTaskForm({ addItem, placeholder, title }) {
  const [value, setValue] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (
      value.trim() &&
      Number.isInteger(Number(min.trim())) &&
      min.trim().length !== 0 &&
      Number.isInteger(Number(sec.trim())) &&
      sec.trim().length !== 0
    )
      addItem(value, min, sec)
    setValue('')
    setMin('')
    setSec('')
  }

  return (
    <form onSubmit={handleSubmit} className="header">
      <h1>{title}</h1>
      <input
        type="text"
        className="new-todo"
        placeholder={placeholder}
        onChange={(event) => setValue(event.target.value)}
        value={value}
      />
      <input
        type="number"
        min="0"
        className="new-todo-form__timer"
        placeholder="Min"
        value={min}
        onChange={(event) => setMin(event.target.value)}
      />
      <input
        type="number"
        min="0"
        max="59"
        className="new-todo-form__timer"
        placeholder="Sec"
        value={sec}
        onChange={(event) => setSec(event.target.value)}
      />
      <input type="submit" hidden="hidden" />
    </form>
  )
}

NewTaskForm.propTypes = {
  placeholder: PropTypes.string,
  title: PropTypes.string,
  addItem: PropTypes.func.isRequired,
}
NewTaskForm.defaultProps = {
  placeholder: 'What needs to be done?',
  title: 'Todos',
}
