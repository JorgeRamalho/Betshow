import { Link } from "react-router-dom";
import Logo from "./brand/Logo";
import { useAuth } from "../contexts/AuthContext";
import "./Header.css";

const NAV = [
  { label: "Copa 2026", href: "/#copa2026" },
  { label: "Esportes", href: "/#esportes" },
  { label: "Bônus", href: "/#bonus" },
  { label: "Odds ao vivo", href: "/#odds" },
];

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header__inner container">
        <Logo size="md" />

        <nav className="header__nav" aria-label="Principal">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="header__link">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          {isAuthenticated ? (
            <>
              <Link
                to={user?.role === "admin" ? "/admin" : "/dashboard"}
                className="btn btn-outline header__login"
              >
                {user?.role === "admin" ? "Admin" : "Dashboard"}
              </Link>
              <button type="button" className="btn btn-primary" onClick={logout}>
                Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline header__login">
                Entrar
              </Link>
              <Link to="/cadastro" className="btn btn-primary">
                Cadastrar CPF
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
