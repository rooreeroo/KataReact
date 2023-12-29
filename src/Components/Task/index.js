import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import KG from 'date-fns/locale/en-AU'
import PropTypes from 'prop-types'
import './style.css'

import TaskTimer from '../TaskTimer'

export default class Task extends React.Component {
  constructor() {
    super()
    this.state = {
      editing: false,
      value: '',
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false)
    document.addEventListener('click', (e) => this.backDrop(e), false)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false)
  }

  handleSubmit(event) {
    const { value } = this.state
    event.preventDefault()
    const {
      editItem,
      todo: { id },
    } = this.props
    if (value.trim()) editItem(id, value)
    this.setState({
      value: '',
      editing: false,
    })
  }

  backDrop = (e) => {
    const withinBoundaries = e.composedPath().includes(document.querySelector('.edit'))
    const outLine = e.composedPath().includes(document.querySelector('.icon-edit'))

    if (!withinBoundaries && !outLine) {
      const { editing } = this.state
      if (editing) {
        this.setState({
          value: '',
          editing: false,
        })
      }
    }
  }

  escFunction = (event) => {
    if (event.key === 'Escape') {
      this.setState({
        value: '',
        editing: false,
      })
    }
  }

  render() {
    const { changeCheck, todo, deleteItem, subTime } = this.props
    const { body, id, checked, date, timer, display } = todo
    const { editing, value } = this.state
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
          <button
            type="button"
            onClick={() => this.setState(({ edit }) => ({ editing: !edit, value: body }))}
            className="icon icon-edit"
          />
          <button type="button" onClick={() => deleteItem(id)} className="icon icon-destroy" />
        </div>
        {editing && (
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input
              onChange={(event) => this.setState({ value: event.target.value })}
              type="text"
              className="edit"
              value={value}
            />
          </form>
        )}
      </li>
    )
  }
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
