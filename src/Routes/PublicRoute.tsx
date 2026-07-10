import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../Store/useAuthStore';
import { ROUTES } from '../Constants';

const PublicRoute = () => {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);

    if (isAuthenticated) {
        // Redirect to dashboard if already authenticated
        return <Navigate to={ROUTES.DASHBOARD} replace />;
    }

    return <Outlet />;
};

export default PublicRoute;
