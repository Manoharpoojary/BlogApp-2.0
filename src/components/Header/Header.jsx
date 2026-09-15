import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Logo, LogoutBtn } from "../index";

export default function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const items = authStatus
    ? [["Home", "/"], ["All Posts", "/all-posts"], ["Add Post", "/add-post"]]
    : [["Home", "/"], ["Login", "/login"], ["Signup", "/signup"]];

  return (
    <header className="navbar-glass sticky top-0 z-50">
      <Container>
        <nav className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link to="/" className="shrink-0" onClick={() => setMenuOpen(false)}>
            <Logo width="140px" />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1 ml-auto">
            {items.map(([name, path]) => {
              const active = pathname === path;
              return (
                <li key={path}>
                  <button
                    onClick={() => navigate(path)}
                    className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                      ${active
                        ? "text-white bg-white/10"
                        : "text-[var(--text-secondary)] hover:text-white hover:bg-white/5"
                      }`}
                  >
                    {name}
                    {active && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-gradient-to-r from-[var(--accent-start)] to-[var(--accent-end)]" />
                    )}
                  </button>
                </li>
              );
            })}
            {authStatus && (
              <li className="ml-2">
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-white rounded transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-white rounded transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-white rounded transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 animate-fade-in-up border-t border-[var(--glass-border)]">
            <ul className="flex flex-col gap-1 pt-3">
              {items.map(([name, path]) => {
                const active = pathname === path;
                return (
                  <li key={path}>
                    <button
                      onClick={() => { navigate(path); setMenuOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                        ${active
                          ? "text-white bg-white/10"
                          : "text-[var(--text-secondary)] hover:text-white hover:bg-white/5"
                        }`}
                    >
                      {name}
                    </button>
                  </li>
                );
              })}
              {authStatus && (
                <li className="pt-2">
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        )}
      </Container>
    </header>
  );
}
