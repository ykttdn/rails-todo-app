import { useEffect, useState } from 'react';

function App() {
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
