import { Routes, Route, Navigate } from "react-router-dom";
import ROUTES from "./path";
import PublicRoute from "./publicRoute";
import PrivateRoute from "./privateRoute";
import SidebarLayout from "../layouts/SidebarLayout";
import Login from "../pages/Login/login";
import Dashboard from "../pages/Dashboard/DashboardView";
import Projects from "../pages/Projects/Projects";
import Jobs from "../pages/Jobs/Jobs";
import UnAuthorizedPage from "../pages/UnAuthorizedError/UnAuthorizedPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.UNAUTHORIZED_PAGE} element={<UnAuthorizedPage />} />
      <Route element={<PublicRoute />}>
        <Route path={ROUTES.ROOT} element={<Login />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route element={<SidebarLayout />}>
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.JOBS} element={<Jobs />} />
          <Route path={ROUTES.PROJECTS} element={<Projects />} />
          {/* More nested routes */}
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
