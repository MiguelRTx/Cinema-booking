import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { FullPageSpinner } from '../../components/ui/Spinner';

export function ClientOnlyRoute() {
  const { user, token } = useAuthStore();

  if (token === undefined) return <FullPageSpinner />;

  if (user?.role === 'ADMIN') {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}