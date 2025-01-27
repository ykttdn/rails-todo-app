import { Button } from '@/components/ui/button';
import { type SubmitHandler, useForm } from 'react-hook-form';
import type { Todo } from '../types/todo';

type TodoFormProps = { todo: Todo; id: string };

type EditablePartOfTodo = Omit<Todo, 'id' | 'created_at' | 'updated_at'>;

export function TodoForm({ todo, id }: TodoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm<EditablePartOfTodo>();

  const onSubmit: SubmitHandler<EditablePartOfTodo> = async (formData) => {
    try {
      const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const responseJson: { todo: Todo; error: [] } = await response.json();
        console.error(responseJson.error);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
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
  );
}
