import { Navigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useAuth } from "../../contexts/AuthContext";
import {
  MOCK_FINANCIAL,
  MOCK_TRANSACTIONS,
  MOCK_ALL_BETS,
  MOCK_USERS,
} from "../../data/mockAdminDashboard";
import { formatCurrency, formatDateTime } from "../../utils/formatters";
import "../../styles/dashboard.css";

const ADMIN_LINKS = [
  { to: "/admin", label: "Financeiro", icon: "💼" },
  { to: "/admin/apostas", label: "Apostas", icon: "🎯" },
  { to: "/admin/usuarios", label: "Usuários", icon: "👥" },
  { to: "/", label: "Site", icon: "🏠" },
];

export default function AdminDashboardPage() {
  const { user } = useAuth();
  if (!user || user.role !== "admin") return <Navigate to="/login" replace />;

  const fin = MOCK_FINANCIAL;

  return (
    <DashboardLayout variant="admin" links={ADMIN_LINKS}>
      <header className="dashboard-header">
        <div>
          <h1>Painel Administrativo</h1>
          <p>Gestão financeira · Apostas · Usuários · {user.fullName}</p>
        </div>
      </header>

      <div className="dashboard-stats">
        <div className="stat-card">
          <p className="stat-card__label">Depósitos totais</p>
          <p className="stat-card__value stat-card__value--positive">{formatCurrency(fin.totalDeposits)}</p>
        </div>
        <div className="stat-card">
          <p className="stat-card__label">Saques totais</p>
          <p className="stat-card__value">{formatCurrency(fin.totalWithdrawals)}</p>
        </div>
        <div className="stat-card">
          <p className="stat-card__label">Volume de apostas</p>
          <p className="stat-card__value stat-card__value--gold">{formatCurrency(fin.totalBetsVolume)}</p>
        </div>
        <div className="stat-card">
          <p className="stat-card__label">Receita plataforma</p>
          <p className="stat-card__value stat-card__value--positive">{formatCurrency(fin.platformRevenue)}</p>
        </div>
        <div className="stat-card">
          <p className="stat-card__label">Saques pendentes</p>
          <p className="stat-card__value stat-card__value--negative">{formatCurrency(fin.pendingWithdrawals)}</p>
        </div>
        <div className="stat-card">
          <p className="stat-card__label">Usuários ativos</p>
          <p className="stat-card__value">{fin.activeUsers.toLocaleString("pt-BR")}</p>
        </div>
        <div className="stat-card">
          <p className="stat-card__label">Novos hoje</p>
          <p className="stat-card__value stat-card__value--positive">+{fin.newUsersToday}</p>
        </div>
        <div className="stat-card">
          <p className="stat-card__label">Pagamentos (payouts)</p>
          <p className="stat-card__value">{formatCurrency(fin.totalPayouts)}</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-panel">
          <h2>Movimentações recentes</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Usuário</th>
                <th>Tipo</th>
                <th>Valor</th>
                <th>Status</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_TRANSACTIONS.map((tx) => (
                <tr key={tx.id}>
                  <td>{tx.userName}</td>
                  <td>{tx.type}</td>
                  <td>{formatCurrency(tx.amount)}</td>
                  <td>
                    <span className={`badge badge--${tx.status === "completed" ? "completed" : "pending"}`}>
                      {tx.status}
                    </span>
                  </td>
                  <td>{formatDateTime(tx.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="dashboard-panel">
          <h2>Apostas em processamento</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Usuário</th>
                <th>Evento</th>
                <th>Stake</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ALL_BETS.map((bet) => (
                <tr key={bet.id}>
                  <td>{bet.userName}</td>
                  <td>{bet.event}</td>
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
        <h2>Gestão de usuários</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Saldo</th>
              <th>Apostas</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_USERS.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{formatCurrency(u.balance)}</td>
                <td>{u.bets}</td>
                <td>{u.status}</td>
                <td>
                  <button type="button" className="btn btn-outline" style={{ padding: "0.3rem 0.6rem", fontSize: "0.75rem" }}>
                    Gerenciar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
