import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import type { Todo } from '../types/todo';
import { TodoForm } from './TodoForm';

const user = userEvent.setup();

beforeEach(() => {
  const id = '1';
  const initialTodo: Todo = {
    id: Number.parseInt(id, 10),
    title: 'do the dishes',
    created_at: '2025-01-01T00:00:00.000Z',
    updated_at: '2025-02-03T20:00:00.000Z',
  };

  render(<TodoForm initialTodo={initialTodo} id={id} />);
});

afterEach(() => {
  cleanup();
});

describe('submit button', () => {
  test('initially disabled', () => {
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('enabled when fields are dirty', async () => {
    expect(screen.getByRole('button')).toBeDisabled();

    const titleTextBox = screen.getByRole('textbox', { name: 'Title' });
    await user.clear(titleTextBox);
    await user.type(titleTextBox, 'do the laundry');

    expect(screen.getByRole('button')).toBeEnabled();
  });

  test('disabled when same values are input', async () => {
    const titleTextBox = screen.getByRole('textbox', { name: 'Title' });
    await user.clear(titleTextBox);
    await user.type(titleTextBox, 'do the dishes');

    expect(screen.getByRole('button')).toBeDisabled();
  });
});
