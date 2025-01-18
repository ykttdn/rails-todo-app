import { Link } from 'react-router';
import { useGetRequest } from '../../hooks/useGetRequest';
import type { Todo } from './types/todo';

type Response = Todo[];

export function Index() {
  const {
    data: todos,
    error,
    isLoading,
  } = useGetRequest<Response>('http://localhost:3000/api/todos');

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
              return (
                <li key={todo.id}>
                  <Link to={`todos/${todo.id}`} className="text-gray-600 hover:text-orange-500">
                    {todo.title}
                  </Link>
                </li>
              );
            })}
          </ol>
        )
      )}
    </>
  );
}
