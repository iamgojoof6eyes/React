import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './contexts/TodoContext'
import TodoForm from './components/TodoForms'
import TodoItem from './components/TodoItems'

function App() {

  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), todo, completed: false}, ...prev])
  }

  const rmTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => (todo.id !== id)))
  }

  const editTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const markDone = (id) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? {...todo, completed: !todo.completed} : todo)))
  }

  useEffect(
    () => {
      const todos = JSON.parse(localStorage.getItem("todos"))

      if (todos && todos.length > 0) {
        setTodos(todos)
      }
    },
    []
  )

  useEffect(
    () => {
      localStorage.setItem("todos", JSON.stringify(todos))
    },
    [todos]
  )

  return (
    <TodoProvider value={{todos, addTodo, rmTodo, editTodo, markDone}}>
      <div className='min-h-screen bg-black text-white'>
        <div className='w-full rounded-lg mx-auto px-2 py-3'>
          <h1 className='text-center text-2xl font-bold mb-2 mt-3'>Manage your todos</h1>
          <div className='mt-3 mb-3'>
            <TodoForm />
          </div>
          <div className='flex flex-wrap gap-y-3'>
            {
              todos.map((todo) => (
                <div key={todo.id} className='w-full'>
                  <TodoItem todo={todo} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
