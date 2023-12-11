import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

export default class NewTaskForm extends React.Component {
  constructor() {
    super()
    this.state = {
      value: '',
    }
  }

  handleSubmit = (event) => {
    const { value } = this.state
    const { addItem } = this.props

    event.preventDefault()
    if (value.trim()) addItem(value)
    this.setState({
      value: '',
    })
  }

  render() {
    const { placeholder, title } = this.props
    const { value } = this.state
    return (
      <form onSubmit={this.handleSubmit} className="header">
        <h1>{title}</h1>
        <input
          className="new-todo"
          placeholder={placeholder}
          onChange={(event) => this.setState({ value: event.target.value })}
          value={value}
        />
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
