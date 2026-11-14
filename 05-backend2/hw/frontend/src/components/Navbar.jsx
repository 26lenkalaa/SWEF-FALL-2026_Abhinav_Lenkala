import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { clearToken, getToken } from "../api.js";

const pages = [
  { to: "/landing", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/tottenham", label: "Tottenham" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // Only decides which links to SHOW. Real protection is the server's 401.
  const showLinks = !["/login", "/signup"].includes(pathname) && getToken();

  function logout() {
    clearToken();
    navigate("/login", { replace: true });
  }

  return (
    <nav className="sticky top-0 z-10 w-full border-b border-line bg-ink/95 px-6 backdrop-blur">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-x-8 gap-y-2 py-4">
        <NavLink to={showLinks ? "/landing" : "/login"} className="font-semibold tracking-tight">
          Abhi Lenkala
        </NavLink>
        {showLinks && (
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            {pages.map((p) => (
              <NavLink
                key={p.to}
                to={p.to}
                className={({ isActive }) => (isActive ? "text-paper" : "text-muted hover:text-paper")}
              >
                {p.label}
              </NavLink>
            ))}
            <button onClick={logout} className="text-muted hover:text-paper">
              Log out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
