import { Todo } from "../domain/Todo";

const serverTodos = [
  { id: "1", content: "Buy milk" },
  { id: "2", content: "Buy eggs" },
  { id: "3", content: "Buy bread" },
];

export function fetchTodos(): Promise<Todo[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...serverTodos]);
    }, 2000);
  });
}

export function createTodo(todo: Todo): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      serverTodos.push(todo);
      resolve();
    }, 1000);
  });
}
