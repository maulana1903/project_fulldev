import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  const userRole =
    localStorage.getItem("role") ||
    sessionStorage.getItem("role");

  console.log("TOKEN =", token);
  console.log("ROLE STORAGE =", userRole, typeof userRole);
  console.log("ROLE REQUIRED =", role, typeof role);

  if (!token) {
    return <Navigate to="/react_app/login-admin" replace />;
  }

  // role bisa array
  if (role) {
    const allowedRoles = Array.isArray(role)
      ? role.map(String)
      : [String(role)];

    if (!allowedRoles.includes(String(userRole))) {
      if (userRole === "1") {
        return <Navigate to="/superadmin" replace />;
      }
      return <Navigate to="/login-admin" replace />;
    }
  }

  return children;
}
