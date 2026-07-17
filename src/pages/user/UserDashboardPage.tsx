import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useAuth } from "../../contexts/AuthContext";
import { BRAND } from "../../data/brand";
import { fetchMyBets, fetchMyTransactions, fetchUserDashboard } from "../../services/betting";
import type { Bet, UserBetStats } from "../../types/bet";
import type { Transaction } from "../../types/payment";
import { formatCurrency, formatPercent, formatDateTime } from "../../utils/formatters";
import "../../styles/dashboard.css";

const USER_LINKS = [
  { to: "/dashboard", label: "Visão geral", icon: "📊" },
  { to: "/dashboard/apostas", label: "Minhas apostas", icon: "🎯" },
  { to: "/pagamento", label: "Depositar", icon: "💰" },
  { to: "/", label: "Site", icon: "🏠" },
];

const EMPTY_STATS: UserBetStats = {
  totalBets: 0,
  winRate: 0,
  totalStaked: 0,
  totalReturns: 0,
  profitLoss: 0,
  activeBets: 0,
  favoriteSport: "Futebol",
  copa2026Bets: 0,
};

export default function UserDashboardPage() {
  const { user, updateUser } = useAuth();
  const [stats, setStats] = useState<UserBetStats>(EMPTY_STATS);
  const [bets, setBets] = useState<Bet[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.role === "admin") return;

    const currentUser = user;
    let active = true;

    async function load() {
      setLoading(true);
      setError("");

      const [dash, myBets, myTx] = await Promise.all([
        fetchUserDashboard(),
        fetchMyBets(),
        fetchMyTransactions(),
      ]);

      if (!active) return;

      if (dash.ok && dash.data) {
        setStats(dash.data.stats ?? EMPTY_STATS);
        if (dash.data.user) {
          updateUser({
            balance: Number(dash.data.user.balance ?? currentUser.balance),
            bonusBalance: Number(dash.data.user.bonusBalance ?? currentUser.bonusBalance),
            cashbackEarned: Number(dash.data.user.cashbackEarned ?? currentUser.cashbackEarned),
          });
        }
      }

      if (myBets.ok && myBets.data) setBets(myBets.data.bets);
      if (myTx.ok && myTx.data) setTransactions(myTx.data.transactions);

      if (!dash.ok && !myBets.ok) {
        setError("Não foi possível carregar os dados do painel. Verifique o backend.");
      }

      setLoading(false);
    }

    load();
    return () => {
      active = false;
    };
  }, [user?.id]);

  if (!user || user.role === "admin") return <Navigate to="/login" replace />;

  const roi =
    stats.totalStaked > 0 ? (stats.profitLoss / stats.totalStaked) * 100 : 0;

  return (
    <DashboardLayout variant="user" links={USER_LINKS}>
      <div className="copa-banner">
        <div>
          <h2>🏆 {BRAND.copa2026.title}</h2>
          <p>
            {stats.copa2026Bets} apostas na Copa · Cashback {BRAND.cashbackRate}
          </p>
        </div>
        <a href="/#copa2026" className="btn btn-gold">
          Ver mercados Copa
        </a>
      </div>

      <header className="dashboard-header">
        <div>
          <h1>Olá, {user.fullName.split(" ")[0]}!</h1>
          <p>
            Matrícula {user.matricula} · {user.email}
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Saldo disponível</p>
          <p style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--neon-green)" }}>
            {formatCurrency(user.balance + user.bonusBalance)}
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
              <p className="stat-card__label">Total apostas</p>
              <p className="stat-card__value">{stats.totalBets}</p>
            </div>
            <div className="stat-card">
              <p className="stat-card__label">Taxa de acerto</p>
              <p className="stat-card__value stat-card__value--positive">
                {formatPercent(stats.winRate)}
              </p>
            </div>
            <div className="stat-card">
              <p className="stat-card__label">Lucro / Prejuízo</p>
              <p
                className={`stat-card__value${
                  stats.profitLoss >= 0
                    ? " stat-card__value--positive"
                    : " stat-card__value--negative"
                }`}
              >
                {formatCurrency(stats.profitLoss)}
              </p>
            </div>
            <div className="stat-card">
              <p className="stat-card__label">Cashback acumulado</p>
              <p className="stat-card__value stat-card__value--gold">
                {formatCurrency(user.cashbackEarned)}
              </p>
            </div>
            <div className="stat-card">
              <p className="stat-card__label">Apostas ativas</p>
              <p className="stat-card__value">{stats.activeBets}</p>
            </div>
            <div className="stat-card">
              <p className="stat-card__label">Mercado favorito</p>
              <p className="stat-card__value" style={{ fontSize: "1.25rem" }}>
                {stats.favoriteSport}
              </p>
            </div>
          </div>

          <div className="dashboard-grid">
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
                  {bets.length === 0 ? (
                    <tr>
                      <td colSpan={4}>Nenhuma aposta registrada ainda.</td>
                    </tr>
                  ) : (
                    bets.slice(0, 8).map((bet) => (
                      <tr key={bet.id}>
                        <td>{bet.event}</td>
                        <td>{bet.odd.toFixed(2)}</td>
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
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="dashboard-panel">
              <h2>Movimentações</h2>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th>Data</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length === 0 ? (
                    <tr>
                      <td colSpan={4}>Nenhuma movimentação ainda.</td>
                    </tr>
                  ) : (
                    transactions.slice(0, 8).map((tx) => (
                      <tr key={tx.id}>
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
          </div>

          <div className="dashboard-panel" style={{ marginTop: "var(--space-lg)" }}>
            <h2>Análise de dados</h2>
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
                  {formatPercent(roi)}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
