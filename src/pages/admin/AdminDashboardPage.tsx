import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useAuth } from "../../contexts/AuthContext";
import {
  fetchAllBets,
  fetchAllTransactions,
  fetchFinancialSummary,
  fetchUsers,
  settleBet,
} from "../../services/betting";
import type { Bet } from "../../types/bet";
import type { Transaction, FinancialSummary } from "../../types/payment";
import { formatCurrency, formatDateTime } from "../../utils/formatters";
import "../../styles/dashboard.css";

const ADMIN_LINKS = [
  { to: "/admin", label: "Financeiro", icon: "💼" },
  { to: "/admin/apostas", label: "Apostas", icon: "🎯" },
  { to: "/admin/usuarios", label: "Usuários", icon: "👥" },
  { to: "/", label: "Site", icon: "🏠" },
];

const EMPTY_FIN: FinancialSummary = {
  totalDeposits: 0,
  totalWithdrawals: 0,
  totalBetsVolume: 0,
  totalPayouts: 0,
  platformRevenue: 0,
  pendingWithdrawals: 0,
  activeUsers: 0,
  newUsersToday: 0,
};

type AdminUser = {
  id: string;
  name: string;
  email: string;
  balance: number;
  bets: number;
  status: string;
};

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [fin, setFin] = useState<FinancialSummary>(EMPTY_FIN);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [bets, setBets] = useState<Bet[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyBetId, setBusyBetId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError("");

    const [summary, txs, allBets, allUsers] = await Promise.all([
      fetchFinancialSummary(),
      fetchAllTransactions(),
      fetchAllBets(),
      fetchUsers(),
    ]);

    if (summary.ok && summary.data) setFin(summary.data.summary);
    if (txs.ok && txs.data) setTransactions(txs.data.transactions);
    if (allBets.ok && allBets.data) setBets(allBets.data.bets);
    if (allUsers.ok && allUsers.data) setUsers(allUsers.data.users);

    if (!summary.ok && !allUsers.ok) {
      setError("Não foi possível carregar o painel admin. Verifique o backend e o login com usuário admin do banco.");
    }

    setLoading(false);
  }

  useEffect(() => {
    if (!user || user.role !== "admin") return;
    load();
  }, [user?.id]);

  async function handleSettle(betId: string, status: Bet["status"]) {
    setBusyBetId(betId);
    const result = await settleBet(betId, status);
    setBusyBetId(null);
    if (result.ok) {
      await load();
    } else {
      setError(result.error ?? "Falha ao liquidar aposta.");
    }
  }

  if (!user || user.role !== "admin") return <Navigate to="/login" replace />;

  return (
    <DashboardLayout variant="admin" links={ADMIN_LINKS}>
      <header className="dashboard-header">
        <div>
          <h1>Painel Administrativo</h1>
          <p>
            Gestão financeira · Apostas · Usuários · {user.fullName}
          </p>
        </div>
      </header>

      {error && (
        <div className="form-alert form-alert--error" role="alert" style={{ marginBottom: "1rem" }}>
          {error}
        </div>
      )}

      {loading ? (
        <p style={{ color: "var(--text-muted)" }}>Carregando dados...</p>
      ) : (
        <>
          <div className="dashboard-stats">
            <div className="stat-card">
              <p className="stat-card__label">Depósitos totais</p>
              <p className="stat-card__value stat-card__value--positive">
                {formatCurrency(fin.totalDeposits)}
              </p>
            </div>
            <div className="stat-card">
              <p className="stat-card__label">Saques totais</p>
              <p className="stat-card__value">{formatCurrency(fin.totalWithdrawals)}</p>
            </div>
            <div className="stat-card">
              <p className="stat-card__label">Volume de apostas</p>
              <p className="stat-card__value stat-card__value--gold">
                {formatCurrency(fin.totalBetsVolume)}
              </p>
            </div>
            <div className="stat-card">
              <p className="stat-card__label">Receita plataforma</p>
              <p className="stat-card__value stat-card__value--positive">
                {formatCurrency(fin.platformRevenue)}
              </p>
            </div>
            <div className="stat-card">
              <p className="stat-card__label">Saques pendentes</p>
              <p className="stat-card__value stat-card__value--negative">
                {formatCurrency(fin.pendingWithdrawals)}
              </p>
            </div>
            <div className="stat-card">
              <p className="stat-card__label">Usuários</p>
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
                  {transactions.length === 0 ? (
                    <tr>
                      <td colSpan={5}>Nenhuma movimentação registrada.</td>
                    </tr>
                  ) : (
                    transactions.slice(0, 12).map((tx) => (
                      <tr key={tx.id}>
                        <td>{tx.userName}</td>
                        <td>{tx.type}</td>
                        <td>{formatCurrency(tx.amount)}</td>
                        <td>
                          <span
                            className={`badge badge--${
                              tx.status === "completed" ? "completed" : "pending"
                            }`}
                          >
                            {tx.status}
                          </span>
                        </td>
                        <td>{formatDateTime(tx.createdAt)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="dashboard-panel">
              <h2>Apostas</h2>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Usuário</th>
                    <th>Evento</th>
                    <th>Stake</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {bets.length === 0 ? (
                    <tr>
                      <td colSpan={5}>Nenhuma aposta registrada.</td>
                    </tr>
                  ) : (
                    bets.slice(0, 12).map((bet) => (
                      <tr key={bet.id}>
                        <td>{bet.userName}</td>
                        <td>{bet.event}</td>
                        <td>{formatCurrency(bet.stake)}</td>
                        <td>
                          <span
                            className={`badge badge--${
                              bet.status === "won"
                                ? "won"
                                : bet.status === "lost"
                                  ? "lost"
                                  : "pending"
                            }`}
                          >
                            {bet.status}
                          </span>
                        </td>
                        <td>
                          {bet.status === "pending" ? (
                            <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                              <button
                                type="button"
                                className="btn btn-outline"
                                style={{ padding: "0.3rem 0.55rem", fontSize: "0.7rem" }}
                                disabled={busyBetId === bet.id}
                                onClick={() => handleSettle(bet.id, "won")}
                              >
                                Won
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline"
                                style={{ padding: "0.3rem 0.55rem", fontSize: "0.7rem" }}
                                disabled={busyBetId === bet.id}
                                onClick={() => handleSettle(bet.id, "lost")}
                              >
                                Lost
                              </button>
                            </div>
                          ) : (
                            "—"
                          )}
                        </td>
                      </tr>
                    ))
                  )}
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
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={5}>Nenhum usuário cadastrado.</td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{formatCurrency(u.balance)}</td>
                      <td>{u.bets}</td>
                      <td>{u.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
