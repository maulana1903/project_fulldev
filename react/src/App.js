import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// pages
import FormService from './pages/FormService';
import LoginAdmin from './pages/LoginAdmin';
import AdminDashboard from './pages/AdminDashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import AdminCreate from './pages/AdminCreate';
import AdminEdit from './pages/AdminEdit';

// auth
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter basename="/react_app">
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Navigate to="service" />} />
        <Route path="service" element={<FormService />} />
        <Route path="login-admin" element={<LoginAdmin />} />

        {/* ADMIN */}
        <Route
          path="admin"
          element={
            <ProtectedRoute role="2">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* SUPERADMIN */}
        <Route
          path="superadmin"
          element={
            <ProtectedRoute role="1">
              <SuperAdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="admin/register"
          element={
            <ProtectedRoute role="1">
              <AdminCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/user_edit/:id"
          element={
            <ProtectedRoute role="1">
              <AdminEdit />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<h2>404 - Halaman Tidak Ditemukan</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
