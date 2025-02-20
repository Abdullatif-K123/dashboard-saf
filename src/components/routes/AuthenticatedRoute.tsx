import { Navigate, Outlet } from "react-router-dom";

const AuthenticatedRoute = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Outlet />;
  }
  const from = encodeURIComponent(window.location.pathname);
  return <Navigate to={`/login${window.location.pathname !== "/" ? `?redirect=${from}` : ""}`} />;
};
export default AuthenticatedRoute;
