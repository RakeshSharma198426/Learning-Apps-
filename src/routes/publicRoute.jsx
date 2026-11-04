import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import ROUTES from './path';

const PublicRoute = () => {
    return isAuthenticated() ? <Navigate to={ROUTES.DASHBOARD} /> : <Outlet />;
};
export default PublicRoute;
