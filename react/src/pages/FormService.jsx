import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import MapPicker from "../components/MapPicker";
import Swal from "sweetalert2";

export default function FormService() {
  const formRef = useRef(null);

  const [map, setMap] = useState({});
  const [file, setFile] = useState(null);
  const isValidTime = (time) => {
  return time >= "09:00" && time <= "15:00";
};
  const today = new Date().toISOString().split("T")[0];
  const maxDate = (() => {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString().split("T")[0];
})();
  const submit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    const jam = form.jam_service.value;
    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add("was-validated");
      return;
    }
    if (!isValidTime(jam)) {
    Swal.fire({
      icon: "error",
      title : "Jam Tidak Valid",
      text: "Jam Layanan Service Online Hanya bisa 09:00 sampai 15:00",
    });
    return;
  }
    if (!map.lat || !map.lng) {
      Swal.fire({
      icon: "error",
      title : "Maps Belum Dipilih",
      text: "Pilih lokasi sesuai peta yang tersedia di form",
    });
      return;
    }

    const fd = new FormData(form);
    fd.append("link_gmaps", map.link);
    fd.append("latitude", map.lat);
    fd.append("longitude", map.lng);
    fd.append("bukti_transfer", file);
    Swal.fire({
        title: "Mengirim...",
        text: "Mohon tunggu sebentar",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    try {
      await api.post("/service-requests", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
      icon: "success",
      title : "Terimakasih",
      text: "Permintaan service berhasil di kirim silahkan menunggu balasan admin",
    });
      form.reset();
      form.classList.remove("was-validated");
      setFile(null);
      setMap({});
    } catch (err) {
      const pesan_eror =err.response?.data?.message || "Gagal kirim permintaan service";
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: pesan_eror,
      });
    }
  };

  return (
    <div className="app-wrapper">
      {/* NAVBAR */}
      <nav className="app-header navbar navbar-expand bg-body">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item d-none d-md-block">
              <a
                href="https://api.whatsapp.com/send?phone=6285868598956&text=Halo%20kak%20👋%20saya%20mau%20konsultasi"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                Contact
              </a>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/login-admin" className="btn btn-primary">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* MAIN */}
      <main className="app-main">
        <div className="app-content-header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6">
                <h3 className="mb-0">Daftar Service On The Spot</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="app-content">
          <div className="container-fluid">
            <div className="row g-4">
              <div className="col-md-12">
                <div className="card card-primary card-outline mb-4">
                  <div className="card-header">
                    <div className="card-title">
                      Form Daftar Service On The Spot
                    </div>
                  </div>

                  {/* FORM */}
                  <form
                    ref={formRef}
                    className="needs-validation"
                    noValidate
                    onSubmit={submit}
                  >
                    <div className="card-body">
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">Nama Pemesan</label>
                          <input
                            type="text"
                            name="nama_pemilik"
                            className="form-control"
                            required
                          />
                          <div className="invalid-feedback">
                            Nama wajib diisi
                          </div>
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">Alamat Lengkap</label>
                          <input
                            type="text"
                            name="alamat"
                            className="form-control"
                            required
                          />
                          <div className="invalid-feedback">
                            Alamat wajib diisi
                          </div>
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">No WhatsApp</label>
                          <div className="input-group">
                            <span className="input-group-text">+62</span>
                            <input
                              type="number"
                              name="no_telp"
                              className="form-control"
                              required
                            />
                            <div className="invalid-feedback">
                              Nomor WA wajib diisi
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">Tanggal Service</label>
                          <input
                            type="date"
                            name="tanggal_service"
                            className="form-control"
                            min={today}
                            max={maxDate}
                            required
                          />
                          <div className="invalid-feedback">
                            Pilih tanggal service
                          </div>
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">Jam Service</label>
                          <input
                            type="time"
                            name="jam_service"
                            className="form-control"
                            min="09:00"
                            max="15:00"
                            required
                            onChange={(e) => {
                            if (!isValidTime(e.target.value)) {
                                Swal.fire({
                                  icon: "error",
                                  title : "Jam Tidak Valid",
                                  text: "Jam Layanan Service Online Hanya bisa 09:00 sampai 15:00",
                                });
                                e.target.value = "";
                              }
                            }}
                          />
                          <div className="invalid-feedback">
                            Jam service wajib diisi
                          </div>
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">
                            Link Google Maps
                          </label>
                          <input
                            type="text"
                            name="gmaps"
                            className="form-control"
                            value={map.link || ""}
                            readOnly
                            required
                          />
                          <div className="invalid-feedback">
                            Pilih lokasi di peta
                          </div>
                        </div>

                        <div className="col-12">
                          <label className="form-label">
                            Pilih Lokasi di Maps
                          </label>
                          <MapPicker setData={setMap} />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">Kerusakan</label>
                          <input
                            type="text"
                            name="keterangan"
                            className="form-control"
                            required
                          />
                          <div className="invalid-feedback">
                            Masukkan kerusakan
                          </div>
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">Bukti Transfer</label>
                          <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            required
                            onChange={(e) => setFile(e.target.files[0])}
                          />
                          <div className="invalid-feedback">
                            Upload bukti transfer
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              required
                            />
                            <label className="form-check-label">
                              Saya menyetujui syarat & ketentuan
                            </label>
                            <div className="invalid-feedback">
                              Wajib disetujui
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card-footer">
                      <button className="btn btn-info" type="submit">
                        Submit
                      </button>
                    </div>
                  </form>
                  {/* END FORM */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
