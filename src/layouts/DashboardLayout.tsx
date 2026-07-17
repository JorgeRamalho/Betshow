import type { ReactNode } from "react";
import { Navigate, Link } from "react-router-dom";
import Logo from "../components/brand/Logo";
import { useAuth } from "../contexts/AuthContext";
import "../styles/dashboard.css";

type DashboardLayoutProps = {
  children: ReactNode;
  variant: "user" | "admin";
  links: { to: string; label: string; icon: string }[];
};

export default function DashboardLayout({ children, variant, links }: DashboardLayoutProps) {
  const { user, logout } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <Logo size="sm" linkTo="/" />
        <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
          {variant === "admin" ? "Painel Admin" : "Minha conta"}
        </p>
        <Link to="/" className="btn btn-outline dashboard-sidebar__home">
          ← Voltar à home
        </Link>
        <nav className="dashboard-sidebar__nav" aria-label={variant === "admin" ? "Admin" : "Usuário"}>
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`dashboard-sidebar__link${variant === "admin" ? " dashboard-sidebar__link--admin" : ""}`}
            >
              <span>{l.icon}</span> {l.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="dashboard-sidebar__link"
          onClick={logout}
          style={{ marginTop: "auto", background: "none", border: "none", width: "100%", textAlign: "left" }}
        >
          <span>🚪</span> Sair
        </button>
      </aside>
      <main className="dashboard-main">{children}</main>
    </div>
  );
}
