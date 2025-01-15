import { Outlet } from 'react-router';

export function Root() {
  return (
    <>
      <h1>Todos</h1>
      <Outlet />
    </>
  );
}
