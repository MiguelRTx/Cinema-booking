import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { FullPageSpinner } from '../../components/ui/Spinner';

export function PrivateRoute() {
  const { isAuthenticated, token } = useAuthStore();

  if (token === undefined) return <FullPageSpinner />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
