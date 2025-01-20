import { Card, CardHeader, CardTitle } from '@/components/ui/card';
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
          <ol className="flex flex-col gap-2">
            {todos.map((todo) => {
              return (
                <>
                  <li key={todo.id}>
                    <Card>
                      <CardHeader className="p-0">
                        <CardTitle>
                          <Link
                            to={`todos/${todo.id}`}
                            className="block p-6 text-gray-600 hover:text-orange-500"
                          >
                            {todo.title}
                          </Link>
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  </li>
                </>
              );
            })}
          </ol>
        )
      )}
    </>
  );
}
