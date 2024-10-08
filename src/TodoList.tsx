import { useEffect, useState } from 'react'
import { createTodo, fetchTodos } from './api/server'
import { Todo } from './domain/Todo'

export const TodoList = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    fetchTodos().then((todos) => {
      setTodos(todos)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return (
      <ul>
        <span>Loading...</span>
      </ul>
    )
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.content}</li>
      ))}
      <div>Create your todo:</div>
      <form
        onSubmit={(e: any) => {
          e.preventDefault()
          const newTodo = {
            id: Math.random().toString(36).substring(7),
            content: e.target[0].value,
          }
          // Create a new todo
          createTodo(newTodo).then(() => {
            fetchTodos().then((todos) => {
              setTodos(todos)
            })
          })
          //setTodos((todos) => [...todos, newTodo])
          e.target.reset()
        }}
      >
        <input type="text" />
        <button type="submit"></button>
      </form>
    </ul>
  )
}
