import React from "react";

export default function PublicLayout({ children }) {
  return (
    <div className="wrapper">
      {/* Navbar */}
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <span className="navbar-brand font-weight-bold">
              📍 Service Locator
            </span>
          </li>
        </ul>
      </nav>

      {/* Content */}
      <div className="content-wrapper pt-4">
        <section className="content">
          <div className="container">
            {children}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="main-footer text-center">
        <strong>© 2026</strong> Pemrograman Lanjut
      </footer>
    </div>
  );
}
