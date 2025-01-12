import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

type Todo = {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
};

type Response = {
  todo: Todo;
  error: [];
};

export function TodoItem() {
  const { id } = useParams();

  const [todo, setTodo] = useState<Todo>();
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTodo = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`http://localhost:3000/api/todos/${id}`);

        if (response.ok) {
          const data: Response = await response.json();
          setTodo(data.todo);
        } else {
          setError('Unhandled error');
        }
      } catch (error) {
        console.error(error);
        setError(error);
      }

      setIsLoading(false);
    };

    fetchTodo();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <p>Fetching todo...</p>
      ) : error ? (
        <p>Error occurred while fetching todo</p>
      ) : (
        todo && (
          <ul>
            <li>{todo.id}</li>
            <li>{todo.title}</li>
            <li>{todo.created_at}</li>
            <li>{todo.updated_at}</li>
          </ul>
        )
      )}
    </>
  );
}
