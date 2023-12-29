import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

export default class NewTaskForm extends React.Component {
  constructor() {
    super()
    this.state = {
      value: '',
      min: '',
      sec: '',
    }
  }

  handleSubmit = (event) => {
    const { value, min, sec } = this.state
    const { addItem } = this.props
    event.preventDefault()
    if (value.trim() && min.trim().length !== 0 && sec.trim().length !== 0) addItem(value, min, sec)
    this.setState({
      value: '',
      min: '',
      sec: '',
    })
  }

  render() {
    const { placeholder, title } = this.props
    const { value, min, sec } = this.state
    return (
      <form onSubmit={this.handleSubmit} className="header">
        <h1>{title}</h1>
        <input
          className="new-todo"
          placeholder={placeholder}
          onChange={(event) => this.setState({ value: event.target.value })}
          value={value}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          value={min}
          onChange={(event) => this.setState({ min: event.target.value })}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          value={sec}
          onChange={(event) => this.setState({ sec: event.target.value })}
        />
        <input type="submit" hidden="hidden" />
        {/* autoFocus="autofocus" style={{ display: 'none' }} */}
      </form>
    )
  }
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
