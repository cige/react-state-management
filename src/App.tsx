import { useSearchParams } from "react-router-dom";
import "./App.css";
import { TodoList } from "./TodoList";
import { ChangeEvent, Reducer, useEffect, useReducer, useRef } from "react";
import { Todo } from "./domain/Todo";
import { createTodo, fetchTodos } from "./api/server";
import {
  CancelablePromise,
  makeCancellablePromise,
} from "./cancellable-promise";

export type TodoListState = {
  todos: Todo[];
  search: string;
  isLoading: boolean;
};

type TodoListAction =
  | {
      type: "CREATE_TODO";
      todoToCreate: Todo;
    }
  | {
      type: "FILTER_TODOS";
      search: string;
    }
  | {
      type: "SET_TODOS";
      todos: Todo[];
    };

function reducerFactory(
  createTodo: (todo: Todo) => Promise<void>,
  updateSearchParam: (search: string) => void
): Reducer<TodoListState, TodoListAction> {
  return (state, action) => {
    switch (action.type) {
      case "CREATE_TODO":
        console.log("TT");
        if (
          state.todos.find(
            (todo) => todo.content === action.todoToCreate.content
          )
        ) {
          return state;
        }

        createTodo(action.todoToCreate);
        return {
          ...state,
          todos: [...state.todos, action.todoToCreate],
        };
      case "FILTER_TODOS":
        updateSearchParam(action.search);
        return {
          ...state,
          search: action.search,
        };

      case "SET_TODOS":
        return {
          ...state,
          todos: action.todos,
          isLoading: false,
        };
      default:
        return state;
    }
  };
}

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pendingRequest = useRef<CancelablePromise>();

  const syncTodos = () => {
    pendingRequest.current?.cancel();
    const cancellablePromise = makeCancellablePromise(fetchTodos());
    pendingRequest.current = cancellablePromise;
    return cancellablePromise.promise;
  };

  const [state, dispatch] = useReducer(
    reducerFactory(createTodo, (search) => setSearchParams({ query: search })),
    {
      todos: [],
      search: searchParams.get("query") ?? "",
      isLoading: true,
    }
  );

  useEffect(() => {
    fetchTodos().then((todos) => {
      dispatch({ type: "SET_TODOS", todos });
    });
  }, []);

  return (
    <div>
      <span>Filter todos:</span>
      <input
        type="text"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          dispatch({ type: "FILTER_TODOS", search: e.target.value });
        }}
        value={state.search}
      />
      <div>
        <span>My list of things to do:</span>
        <TodoList
          isLoading={state.isLoading}
          todos={state.todos.filter((todo) =>
            todo.content.includes(state.search)
          )}
          onTodoCreated={(todo) => {
            console.log("AA");
            dispatch({ type: "CREATE_TODO", todoToCreate: todo });
            /*  syncTodos().then((todos) => {
              dispatch({ type: "SET_TODOS", todos });
            }); */
          }}
        />
      </div>
    </div>
  );
}

export default App;
