import React from 'react'
import './style.css'

import Footer from '../Footer'
import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'

export default class App extends React.Component {
  maxId = 0

  constructor() {
    super()
    this.state = {
      todos: [],
      filter: 'All',
    }
  }

  subTime = (id, newTimer) => {
    this.setState(({ todos }) => ({
      todos: todos.map((item) => {
        if (item.id === id) item.timer = newTimer
        return item
      }),
    }))
  }

  addItem = (value, min, sec) => {
    const data = {
      id: (this.maxId += 1),
      body: value,
      display: true,
      checked: false,
      date: new Date(),
      timer: Number(min) * 60 + Number(parseInt(sec, 10)),
    }
    this.setState(({ todos }) => ({ todos: [...todos, data] }))
  }

  deleteItem = (id) => {
    this.setState(({ todos }) => ({
      todos: todos.filter((item) => item.id !== id),
    }))
  }

  changeCheck = (id) => {
    this.setState(({ todos }) => ({
      todos: todos.map((item) => {
        if (id === item.id) item.checked = !item.checked
        return item
      }),
    }))
    // eslint-disable-next-line
    this.changeFilter(this.state.filter)
  }

  editItem = (id, text) => {
    this.setState(({ todos }) => ({
      todos: todos.map((item) => {
        if (item.id === id) item.body = text
        return item
      }),
    }))
  }

  clearCompleted = () => {
    this.setState(({ todos }) => ({ todos: todos.filter((item) => !item.checked) }))
  }

  changeFilter = (data) => {
    this.setState(({ todos }) => ({
      filter: data,
      todos: todos.map((task) => {
        let display = true
        if (data === 'Active') display = !task.checked
        if (data === 'Completed') display = task.checked
        // eslint-disable-next-line
        return { ...task, display: display }
      }),
    }))
  }

  render() {
    const { todos, filter } = this.state
    return (
      <section className="todoapp">
        <NewTaskForm title="todos" placeholder="What needs to be done?" addItem={this.addItem} />
        <TaskList
          changeCheck={this.changeCheck}
          editItem={this.editItem}
          deleteItem={this.deleteItem}
          todos={todos}
          subTime={this.subTime}
        />
        <Footer
          changeFilter={this.changeFilter}
          clearCompleted={this.clearCompleted}
          lefts={todos.filter(({ checked }) => !checked).length}
          filter={filter}
        />
      </section>
    )
  }
}
