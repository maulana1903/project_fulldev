import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const submit = async (e) => {
  e.preventDefault();

  try {
    const res = await api.post("/login", {
      email,
      password,
    });
    console.log("🔥 FULL LOGIN RESPONSE:", res.data);
    console.log("👤 USER OBJECT:", res.data.user);
    console.log("🛡 is_root:", res.data.user?.is_root);
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem("token", res.data.token);
    storage.setItem("user", JSON.stringify(res.data.user));
    storage.setItem("role", res.data.user.role_id);

    if (res.data.user.role_id === 1) {
      navigate("/superadmin");
    } else {
      navigate("/admin");
    }

  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: err.response?.data?.message || "Gagal Login",
    });
  }
};

  return (
  <div className="login-page">
    <div className="login-box">
      <div className="login-logo">
        <Link to="/service">
          <b>KUDOIKOM</b> STORE
        </Link>
      </div>

      <div className="card">
        <div className="card-body login-card-body">
          <p className="login-box-msg">Login Admin KUDOIKOM_STORE</p>

          {/* FORM */}
          <form onSubmit={submit}>
            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="input-group-text">
                <span className="bi bi-envelope" />
              </div>
            </div>

            <div className="input-group mb-3">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="input-group-text"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              >
                <i
                  className={`bi ${
                    showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"
                  }`}
                />
              </button>
            </div>

            <div className="row">
              <div className="col-8">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="remember"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="remember">
                    Remember Me
                  </label>
                </div>
              </div>

              <div className="col-4">
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </form>
          {/* END FORM */}
        </div>
      </div>
    </div>
  </div>
  );
}
