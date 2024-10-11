import { Todo } from "../domain/Todo";

function readTodosFromLocalStorage(): Todo[] {
  const todos = localStorage.getItem("todos");
  if (todos) {
    return JSON.parse(todos);
  }
  return [];
}

function writeTodosToLocalStorage(todos: Todo[]): void {
  localStorage.setItem("todos", JSON.stringify(todos));
}

export function fetchTodos(): Promise<Todo[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...readTodosFromLocalStorage()]);
    }, 2000);
  });
}

export function createTodo(todo: Todo): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("CC");
      const todos = readTodosFromLocalStorage();
      writeTodosToLocalStorage([...todos, todo]);
      resolve();
    }, 1000);
  });
}
