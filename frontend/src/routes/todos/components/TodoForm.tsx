import { Button, Field, Input, Label } from '@headlessui/react';
import dayjs from 'dayjs';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import type { Todo } from '../types/todo';
import { FormErrors } from './FormErrors';

type TodoFormProps = { initialTodo: Todo; id: string };

type EditablePartOfTodo = Omit<Todo, 'id' | 'created_at' | 'updated_at'>;

export function TodoForm({ initialTodo, id }: TodoFormProps) {
  const [todo, setTodo] = useState(initialTodo);
  const [errors, setErrors] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: validationErrors, isDirty, isValid },
  } = useForm<EditablePartOfTodo>({
    defaultValues: {
      title: todo.title,
    },
    mode: 'onChange',
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
        setErrors(responseJson.error);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        {errors.length > 0 && <FormErrors errors={errors} />}

        <Field className="flex flex-col gap-2">
          <Label htmlFor="title" className="font-medium">
            Title
          </Label>

          {validationErrors.title?.message && (
            <p className="text-red-700">{validationErrors.title?.message}</p>
          )}

          <Input
            id="title"
            className="input input-bordered"
            {...register('title', {
              required: "Title can't be blank",
              maxLength: { value: 140, message: 'Title is too long (maximum is 140 characters)' },
              pattern: { value: /^(?![\x20\u3000]*$).*/, message: "Title can't be blank" },
            })}
          />
        </Field>

        <Button type="submit" disabled={!(isDirty && isValid)} className="btn btn-neutral">
          Update
        </Button>
      </form>

      <ul className="mt-4">
        <li>created: {dayjs(todo.created_at).format('YYYY/MM/DD HH:mm:ss')}</li>
        <li>updated: {dayjs(todo.updated_at).format('YYYY/MM/DD HH:mm:ss')}</li>
      </ul>
    </>
  );
}
