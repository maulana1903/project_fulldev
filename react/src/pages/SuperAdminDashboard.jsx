/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Swal from "sweetalert2";

export default function SuperAdminDashboard() {
  const [admins, setAdmins] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const authUser = JSON.parse(
  localStorage.getItem("user") ||
  sessionStorage.getItem("user") ||
  "null"
);
  const role =
  localStorage.getItem("role") ||
  sessionStorage.getItem("role");
  // 🔒 flag ROOT (AMAN: number / string)
  const isRoot = Number(authUser?.is_root) === 1;
  
  /* ================== AUTH ================== */
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/service");
  };

  /* ================== LOAD DATA ================== */
  
  const load = async () => {
    setLoading(true);
    const res = await api.get("/admins");
    console.log("📦 RAW ADMINS:", res.data);
    setAdmins(res.data);
    try {
      const res = await api.get("/admins");
      setAdmins(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ================== DELETE ================== */
  const remove = async (u) => {
    // ❌ tidak boleh hapus diri sendiri
    if (u.id === authUser.id) {
      Swal.fire({
        icon: "error",
        title: "Akses Ditolak",
        text: "Anda tidak boleh menghapus akun sendiri",
      });
      return;
    }

    // ❌ bukan root → tidak boleh hapus superadmin lain
    if (u.role_id === 1 && !isRoot) {
      Swal.fire({
        icon: "error",
        title : "Akses Ditolak",
        text: "Anda tidak diperbolehkan untuk menghapus SuperAdmin lain",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Yakin hapus user?",
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
    });
    if (!result.isConfirmed) return;
    Swal.fire({
        title: "Menghapus...",
        text: "Mohon tunggu sebentar",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    try {
      await api.delete(`/admins/${u.id}`);
      Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "User berhasil dihapus",
      timer: 1500,
      showConfirmButton: false,
      });

    load();
    } catch (err) {
      Swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Gagal menghapus user",
      });
    }
  };

  /* ================== ADMINLTE BODY SETUP ================== */
  useEffect(() => {
  console.log("📦 local user:", localStorage.getItem("user"));
  console.log("📦 session user:", sessionStorage.getItem("user"));
  console.log("👤 authUser:", authUser);
  console.log("🟢 isRoot:", isRoot);
    document.body.classList.add(
      "sidebar-mini",
      "layout-fixed",
      "sidebar-collapse"
    );

    load();

    return () => {
      document.body.className = "";
    };
  }, []);

  /* ================== SIDEBAR TOGGLE ================== */
  const toggleSidebar = () => {
    document.body.classList.toggle("sidebar-collapse");
  };

  return (
    <div className="app-wrapper">

      {/* ================= NAVBAR ================= */}
      <nav className="app-header navbar navbar-expand bg-body">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button className="nav-link btn" onClick={toggleSidebar}>
                <i className="bi bi-list" />
              </button>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button
                className="btn btn-danger btn-sm"
                onClick={logout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* ================= SIDEBAR ================= */}
      <aside className="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">
        <div className="sidebar-brand">
          <a href="#" className="brand-link">
            <img
              src="/react_app/dist/assets/img/KudoikomLogo.png"
              alt="Kudoikom Logo"
              className="brand-image opacity-75 shadow"
            />
            <span className="brand-text fw-light">SUPER ADMIN</span>
          </a>
        </div>

        <div className="sidebar-wrapper">
          <nav className="mt-2">
            <ul className="nav sidebar-menu flex-column">
              <li className="nav-item">
                <a className="nav-link active">
                  <i className="nav-icon bi bi-clipboard-fill" />
                  <p>User</p>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="app-main">
        <div className="app-content-header">
          <div className="container-fluid">
            <h3 className="mb-0">User</h3>
          </div>
        </div>

        <div className="app-content">
          <div className="container-fluid">
            <div className="card mb-4">
              <div className="card-body">

                <button
                  className="badge rounded-pill text-bg-primary mb-3 border-0"
                  onClick={() => navigate("/admin/register")}
                >
                  Daftar Admin Baru
                </button>

                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nama</th>
                      <th>Email</th>
                      <th>Jabatan</th>
                      <th>Role</th>
                      <th width="150">Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading ? (
                        <tr>
                          <td colSpan="6" className="text-center">
                            <div className="spinner-border text-primary" />
                            <p className="mt-2">Memuat data...</p>
                          </td>
                        </tr>
                      ) : admins.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="text-center">
                            Data kosong
                          </td>
                        </tr>
                      ) : (
                      admins.map((u, i) => (
                        <tr key={u.id}>
                          <td>{u.id}</td>
                          <td>{u.name}</td>
                          <td>{u.email}</td>
                          <td>{u.jabatan}</td>
                          <td>{u.role}</td>
                          <td>
                            <button
                              className="badge rounded-pill text-bg-primary border-0 me-1"
                              onClick={() => {
                                // ❌ bukan root → tidak boleh edit superadmin lain
                                if (
                                  u.role_id === 1 &&
                                  !isRoot &&
                                  u.id !== authUser.id
                                ) {
                                  Swal.fire({
                                    icon: "error",
                                    title: "Akses Ditolak",
                                    text: "Anda hanya bisa mengedit akun Admin atau akun anda sendiri",
                                  });
                                  return;
                                }

                                navigate(`/admin/user_edit/${u.id}`);
                              }}
                            >
                              Edit
                            </button>

                            <button
                              className="badge rounded-pill text-bg-danger border-0"
                              onClick={() => remove(u)}
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>

              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
