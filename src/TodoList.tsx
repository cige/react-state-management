import { useEffect, useState } from "react";
import { createTodo, fetchTodos } from "./api/server";
import { Todo } from "./domain/Todo";

interface TodolistProps {
  search: string;
}

export const TodoList = ({ search }: TodolistProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos().then((todos) => {
      setTodos(todos);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <ul>
        <span>Loading...</span>
      </ul>
    );
  }

  return (
    <ul>
      {todos
        .filter((todo) => todo.content.toLowerCase().includes(search))
        .map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      <div>Create your todo:</div>
      <form
        onSubmit={(e: any) => {
          e.preventDefault();

          if (e.target[0].value === "") {
            return;
          }

          const newTodo = {
            id: Math.random().toString(36).substring(7),
            content: e.target[0].value,
          };

          setTodos((todos) => [...todos, newTodo]);
          createTodo(newTodo).then(() => {
            fetchTodos().then((todos) => {
              setTodos(todos);
            });
          });
          e.target.reset();
        }}
      >
        <input type="text" />
        <button type="submit"></button>
      </form>
    </ul>
  );
};
