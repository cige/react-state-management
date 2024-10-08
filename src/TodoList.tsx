import { useEffect, useRef, useState } from 'react'
import { createTodo, fetchTodos } from './api/server'
import { Todo } from './domain/Todo'
import {
  CancelablePromise,
  makeCancellablePromise,
} from './cancellable-promise'

interface TodolistProps {
  search: string
}

export const TodoList = ({ search }: TodolistProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [todos, setTodos] = useState<Todo[]>([])
  const pendingRequest = useRef<CancelablePromise>()

  const syncTodos = () => {
    pendingRequest.current?.cancel()
    const cancellablePromise = makeCancellablePromise(fetchTodos())
    pendingRequest.current = cancellablePromise
    return cancellablePromise.promise
  }

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
      {todos
        .filter((todo) => todo.content.toLowerCase().includes(search))
        .map((todo) => (
          <li key={todo.content}>{todo.content}</li>
        ))}
      <div>Create your todo:</div>
      <form
        onSubmit={(e: any) => {
          e.preventDefault()

          if (e.target[0].value === '') {
            return
          }

          const newTodo = {
            content: e.target[0].value,
          } satisfies Todo

          setTodos((todos) => [...todos, newTodo])
          createTodo(newTodo).then(() => {
            syncTodos().then((todos) => {
              setTodos(todos)
            })
          })
          e.target.reset()
        }}
      >
        <input type="text" />
        <button type="submit"></button>
      </form>
    </ul>
  )
}
