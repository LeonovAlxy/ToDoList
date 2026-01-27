import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute() {
  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/register" />;
}

export default PrivateRoute;
