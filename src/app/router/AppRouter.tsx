import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PublicLayout } from '../../layouts/PublicLayout';
import { ClientLayout } from '../../layouts/ClientLayout';
import { AdminLayout } from '../../layouts/AdminLayout';
import { PrivateRoute } from './PrivateRoute';
import { AdminRoute } from './AdminRoute';
import { FullPageSpinner } from '../../components/ui/Spinner';


const BillboardPage = lazy(() => import('../../features/movies/pages/BillboardPage').then(m => ({ default: m.BillboardPage })));
const MovieDetailPage = lazy(() => import('../../features/movies/pages/MovieDetailPage').then(m => ({ default: m.MovieDetailPage })));

const LoginPage = lazy(() => import('../../features/auth/pages/LoginPage').then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('../../features/auth/pages/RegisterPage').then(m => ({ default: m.RegisterPage })));

const SeatSelectionPage = lazy(() => import('../../features/reservations/pages/SeatSelectionPage').then(m => ({ default: m.SeatSelectionPage })));
const ConfirmReservationPage = lazy(() => import('../../features/reservations/pages/ConfirmReservationPage').then(m => ({ default: m.ConfirmReservationPage })));
const MyReservationsPage = lazy(() => import('../../features/reservations/pages/MyReservationsPage').then(m => ({ default: m.MyReservationsPage })));

const DashboardPage = lazy(() => import('../../features/admin/pages/DashboardPage').then(m => ({ default: m.DashboardPage })));
const MoviesAdminPage = lazy(() => import('../../features/movies/pages/MoviesAdminPage').then(m => ({ default: m.MoviesAdminPage })));
const CreateMoviePage = lazy(() => import('../../features/movies/pages/CreateMoviePage').then(m => ({ default: m.CreateMoviePage })));
const EditMoviePage = lazy(() => import('../../features/movies/pages/EditMoviePage').then(m => ({ default: m.EditMoviePage })));
const RoomsPage = lazy(() => import('../../features/rooms/pages/RoomsPage').then(m => ({ default: m.RoomsPage })));
const CreateRoomPage = lazy(() => import('../../features/rooms/pages/CreateRoomPage').then(m => ({ default: m.CreateRoomPage })));
const EditRoomPage = lazy(() => import('../../features/rooms/pages/EditRoomPage').then(m => ({ default: m.EditRoomPage })));
const CreateShowtimePage = lazy(() => import('../../features/showtimes/pages/CreateShowtimePage').then(m => ({ default: m.CreateShowtimePage })));
const ShowtimesAdminPage = lazy(() => import('../../features/showtimes/pages/ShowtimesAdminPage').then(m => ({ default: m.ShowtimesAdminPage })));
const ShowtimeSelectionPage = lazy(() => import('../../features/showtimes/pages/ShowtimeSelectionPage').then(m => ({ default: m.ShowtimeSelectionPage })));
const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <BillboardPage /> },
      { path: '/movies/:id', element: <MovieDetailPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
    ],
  },

{
    element: <PrivateRoute />,
    children: [
      {
        element: <ClientLayout />,
        children: [
          { path: '/showtimes/select', element: <ShowtimeSelectionPage /> },
          { path: '/showtimes/:id/seats', element: <SeatSelectionPage /> },
          { path: '/reservations/confirm', element: <ConfirmReservationPage /> },
          { path: '/my-reservations', element: <MyReservationsPage /> },
        ],
      },
    ],
  },

{
    element: <AdminRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: '/admin', element: <DashboardPage /> },
          { path: '/admin/movies', element: <MoviesAdminPage /> },
          { path: '/admin/movies/create', element: <CreateMoviePage /> },
          { path: '/admin/movies/:id/edit', element: <EditMoviePage /> },
          { path: '/admin/rooms', element: <RoomsPage /> },
          { path: '/admin/rooms/create', element: <CreateRoomPage /> },
          { path: '/admin/rooms/:id/edit', element: <EditRoomPage /> },
          { path: '/admin/showtimes', element: <ShowtimesAdminPage /> },
          { path: '/admin/showtimes/create', element: <CreateShowtimePage /> },
        ],
      },
    ],
  },
]);

export function AppRouter() {
  return (
    <Suspense fallback={<FullPageSpinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
