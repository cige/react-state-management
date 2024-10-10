import { useSearchParams } from "react-router-dom";
import "./App.css";
import { TodoList } from "./TodoList";
import { ChangeEvent, Reducer, useEffect, useReducer } from "react";
import { Todo } from "./domain/Todo";
import { fetchTodos } from "./api/server";

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
      type: "INITIALIZE_TODOS";
      todos: Todo[];
    };

function reducerFactory(
  updateSearchParam: (search: string) => void
): Reducer<TodoListState, TodoListAction> {
  return (state, action) => {
    switch (action.type) {
      case "CREATE_TODO":
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

      case "INITIALIZE_TODOS":
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

  const [state, dispatch] = useReducer(
    reducerFactory((search) => setSearchParams({ query: search })),
    {
      todos: [],
      search: searchParams.get("query") ?? "",
      isLoading: true,
    }
  );

  useEffect(() => {
    fetchTodos().then((todos) => {
      dispatch({ type: "INITIALIZE_TODOS", todos });
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
        />
      </div>
    </div>
  );
}

export default App;
