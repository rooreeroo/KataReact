import React, { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import KG from 'date-fns/locale/en-AU'
import PropTypes from 'prop-types'
import './style.css'

import TaskTimer from '../TaskTimer'

export default function Task({ changeCheck, editItem, deleteItem, todo, subTime }) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState('')

  const { body, id, checked, date, timer, display } = todo

  const backDrop = (e) => {
    const withinBoundaries = e.composedPath().includes(document.querySelector('.edit'))
    const outLine = e.composedPath().includes(document.querySelector('.icon-edit'))

    if (!withinBoundaries && !outLine) {
      if (editing) {
        setEditing(false)
        setValue('')
      }
    }
  }

  const escFunction = (event) => {
    if (event.key === 'Escape') {
      setEditing(false)
      setValue('')
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false)
    document.addEventListener('click', (e) => backDrop(e), false)
    return () => {
      document.removeEventListener('keydown', escFunction, false)
    }
  })

  function handleSubmit(event) {
    event.preventDefault()

    if (value.trim()) editItem(todo.id, value)
    setEditing(false)
    setValue('')
  }

  function handleChange() {
    setEditing(!editing)
    setValue(body)
  }

  let classNames = ''
  classNames += !display ? 'hidden' : ''
  classNames += checked ? ' completed' : ''
  classNames += editing ? ' editing' : ''

  return (
    <li className={classNames}>
      <div className="view">
        <input id={id} className="toggle" type="checkbox" onChange={() => changeCheck(id)} checked={checked} />
        <label htmlFor={id}>
          <span className="description">{body}</span>
          <TaskTimer done={checked} subTime={subTime} id={id} timer={timer} />
          <span className="created">
            {`created ${formatDistanceToNow(date, {
              includeSeconds: true,
              locale: KG,
              addSuffix: true,
            })}`}
          </span>
        </label>
        <button type="button" onClick={handleChange} className="icon icon-edit" />
        <button type="button" onClick={() => deleteItem(id)} className="icon icon-destroy" />
      </div>
      {editing && (
        <form onSubmit={handleSubmit}>
          <input onChange={(event) => setValue(event.target.value)} type="text" className="edit" value={value} />
        </form>
      )}
    </li>
  )
}

Task.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    body: PropTypes.string,
    checked: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
  }),
  deleteItem: PropTypes.func.isRequired,
  changeCheck: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
}

Task.defaultProps = {
  todo: {},
}
