import { useEffect, useState } from 'react';
import viteLogo from '/vite.svg';
import reactLogo from './assets/react.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  type Todo = {
    id: number;
    title: string;
    created_at: string;
    updated_at: string;
  };

  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);

      try {
        const response = await fetch('http://localhost:3000/api/todos');

        if (response.ok) {
          const todos: Todo[] = await response.json();
          setTodos(todos);
        } else {
          setError('Unhandled error');
        }
      } catch (error) {
        console.error(error);
        setError(error);
      }

      setIsLoading(false);
    };

    fetchTodos();
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button type="button" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>

      {isLoading ? (
        <p>Fetching todos...</p>
      ) : error ? (
        <p>Error occurred while fetching todos</p>
      ) : (
        todos && (
          <ol>
            {todos.map((todo) => {
              return <li key={todo.id}>{todo.title}</li>;
            })}
          </ol>
        )
      )}
    </>
  );
}

export default App;
