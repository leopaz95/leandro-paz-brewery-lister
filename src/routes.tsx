import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BreweriesPage from './pages/Breweries';
import NotFoundPage from './pages/NotFoundPage';

const basename = '/leandro-paz-brewery-lister';

const router = createBrowserRouter([
  { path: `${basename}/`, element: <BreweriesPage /> },
  { path: `${basename}/*`, element: <NotFoundPage /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
