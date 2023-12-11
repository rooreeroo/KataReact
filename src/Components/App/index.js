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

  addItem = (value) => {
    const data = {
      id: (this.maxId += 1),
      body: value,
      checked: false,
      date: new Date(),
    }
    this.setState(({ todos }) => ({ todos: [...todos, data] }))
  }

  deleteItem = (id) => {
    this.setState(({ todos }) => ({
      todos: todos.filter((item) => item.id !== id),
    }))
  }

  changeCheck = (id, data) => {
    // const checkedTodos = this.state.todos.map((item) => {
    //   if (id === item.id) item.checked = data
    //   return item
    // })
    this.setState(({ todos }) => ({
      todos: todos.map((item) => {
        if (id === item.id) item.checked = data
        return item
      }),
    }))
  }

  editItem = (id, text) => {
    // const editeditem = this.state.todos.map((item) => {
    //   if (item.id === id) item.body = text
    //   return item
    // })
    this.setState(({ todos }) => ({
      todos: todos.map((item) => {
        if (item.id === id) item.body = text
        return item
      }),
    }))
  }

  clearCompleted = () => {
    // const complited = this.state.todos.filter((item) => !item.checked)
    this.setState(({ todos }) => ({ todos: todos.filter((item) => !item.checked) }))
  }

  changeFilter = (data) => {
    this.setState({
      filter: data,
    })
  }

  filteredItems() {
    const { todos, filter } = this.state
    return todos.filter((item) => {

      if (filter === 'All') return true
      if (filter === 'Active') return !item.checked
      if (filter === 'Completed') return item.checked
      return true
    })
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
          todos={this.filteredItems()}
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
