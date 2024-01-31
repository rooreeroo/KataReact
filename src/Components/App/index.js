import React, { useState } from 'react'
import './style.css'

import Footer from '../Footer'
import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'

export default function App() {
  let maxId = 0
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('All')

  const subTime = (id, newTimer) => {
    setTodos(
      todos.map((item) => {
        if (item.id === id) item.timer = newTimer
        return item
      })
    )
  }

  const addItem = (value, min, sec) => {
    const data = {
      id: (maxId += 1),
      body: value,
      display: true,
      checked: false,
      date: new Date(),
      timer: Number(min) * 60 + Number(parseInt(sec, 10)),
    }
    setTodos([...todos, data])
  }

  const deleteItem = (id) => {
    setTodos(todos.filter((item) => item.id !== id))
  }

  const changeFilter = (data) => {
    setFilter(data)
    const newTodos = todos.map((task) => {
      let display = true
      if (data === 'Active') display = !task.checked
      if (data === 'Completed') display = task.checked
      // eslint-disable-next-line
      return { ...task, display: display }
    })
    setTodos(newTodos)
  }

  const changeCheck = (id) => {
    setTodos(
      todos.map((item) => {
        if (id === item.id) item.checked = !item.checked
        return item
      })
    )
    changeFilter(filter)
  }

  const editItem = (id, text) => {
    const newTodos = todos.map((item) => {
      if (item.id === id) item.body = text
      return item
    })
    setTodos(newTodos)
  }

  const clearCompleted = () => {
    setTodos(todos.filter((item) => !item.checked))
  }

  return (
    <React.StrictMode>
      <section className="todoapp">
        <NewTaskForm title="todos" placeholder="What needs to be done?" addItem={addItem} />
        <TaskList
          changeCheck={changeCheck}
          editItem={editItem}
          deleteItem={deleteItem}
          todos={todos}
          subTime={subTime}
        />
        <Footer
          changeFilter={changeFilter}
          clearCompleted={clearCompleted}
          lefts={todos.filter(({ checked }) => !checked).length}
          filter={filter}
        />
      </section>
    </React.StrictMode>
  )
}
