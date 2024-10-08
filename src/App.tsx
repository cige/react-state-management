import { useSearchParams } from 'react-router-dom'
import './App.css'
import { TodoList } from './TodoList'
import { ChangeEvent } from 'react'

function App() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('query') ?? ''
  return (
    <div>
      <span>Filter todos:</span>
      <input
        type="text"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setSearchParams({ query: e.target.value })
        }}
        value={query}
      />
      <div>
        <span>My list of things to do:</span>
        <TodoList search={query} />
      </div>
    </div>
  )
}

export default App
