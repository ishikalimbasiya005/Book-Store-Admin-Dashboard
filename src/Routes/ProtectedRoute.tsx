import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../Store/useAuthStore';
import { ROUTES } from '../Constants';

const ProtectedRoute = () => {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);

    if (!isAuthenticated) {
        // Redirect to login if unauthenticated
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
