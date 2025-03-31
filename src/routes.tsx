import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import BreweriesPage from './pages/Breweries';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([
  { path: '/', element: <BreweriesPage /> },
  { path: '*', element: <NotFoundPage /> },
]);

export default function AppRouter() {
  return (
    <BrowserRouter basename='/leandro-paz-brewery-lister'>
      <RouterProvider router={router} />
    </BrowserRouter>
  );
}
