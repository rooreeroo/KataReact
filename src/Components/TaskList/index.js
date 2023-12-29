import React from 'react'
import './style.css'
import PropTypes from 'prop-types'

import Task from '../Task'

export default function TaskList({ todos, changeCheck, editItem, deleteItem, subTime }) {
  const items = todos.map((todo) => (
    <Task
      key={todo.id}
      changeCheck={changeCheck}
      editItem={editItem}
      deleteItem={deleteItem}
      todo={todo}
      subTime={subTime}
    />
  ))
  return <ul className="todo-list">{items}</ul>
}

TaskList.propTypes = {
  todos: PropTypes.any,
  changeCheck: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
}

TaskList.defaultProps = {
  todos: {},
}
