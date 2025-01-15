import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import './index.css';
import { Root } from './routes/Root.tsx';
import { Index } from './routes/todos/Index.tsx';
import { TodoItem } from './routes/todos/TodoItem.tsx';

// biome-ignore lint/style/noNonNullAssertion:
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Root />}>
          <Route path="/" element={<Index />} />
          <Route path="todos/:id" element={<TodoItem />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
