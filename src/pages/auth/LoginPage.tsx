import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../components/brand/Logo";
import { useAuth } from "../../contexts/AuthContext";
import { BRAND } from "../../data/brand";
import "../../styles/forms.css";

export default function LoginPage() {
  const { login, loginAsAdmin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    const fn = isAdmin ? loginAsAdmin : login;
    const ok = await fn(email, password);
    if (ok) {
      navigate(isAdmin ? "/admin" : "/dashboard");
    } else {
      setError(
        isAdmin
          ? "Credenciais admin inválidas. Use admin@betshow.com / Admin@2026"
          : "E-mail ou senha incorretos. Cadastre-se primeiro."
      );
    }
  }

  return (
    <div className="form-page">
      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-card__head">
          <Logo size="lg" />
          <h1>Entrar na {BRAND.name}</h1>
          <p>{BRAND.slogan} · Acesse sua conta</p>
        </div>

        {error && <div className="form-alert form-alert--error" role="alert">{error}</div>}

        <div className="form-field">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <label className="form-checkbox">
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          <span>Acesso administrativo</span>
        </label>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Entrar
          </button>
        </div>

        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
          Não tem conta? <Link to="/cadastro" style={{ color: "var(--neon-green)" }}>Cadastre-se</Link>
          {" · "}
          <Link to="/" style={{ color: "var(--text-secondary)" }}>Voltar ao site</Link>
        </p>
      </form>
    </div>
  );
}
