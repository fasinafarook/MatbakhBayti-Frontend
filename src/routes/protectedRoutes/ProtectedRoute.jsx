import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const AdminProtectedRoute = () => {
  const { isAuthenticated, token } = useSelector((state) => state.adminAuth);
  return (isAuthenticated && token) ? <Outlet /> : <Navigate to="/admin" />;
};

export const PublicAdminProtectedRoute = () => {
  const { isAuthenticated, token } = useSelector((state) => state.adminAuth);
  return (!isAuthenticated || !token) ? <Outlet /> : <Navigate to="/admin/home" />;
};


// export const UserProtectedRoute = () => {
//   const user = useSelector((state) => state.auth.user);
//   return user ? <Outlet /> : <Navigate to="/" />;
// };
// export const PublicUserProtectedRoute = () => {
//   const user = useSelector((state) => state.auth.user);
//   return !user ? <Outlet /> : <Navigate to="/user/home" />;
// };