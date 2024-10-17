import { useSearchParams } from 'react-router-dom'
import './App.css'
import { TodoList } from './TodoList'
import { ChangeEvent, Reducer, useEffect, useReducer, useRef } from 'react'
import { createTodo, fetchTodos } from './api/server'
import {
  CancelablePromise,
  makeCancellablePromise,
} from './cancellable-promise'
import { useMachine } from '@xstate/react'
import { todosMachine } from './domain/machine'

function App() {
  const [searchParams, setSearchParams] = useSearchParams()
  // const pendingRequest = useRef<CancelablePromise>();

  // const syncTodos = () => {
  //   pendingRequest.current?.cancel();
  //   const cancellablePromise = makeCancellablePromise(fetchTodos());
  //   pendingRequest.current = cancellablePromise;
  //   return cancellablePromise.promise;
  // };

  const [snapshot, send] = useMachine(
    todosMachine.provide({
      actions: {
        fetchTodos: ({ context, event }) => {
          console.log('fetchingTodos', context, event)
          // fetchTodos().then((todos) => {
          //   send({ type: 'todosLoaded', todos })
          // }
        },
      },
    })
  )

  return (
    <div>
      <span>Filter todos:</span>
      <input type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => {}} />
      <div>
        <span>My list of things to do:</span>
        <TodoList
          isLoading={snapshot.matches('Starting')}
          todos={snapshot.context.todos}
          onTodoCreated={(todo) => {
            console.log('AA')
            // dispatch({ type: 'CREATE_TODO', todoToCreate: todo })
            /*  syncTodos().then((todos) => {
              dispatch({ type: "SET_TODOS", todos });
            }); */
          }}
        />
      </div>
    </div>
  )
}

export default App
