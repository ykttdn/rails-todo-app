import { useParams } from 'react-router';
import { useGetRequest } from '../../hooks/useGetRequest';
import type { Todo } from './types/todo';

type Response = {
  todo: Todo;
  error: [];
};

export function TodoItem() {
  const { id } = useParams();

  const { data, error, isLoading } = useGetRequest<Response>(
    `http://localhost:3000/api/todos/${id}`,
  );
  const todo = data?.todo;

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
