import { Todo } from "./domain/Todo";

interface TodolistProps {
  isLoading: boolean;
  todos: Todo[];
  onTodoCreated: (todo: Todo) => void;
}

export const TodoList = ({
  isLoading,
  todos,
  onTodoCreated,
}: TodolistProps) => {
  if (isLoading) {
    return (
      <ul>
        <span>Loading...</span>
      </ul>
    );
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.content}>{todo.content}</li>
      ))}
      <div>Create your todo:</div>
      <form
        onSubmit={(e: any) => {
          e.preventDefault();

          if (e.target[0].value === "") {
            return;
          }

          const newTodo: Todo = {
            content: e.target[0].value,
          } satisfies Todo;

          onTodoCreated(newTodo);
          e.target.reset();
        }}
      >
        <input type="text" />
        <button type="submit"></button>
      </form>
    </ul>
  );
};
