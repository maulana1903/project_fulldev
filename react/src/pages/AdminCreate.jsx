/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Swal from 'sweetalert2';

export default function AdminCreate() {
  const navigate = useNavigate();

  const authUser = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || 'null');

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    jabatan: '',
    role_id: '2', // default ADMIN
  });

  const submit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Menyimpan...',
      text: 'Mohon tunggu sebentar',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      await api.post('/admins', form);
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'User berhasil Ditambahkan',
        timer: 1500,
        showConfirmButton: false,
      });
      navigate('/superadmin');
    } catch (err) {
      const pesan_eror = err.response?.data?.message || 'Gagal tambah user';
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: pesan_eror,
      });
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Tambah User</h5>
        </div>

        <div className="card-body">
          <form onSubmit={submit}>
            {/* NAMA */}
            <div className="mb-3">
              <label className="form-label">Nama</label>
              <input className="form-control" required onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" required onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" required onChange={(e) => setForm({ ...form, password: e.target.value })} />
            </div>
            <div className="mb-3">
              <label className="form-label">Jabatan</label>
              <input type="text" className="form-control" required value={form.jabatan} onChange={(e) => setForm({ ...form, jabatan: e.target.value })} />
            </div>
            <div className="mb-3">
              <label className="form-label">Role</label>
              <select className="form-control" value={form.role_id} onChange={(e) => setForm({ ...form, role_id: e.target.value })}>
                {authUser?.is_root && <option value="1">Super Admin</option>}

                <option value="2">Admin</option>
              </select>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-primary">Simpan</button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
