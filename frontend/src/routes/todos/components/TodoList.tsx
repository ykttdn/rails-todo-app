import { Link } from 'react-router';
import type { Todo } from '../types/todo';

type TodoListProps = {
  todos: Todo[];
};

export function TodoList({ todos }: TodoListProps) {
  const handleClick = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        window.alert('Failed to delete todo');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ol className="flex flex-col gap-2">
      {todos.map((todo) => {
        return (
          <li key={todo.id} className="flex items-center rounded-lg border-2 border-gray-200">
            <Link
              to={`todos/${todo.id}`}
              className="block grow p-6 text-2xl font-semibold text-gray-600 hover:text-orange-500"
            >
              {todo.title}
            </Link>
            <div className="pr-4">
              <button
                type="button"
                className="btn btn-outline btn-error"
                onClick={() => handleClick(todo.id)}
              >
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
