import { Navigate } from "react-router-dom";

export default function AutoRedirect() {
  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  const role =
    localStorage.getItem("role") ||
    sessionStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login-admin" replace />;
  }

  if (role === "1") {
    return <Navigate to="/superadmin" replace />;
  }

  if (role === "2") {
    return <Navigate to="/admin" replace />;
  }

  return <Navigate to="/login-admin" replace />;
}
