import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { FullPageSpinner } from '../../components/ui/Spinner';

export function GuestRoute() {
  const { isAuthenticated, user, token } = useAuthStore();

  if (token === undefined) return <FullPageSpinner />;

  if (isAuthenticated) {
    return <Navigate to={user?.role === 'ADMIN' ? '/admin' : '/'} replace />;
  }

  return <Outlet />;
}