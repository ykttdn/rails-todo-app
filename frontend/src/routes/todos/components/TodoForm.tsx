import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import type { Todo } from '../types/todo';

type TodoFormProps = { initialTodo: Todo; id: string };

type EditablePartOfTodo = Omit<Todo, 'id' | 'created_at' | 'updated_at'>;

export function TodoForm({ initialTodo, id }: TodoFormProps) {
  const [todo, setTodo] = useState(initialTodo);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<EditablePartOfTodo>({
    defaultValues: {
      title: todo.title,
    },
  });

  const onSubmit: SubmitHandler<EditablePartOfTodo> = async (formData) => {
    try {
      const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      });
      const responseJson: { todo: Todo; error: [] } = await response.json();

      if (response.ok) {
        const updatedTodo = responseJson.todo;
        setTodo(updatedTodo);
        reset({ title: updatedTodo.title });
      } else {
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
        <input id="title" {...register('title')} />
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
