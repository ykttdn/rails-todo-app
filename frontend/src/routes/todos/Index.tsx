import { Link } from 'react-router';
import { useGetRequest } from '../../hooks/useGetRequest';
import type { Todo } from './types/todo';

export function Index() {
  const {
    data: todos,
    error,
    isLoading,
  } = useGetRequest<Todo[]>('http://localhost:3000/api/todos');

  return (
    <>
      {isLoading ? (
        <p>Fetching todos...</p>
      ) : error ? (
        <p>Error occurred while fetching todos</p>
      ) : (
        todos && (
          <ol className="flex flex-col gap-2">
            {todos.map((todo) => {
              return (
                <li key={todo.id} className="rounded-lg border-2 border-gray-200">
                  <Link
                    to={`todos/${todo.id}`}
                    className="block p-6 text-2xl font-semibold text-gray-600 hover:text-orange-500"
                  >
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
