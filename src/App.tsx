import { useSearchParams } from "react-router-dom";
import "./App.css";
import { TodoList } from "./TodoList";
import { ChangeEvent } from "react";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div>
      <span>My list of things to do:</span>
      <input
        type="text"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setSearchParams({ query: e.target.value });
        }}
      />
      <TodoList search={searchParams.get("query") ?? ""} />
    </div>
  );
}

export default App;
