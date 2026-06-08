import { Navigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useAuth } from "../../contexts/AuthContext";
import { BRAND } from "../../data/brand";
import { MOCK_USER_STATS, MOCK_USER_BETS, MOCK_CHART_DATA } from "../../data/mockUserDashboard";
import { formatCurrency, formatPercent } from "../../utils/formatters";
import "../../styles/dashboard.css";

const USER_LINKS = [
  { to: "/dashboard", label: "Visão geral", icon: "📊" },
  { to: "/dashboard/apostas", label: "Minhas apostas", icon: "🎯" },
  { to: "/pagamento", label: "Depositar", icon: "💰" },
  { to: "/", label: "Site", icon: "🏠" },
];

export default function UserDashboardPage() {
  const { user } = useAuth();
  if (!user || user.role === "admin") return <Navigate to="/login" replace />;

  const stats = MOCK_USER_STATS;

  return (
    <DashboardLayout variant="user" links={USER_LINKS}>
      <div className="copa-banner">
        <div>
          <h2>🏆 {BRAND.copa2026.title}</h2>
          <p>{stats.copa2026Bets} apostas na Copa · Cashback {BRAND.cashbackRate}</p>
        </div>
        <a href="/#copa2026" className="btn btn-gold">Ver mercados Copa</a>
      </div>

      <header className="dashboard-header">
        <div>
          <h1>Olá, {user.fullName.split(" ")[0]}!</h1>
          <p>Matrícula {user.matricula} · {user.email}</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Saldo disponível</p>
          <p style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--neon-green)" }}>
            {formatCurrency(user.balance + user.bonusBalance)}
          </p>
        </div>
      </header>

      <div className="dashboard-stats">
        <div className="stat-card">
          <p className="stat-card__label">Total apostas</p>
          <p className="stat-card__value">{stats.totalBets}</p>
        </div>
        <div className="stat-card">
          <p className="stat-card__label">Taxa de acerto</p>
          <p className="stat-card__value stat-card__value--positive">{formatPercent(stats.winRate)}</p>
        </div>
        <div className="stat-card">
          <p className="stat-card__label">Lucro / Prejuízo</p>
          <p className={`stat-card__value${stats.profitLoss >= 0 ? " stat-card__value--positive" : " stat-card__value--negative"}`}>
            {formatCurrency(stats.profitLoss)}
          </p>
        </div>
        <div className="stat-card">
          <p className="stat-card__label">Cashback acumulado</p>
          <p className="stat-card__value stat-card__value--gold">{formatCurrency(user.cashbackEarned || 127.5)}</p>
        </div>
        <div className="stat-card">
          <p className="stat-card__label">Apostas ativas</p>
          <p className="stat-card__value">{stats.activeBets}</p>
        </div>
        <div className="stat-card">
          <p className="stat-card__label">Esporte favorito</p>
          <p className="stat-card__value" style={{ fontSize: "1.25rem" }}>{stats.favoriteSport}</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-panel">
          <h2>Performance mensal</h2>
          <div className="chart-bars">
            {MOCK_CHART_DATA.map((d) => (
              <div key={d.label} className="chart-bar" style={{ height: `${d.value}%` }}>
                <span>{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-panel">
          <h2>Últimas apostas</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Evento</th>
                <th>Odd</th>
                <th>Valor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_USER_BETS.slice(0, 4).map((bet) => (
                <tr key={bet.id}>
                  <td>{bet.event}</td>
                  <td>{bet.odd.toFixed(2)}</td>
                  <td>{formatCurrency(bet.stake)}</td>
                  <td>
                    <span className={`badge badge--${bet.status === "won" ? "won" : bet.status === "lost" ? "lost" : "pending"}`}>
                      {bet.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="dashboard-panel" style={{ marginTop: "var(--space-lg)" }}>
        <h2>Análise de dados · Perspectivas</h2>
        <div className="dashboard-stats" style={{ marginBottom: 0 }}>
          <div className="stat-card">
            <p className="stat-card__label">Volume apostado</p>
            <p className="stat-card__value">{formatCurrency(stats.totalStaked)}</p>
          </div>
          <div className="stat-card">
            <p className="stat-card__label">Retorno total</p>
            <p className="stat-card__value">{formatCurrency(stats.totalReturns)}</p>
          </div>
          <div className="stat-card">
            <p className="stat-card__label">ROI estimado</p>
            <p className="stat-card__value stat-card__value--positive">
              {formatPercent((stats.profitLoss / stats.totalStaked) * 100)}
            </p>
          </div>
        </div>
        <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
          Dados simulados para demonstração. Integração com backend em produção.
        </p>
      </div>
    </DashboardLayout>
  );
}
