import React from 'react'
import './style.css'
import PropTypes from 'prop-types'

import TaskFilter from '../TasksFilter'

export default function Footer({ lefts, clearCompleted, changeFilter, filter }) {
  return (
    <footer className="footer">
      <span className="todo-count">
        {lefts}
        &nbsp;items left
      </span>
      <TaskFilter filter={filter} changeFilter={changeFilter} />
      <button type="button" onClick={clearCompleted} className="clear-completed">
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  lefts: PropTypes.number,
  clearCompleted: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
  filter: PropTypes.string,
}
Footer.defaultProps = {
  lefts: 0,
  filter: 'All',
}
