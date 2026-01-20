/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import Swal from "sweetalert2";

export default function AdminEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    jabatan: "",
    role_id: "2",
  });

  useEffect(() => {
    api.get(`/admins/${id}`).then((res) => {
      setForm({
        name: res.data.name,
        email: res.data.email,
        jabatan: res.data.jabatan,
        role_id: res.data.role_id,
        password: "",
      });
    });
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    const payload = { ...form };
    if (!payload.password) delete payload.password;
    Swal.fire({
        title: "Menyimpan...",
        text: "Mohon tunggu sebentar",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    try {
      await api.put(`/admins/${id}`, payload);
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "User berhasil Diupdate",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/superadmin");
    } catch (err) {
          const pesan_eror =err.response?.data?.message || "Gagal tambah user";
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: pesan_eror,
          });
        }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Edit Admin</h5>
        </div>

        <div className="card-body">
          <form onSubmit={submit}>
            <div className="mb-3">
              <label className="form-label">Nama</label>
              <input
                className="form-control"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                className="form-control"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Password <small>(kosongkan jika tidak diubah)</small>
              </label>
              <input
                type="password"
                className="form-control"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Jabatan</label>
              <input
                className="form-control"
                value={form.jabatan}
                onChange={(e) =>
                  setForm({ ...form, jabatan: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Role</label>
              <select
                className="form-control"
                value={form.role_id}
                onChange={(e) =>
                  setForm({ ...form, role_id: e.target.value })
                }
              >
                <option value="1">Super Admin</option>
                <option value="2">Admin</option>
              </select>
            </div>

            <div className="d-flex gap-2">
              <button className="btn btn-primary">
                Update
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate(-1)}
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
