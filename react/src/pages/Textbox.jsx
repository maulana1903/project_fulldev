import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState({
  key: null,
  direction: "asc",
  });

  const loadData = async () => {
    try {
      const res = await api.get("/service-requests");
      setData(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login-admin");
      }
    }
  };

  const updateStatus = async (row, status) => {
    const confirm = window.confirm(
      `Yakin ${status === "disetujui" ? "ACC" : "Tolak"} service ini?`
    );
    if (!confirm) return;

        try {
      await api.put(`/service-requests/${row.id}/status`, { status });

      // pesan WA
      const pesan = encodeURIComponent(
  `Halo kak ${row.nama_pemilik}

Service Anda *${status === "disetujui" ? "DISETUJUI" : "DITOLAK"}* pada
Tanggal: ${row.tanggal_service}
Jam: ${row.jam_service}

Teknisi akan berusaha datang tepat waktu dimohon untuk bersedia menunggu
Harap hubungi admin untuk informasi selengkapnya
Terima kasih`
      );

      window.open(
        `https://wa.me/${row.no_telp}?text=${pesan}`,
        "_blank"
      );

      loadData();
    } catch {
      alert("Gagal update status");
    }
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login-admin");
  };

  useEffect(() => {
    loadData();
  }, []);
  const filteredData = data.filter((row) =>
  row.nama_pemilik.toLowerCase().includes(search.toLowerCase()) ||
  row.no_telp.includes(search) ||
  row.status.includes(search)
  );

  const sortedData = [...filteredData].sort((a, b) => {
  if (!sortConfig.key) return 0;

  let aVal = a[sortConfig.key];
  let bVal = b[sortConfig.key];

  // khusus tanggal
  if (sortConfig.key === "tanggal_service") {
    aVal = new Date(aVal);
    bVal = new Date(bVal);
  }

  if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
  if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
  return 0;
  });
  const handleSort = (key) => {
  let direction = "asc";

  if (sortConfig.key === key && sortConfig.direction === "asc") {
    direction = "desc";
  }

  setSortConfig({ key, direction });
  };


  return (
    <div className="app-wrapper">
      <nav className="app-header navbar navbar-expand bg-body">
        <div className="container-fluid">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown user-menu">
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

      {/* SIDEBAR */}
      <aside className="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">
        <div className="sidebar-brand">
          <a href="#" className="brand-link">
          <img
              src="/dist/assets/img/KudoikomLogo.png"
              alt="Kudoikom Logo"
              class="brand-image opacity-75 shadow"
            />
          <span className="brand-text fw-light ms-3">KUDOIKOM</span></a>
        </div>

        <div className="sidebar-wrapper">
          <nav className="mt-2">
            <ul className="nav sidebar-menu flex-column">
              <li className="nav-item">
                <span className="nav-link active">
                  <i className="nav-icon bi bi-clipboard-fill" />
                  <p>Service Online</p>
                </span>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* MAIN */}
      <main className="app-main">
        <div className="app-content-header">
          <div className="container-fluid">
            <h3 className="mb-3">Tabel Permintaan Service</h3>
            <div className="mb-3 col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Cari nama / no WA..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="app-content">
          <div className="container-fluid">
            <div className="card">
              <div className="card-body">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>

                      <th
                        style={{ cursor: "pointer" }}
                        onClick={() => handleSort("nama_pemilik")}
                      >
                        Nama {sortConfig.key === "nama_pemilik" && (sortConfig.direction === "asc" ? "⬆" : "⬇")}
                      </th>

                      <th
                        style={{ cursor: "pointer" }}
                        onClick={() => handleSort("tanggal_service")}
                      >
                        Tanggal {sortConfig.key === "tanggal_service" && (sortConfig.direction === "asc" ? "⬆" : "⬇")}
                      </th>

                      <th
                        style={{ cursor: "pointer" }}
                        onClick={() => handleSort("jam_service")}
                      >
                        Jam {sortConfig.key === "jam_service" && (sortConfig.direction === "asc" ? "⬆" : "⬇")}
                      </th>

                      <th>Maps</th>
                      <th>Kerusakan</th>
                      <th>Bukti</th>

                      <th
                        style={{ cursor: "pointer" }}
                        onClick={() => handleSort("status")}
                      >
                        Status {sortConfig.key === "status" && (sortConfig.direction === "asc" ? "⬆" : "⬇")}
                      </th>

                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length === 0 && (
                      <tr>
                        <td colSpan="9" className="text-center">
                          Data tidak ditemukan
                        </td>
                      </tr>
                    )}

                    {sortedData.map((row) => (
                      <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.nama_pemilik}</td>
                        <td>{row.tanggal_service}</td>
                        <td>{row.jam_service}</td>

                        <td>
                          <a
                            href={row.link_gmaps}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <span className="badge text-bg-info">
                              Link
                            </span>
                          </a>
                        </td>

                        <td style={{ maxWidth: 300, whiteSpace: "normal" }}>
                          {row.keterangan}
                        </td>

                        <td>
                          <a
                            href={`http://localhost:8000/storage/${row.bukti_transfer}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <span className="badge text-bg-success">
                              Bukti TF
                            </span>
                          </a>
                        </td>

                        <td>
                          {row.status === "menunggu" && (
                            <span className="badge bg-warning">
                              Menunggu
                            </span>
                          )}
                          {row.status === "disetujui" && (
                            <span className="badge bg-success">
                              ACC
                            </span>
                          )}
                          {row.status === "ditolak" && (
                            <span className="badge bg-danger">
                              Ditolak
                            </span>
                          )}
                        </td>

                        <td>
                          {row.status === "menunggu" ? (
                            <>
                              <button
                                className="btn btn-sm btn-primary me-1"
                                onClick={() =>
                                  updateStatus(row, "disetujui")
                                }
                              >
                                ACC
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() =>
                                  updateStatus(row, "ditolak")
                                }
                              >
                                Tolak
                              </button>
                            </>
                          ) : (
                            <span className="text-muted fst-italic">
                              Selesai
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
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
