import { Button } from '@/components/ui/button';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { useGetRequest } from '../../hooks/useGetRequest';
import type { Todo } from './types/todo';

type Response = {
  todo: Todo;
  error: [];
};

type EditablePartOfTodo = Omit<Todo, 'id' | 'created_at' | 'updated_at'>;

export function TodoItem() {
  const { id } = useParams();

  const { data, error, isLoading } = useGetRequest<Response>(
    `http://localhost:3000/api/todos/${id}`,
  );
  const todo = data?.todo;

  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm<EditablePartOfTodo>();

  const onSubmit: SubmitHandler<EditablePartOfTodo> = (formData) => {
    console.log(formData);
  };

  if (isLoading) {
    return <p>Fetching todo...</p>;
  }

  if (error) {
    return <p>Error occurred while fetching todo</p>;
  }

  return (
    <>
      {todo && (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="title">Title</label>
            <input id="title" defaultValue={todo.title} {...register('title')} />
            <Button type="submit" disabled={!isDirty}>
              Update
            </Button>
          </form>
          <ul>
            <li>created: {todo.created_at}</li>
            <li>updated: {todo.updated_at}</li>
          </ul>
        </>
      )}
    </>
  );
}
