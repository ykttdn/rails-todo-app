import { useParams } from 'react-router';
import { useGetRequest } from '../../hooks/useGetRequest';
import { TodoForm } from './components/TodoForm';
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

  if (isLoading) {
    return <p>Fetching todo...</p>;
  }

  if (error) {
    return <p>Error occurred while fetching todo</p>;
  }

  return <>{todo && id && <TodoForm initialTodo={todo} id={id} />}</>;
}
