import React, { useState, useEffect } from 'react';
import { Camera, LogOut, User, Phone, MapPin, Calendar, CheckCircle, XCircle, Eye } from 'lucide-react';

const App = () => {
  const [page, setPage] = useState('booking');
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [bookingData, setBookingData] = useState({
    noHP: '',
    alamat: '',
    namaPemilik: '',
    linkGmaps: '',
    jadwalService: '',
    buktiDP: null,
    buktiDPPreview: null,
  });
  const [bookings, setBookings] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Simulasi fetch data dari backend
  useEffect(() => {
    // TODO: Ganti dengan API call ke Laravel
    // fetch('/api/bookings')
    //   .then(res => res.json())
    //   .then(data => setBookings(data));

    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(savedBookings);
  }, []);

  const handleLogin = () => {
    // TODO: Ganti dengan API call ke Laravel
    // fetch('/api/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(loginData)
    // })
    // .then(res => res.json())
    // .then(data => {
    //   if (data.success) {
    //     setUserRole(data.role);
    //     setPage(data.role === 'superuser' ? 'itservice' : 'admin');
    //   }
    // });

    if (loginData.username === 'superuser' && loginData.password === 'super123') {
      setUserRole('superuser');
      setPage('itservice');
    } else if (loginData.username === 'admin' && loginData.password === 'admin123') {
      setUserRole('admin');
      setPage('admin');
    } else {
      alert('Username atau password salah!');
    }
  };

  const handleRegisterAdmin = () => {
    if (registerData.password !== registerData.confirmPassword) {
      alert('Password tidak cocok!');
      return;
    }

    // TODO: Ganti dengan API call ke Laravel
    // fetch('/api/register-admin', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(registerData)
    // })
    // .then(res => res.json())
    // .then(data => {
    //   if (data.success) {
    //     alert('Admin baru berhasil didaftarkan!');
    //     setRegisterData({ username: '', email: '', password: '', confirmPassword: '' });
    //     setShowRegister(false);
    //   }
    // });

    alert('Admin baru berhasil didaftarkan!');
    setRegisterData({ username: '', email: '', password: '', confirmPassword: '' });
    setShowRegister(false);
  };

  const handleBookingSubmit = () => {
    if (!bookingData.buktiDP) {
      alert('Mohon upload bukti transfer DP!');
      return;
    }

    // TODO: Ganti dengan API call ke Laravel
    // const formData = new FormData();
    // formData.append('noHP', bookingData.noHP);
    // formData.append('alamat', bookingData.alamat);
    // formData.append('namaPemilik', bookingData.namaPemilik);
    // formData.append('linkGmaps', bookingData.linkGmaps);
    // formData.append('jadwalService', bookingData.jadwalService);
    // formData.append('buktiDP', bookingData.buktiDP);
    //
    // fetch('/api/bookings', {
    //   method: 'POST',
    //   body: formData
    // })
    // .then(res => res.json())
    // .then(data => {
    //   if (data.success) {
    //     alert('Booking berhasil dikirim!');
    //   }
    // });

    const newBooking = {
      id: Date.now(),
      ...bookingData,
      status: 'pending',
      timestamp: new Date().toISOString(),
    };

    const updatedBookings = [...bookings, newBooking];
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);

    alert('Booking berhasil dikirim! Mohon tunggu konfirmasi admin.');
    setBookingData({
      noHP: '',
      alamat: '',
      namaPemilik: '',
      linkGmaps: '',
      jadwalService: '',
      buktiDP: null,
      buktiDPPreview: null,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBookingData({
          ...bookingData,
          buktiDP: file,
          buktiDPPreview: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAcceptReject = (booking, action) => {
    // TODO: Ganti dengan API call ke Laravel
    // fetch(`/api/bookings/${booking.id}/${action}`, {
    //   method: 'POST'
    // })
    // .then(res => res.json())
    // .then(data => {
    //   if (data.success) {
    //     // Buka WhatsApp
    //     window.open(data.whatsappUrl, '_blank');
    //   }
    // });

    const date = new Date(booking.jadwalService);
    const formattedDate = date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const time = date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });

    let message = '';
    if (action === 'accept') {
      message = `Terimakasih sudah order layanan service online, service akan dilakukan di hari ${formattedDate} jam ${time} mohon tunggu`;
    } else {
      message = `Mohon maaf order layanan service online tidak di setujui dikarenakan (belum mengirimkan bukti transfer/jadwal bertubrukan) harap lakukan edit data atau refund dp layanan service online`;
    }

    const waUrl = `https://wa.me/${booking.noHP.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');

    const updatedBookings = bookings.map((b) => (b.id === booking.id ? { ...b, status: action === 'accept' ? 'accepted' : 'rejected' } : b));
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
  };

  const viewImage = (imageData) => {
    // TODO: Ganti dengan URL gambar dari Laravel storage
    // window.open(`/storage/${imageData}`, '_blank');

    const newWindow = window.open();
    newWindow.document.write(`<img src="${imageData}" style="max-width:100%; height:auto;" />`);
  };

  return (
    <div style={styles.container}>
      {/* HALAMAN BOOKING */}
      {page === 'booking' && (
        <div style={styles.bookingPage}>
          <div style={styles.header}>
            <h1 style={styles.logo}>🔧 KudoiKom Service</h1>
            <button style={styles.adminButton} onClick={() => setPage('login')}>
              <User size={18} /> Admin
            </button>
          </div>

          <div style={styles.formContainer}>
            <div style={styles.formHeader}>
              <h2 style={styles.formTitle}>Booking Service Online</h2>
              <p style={styles.formSubtitle}>Isi form di bawah untuk memesan layanan service</p>
            </div>

            <div style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <Phone size={18} style={styles.icon} />
                  No. WhatsApp
                </label>
                <input type="tel" placeholder="08xxxxxxxxxx" value={bookingData.noHP} onChange={(e) => setBookingData({ ...bookingData, noHP: e.target.value })} style={styles.input} required />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <User size={18} style={styles.icon} />
                  Nama Pemilik/Penanggung Jawab
                </label>
                <input type="text" placeholder="Masukkan nama lengkap" value={bookingData.namaPemilik} onChange={(e) => setBookingData({ ...bookingData, namaPemilik: e.target.value })} style={styles.input} required />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <MapPin size={18} style={styles.icon} />
                  Alamat Lengkap
                </label>
                <textarea placeholder="Masukkan alamat lengkap" value={bookingData.alamat} onChange={(e) => setBookingData({ ...bookingData, alamat: e.target.value })} style={{ ...styles.input, ...styles.textarea }} required />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <MapPin size={18} style={styles.icon} />
                  Link Google Maps
                </label>
                <input type="url" placeholder="https://maps.google.com/..." value={bookingData.linkGmaps} onChange={(e) => setBookingData({ ...bookingData, linkGmaps: e.target.value })} style={styles.input} required />
                <small style={styles.hint}>*Maksimal radius 20km dari lokasi kami</small>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <Calendar size={18} style={styles.icon} />
                  Jadwal Service
                </label>
                <input type="datetime-local" value={bookingData.jadwalService} onChange={(e) => setBookingData({ ...bookingData, jadwalService: e.target.value })} style={styles.input} required />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <Camera size={18} style={styles.icon} />
                  Bukti Transfer DP
                </label>
                <div style={styles.uploadContainer}>
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={styles.fileInput} id="fileUpload" required />
                  <label htmlFor="fileUpload" style={styles.uploadLabel}>
                    <Camera size={24} />
                    <span>Upload Bukti Transfer</span>
                  </label>
                  {bookingData.buktiDPPreview && (
                    <div style={styles.imagePreview}>
                      <img src={bookingData.buktiDPPreview} alt="Preview" style={styles.previewImage} />
                    </div>
                  )}
                </div>
              </div>

              <button onClick={handleBookingSubmit} style={styles.submitButton}>
                <CheckCircle size={20} />
                Kirim Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HALAMAN LOGIN */}
      {page === 'login' && (
        <div style={styles.loginPage}>
          <div style={styles.loginContainer}>
            <div style={styles.loginHeader}>
              <h2 style={styles.loginTitle}>🔐 Login Admin</h2>
              <p style={styles.loginSubtitle}>Masuk ke dashboard admin</p>
            </div>

            <div style={styles.loginForm}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Username/Email</label>
                <input type="text" placeholder="Masukkan username" value={loginData.username} onChange={(e) => setLoginData({ ...loginData, username: e.target.value })} style={styles.input} required />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <input type="password" placeholder="Masukkan password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} style={styles.input} required />
              </div>

              <button onClick={handleLogin} style={styles.loginButton}>
                Login
              </button>

              <button onClick={() => setPage('booking')} style={styles.backButton}>
                Kembali
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HALAMAN ADMIN */}
      {page === 'admin' && (
        <div style={styles.adminPage}>
          <div style={styles.adminHeader}>
            <h1 style={styles.adminTitle}>📋 Dashboard Admin</h1>
            <button
              style={styles.logoutButton}
              onClick={() => {
                setPage('booking');
                setUserRole(null);
              }}
            >
              <LogOut size={18} /> Logout
            </button>
          </div>

          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.th}>No</th>
                  <th style={styles.th}>No HP</th>
                  <th style={styles.th}>Nama</th>
                  <th style={styles.th}>Alamat</th>
                  <th style={styles.th}>Link Maps</th>
                  <th style={styles.th}>Jadwal</th>
                  <th style={styles.th}>Bukti DP</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={booking.id} style={styles.tableRow}>
                    <td style={styles.td}>{index + 1}</td>
                    <td style={styles.td}>{booking.noHP}</td>
                    <td style={styles.td}>{booking.namaPemilik}</td>
                    <td style={styles.td}>{booking.alamat}</td>
                    <td style={styles.td}>
                      <a href={booking.linkGmaps} target="_blank" rel="noopener noreferrer" style={styles.link}>
                        Lihat Maps
                      </a>
                    </td>
                    <td style={styles.td}>{new Date(booking.jadwalService).toLocaleString('id-ID')}</td>
                    <td style={styles.td}>
                      <button style={styles.viewButton} onClick={() => viewImage(booking.buktiDPPreview)}>
                        <Eye size={16} /> Lihat
                      </button>
                    </td>
                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.statusBadge,
                          backgroundColor: booking.status === 'accepted' ? '#10b981' : booking.status === 'rejected' ? '#ef4444' : '#f59e0b',
                        }}
                      >
                        {booking.status === 'accepted' ? 'Diterima' : booking.status === 'rejected' ? 'Ditolak' : 'Pending'}
                      </span>
                    </td>
                    <td style={styles.td}>
                      {booking.status === 'pending' && (
                        <div style={styles.actionButtons}>
                          <button style={styles.acceptButton} onClick={() => handleAcceptReject(booking, 'accept')}>
                            <CheckCircle size={16} /> ACC
                          </button>
                          <button style={styles.rejectButton} onClick={() => handleAcceptReject(booking, 'reject')}>
                            <XCircle size={16} /> Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* HALAMAN IT SERVICE - SUPER USER */}
      {page === 'itservice' && (
        <div style={styles.adminPage}>
          <div style={styles.adminHeader}>
            <h1 style={styles.adminTitle}>⚙️ IT Service - Super User</h1>
            <button
              style={styles.logoutButton}
              onClick={() => {
                setPage('booking');
                setUserRole(null);
              }}
            >
              <LogOut size={18} /> Logout
            </button>
          </div>

          <div style={styles.itServiceContainer}>
            <button style={styles.registerToggleButton} onClick={() => setShowRegister(!showRegister)}>
              {showRegister ? 'Tutup Form' : '+ Daftar Admin Baru'}
            </button>

            {showRegister && (
              <div style={styles.registerContainer}>
                <h2 style={styles.registerTitle}>Daftar Admin Baru</h2>
                <div style={styles.registerForm}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Username</label>
                    <input type="text" placeholder="Masukkan username" value={registerData.username} onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })} style={styles.input} required />
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Email</label>
                    <input type="email" placeholder="admin@example.com" value={registerData.email} onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} style={styles.input} required />
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Password</label>
                    <input type="password" placeholder="Masukkan password" value={registerData.password} onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} style={styles.input} required />
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Konfirmasi Password</label>
                    <input type="password" placeholder="Konfirmasi password" value={registerData.confirmPassword} onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })} style={styles.input} required />
                  </div>

                  <button onClick={handleRegisterAdmin} style={styles.submitButton}>
                    Daftar Admin
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  bookingPage: {
    minHeight: '100vh',
    padding: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    padding: '0 20px',
  },
  logo: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#fff',
    margin: 0,
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  },
  adminButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#fff',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '30px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
  },
  formContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  formHeader: {
    marginBottom: '30px',
    textAlign: 'center',
  },
  formTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: '0 0 10px 0',
  },
  formSubtitle: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
  },
  icon: {
    color: '#667eea',
  },
  input: {
    padding: '12px 16px',
    fontSize: '14px',
    border: '2px solid #e5e7eb',
    borderRadius: '10px',
    outline: 'none',
    transition: 'all 0.3s ease',
    backgroundColor: '#f9fafb',
  },
  textarea: {
    minHeight: '80px',
    resize: 'vertical',
    fontFamily: 'inherit',
  },
  hint: {
    fontSize: '12px',
    color: '#9ca3af',
    fontStyle: 'italic',
  },
  uploadContainer: {
    position: 'relative',
  },
  fileInput: {
    display: 'none',
  },
  uploadLabel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    padding: '30px',
    backgroundColor: '#f9fafb',
    border: '2px dashed #d1d5db',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    color: '#6b7280',
  },
  imagePreview: {
    marginTop: '15px',
    borderRadius: '10px',
    overflow: 'hidden',
    border: '2px solid #e5e7eb',
  },
  previewImage: {
    width: '100%',
    height: 'auto',
    display: 'block',
  },
  submitButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '16px',
    backgroundColor: '#667eea',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '10px',
  },
  loginPage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '20px',
  },
  loginContainer: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#fff',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  loginHeader: {
    marginBottom: '30px',
    textAlign: 'center',
  },
  loginTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: '0 0 10px 0',
  },
  loginSubtitle: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  loginButton: {
    padding: '14px',
    backgroundColor: '#667eea',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  backButton: {
    padding: '14px',
    backgroundColor: 'transparent',
    color: '#667eea',
    border: '2px solid #667eea',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  adminPage: {
    minHeight: '100vh',
    padding: '20px',
  },
  adminHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    padding: '0 20px',
  },
  adminTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#fff',
    margin: 0,
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    backgroundColor: 'rgba(239, 68, 68, 0.9)',
    color: '#fff',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: '20px',
    padding: '20px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#f3f4f6',
  },
  th: {
    padding: '16px',
    textAlign: 'left',
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
    borderBottom: '2px solid #e5e7eb',
  },
  tableRow: {
    transition: 'all 0.3s ease',
  },
  td: {
    padding: '16px',
    fontSize: '14px',
    color: '#1f2937',
    borderBottom: '1px solid #e5e7eb',
  },
  link: {
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: '500',
  },
  viewButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  statusBadge: {
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#fff',
  },
  actionButtons: {
    display: 'flex',
    gap: '8px',
  },
  acceptButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    backgroundColor: '#10b981',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  rejectButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    backgroundColor: '#ef4444',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  itServiceContainer: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  registerToggleButton: {
    padding: '16px 32px',
    backgroundColor: '#fff',
    color: '#667eea',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginBottom: '20px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
  registerContainer: {
    backgroundColor: '#fff',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  registerTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '30px',
    textAlign: 'center',
  },
  registerForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
};

export default App;
