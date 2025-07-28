import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAdminAuth = () => {
  const { isAuthenticated } = useSelector((state) => state.adminAuth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default RequireAdminAuth;
