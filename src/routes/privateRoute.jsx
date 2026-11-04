import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import ROUTES from './path';

const PrivateRoute = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to={ROUTES.ROOT} />;
};

export default PrivateRoute;
