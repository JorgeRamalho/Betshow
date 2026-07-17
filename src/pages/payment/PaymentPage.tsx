import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../components/brand/Logo";
import { useAuth } from "../../contexts/AuthContext";
import { BRAND } from "../../data/brand";
import { formatCurrency } from "../../utils/formatters";
import { apiFetch } from "../../services/api";
import "../../styles/forms.css";

export default function PaymentPage() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("100");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleDeposit() {
    if (!user) return;

    setStatus("loading");
    setMessage("");

    const result = await apiFetch<{
      status: string;
      amount: number;
      reference?: string;
      balance?: number;
      bonusBalance?: number;
    }>("/api/payments/deposit", {
      method: "POST",
      body: { amount: Number(amount), method: user.paymentMethod },
    });

    if (!result.ok || !result.data) {
      setStatus("error");
      setMessage(result.error ?? "Falha ao processar o depósito.");
      return;
    }

    updateUser({
      balance:
        typeof result.data.balance === "number"
          ? result.data.balance
          : user.balance + Number(amount),
      bonusBalance:
        typeof result.data.bonusBalance === "number"
          ? result.data.bonusBalance
          : user.bonusBalance,
    });
    setStatus("success");
    setMessage("Depósito realizado com sucesso. Redirecionando ao dashboard...");
    setTimeout(() => navigate("/dashboard"), 2000);
  }

  if (!user) {
    return (
      <div className="form-page">
        <div className="form-card">
          <p>Faça o cadastro primeiro.</p>
          <Link to="/cadastro" className="btn btn-primary">Cadastrar</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="form-page">
      <div className="form-card form-card--wide">
        <div className="form-card__head">
          <Logo size="lg" />
          <h1>Depósito · Ativar conta</h1>
          <p>Olá, {user.fullName.split(" ")[0]}! Matrícula {user.matricula}</p>
        </div>

        {status === "success" ? (
          <div className="form-alert form-alert--success" role="status">
            {message}
          </div>
        ) : (
          <>
            {status === "error" && (
              <div className="form-alert form-alert--error" role="alert">
                {message}
              </div>
            )}

            <div className="form-alert form-alert--success">
              Bônus de {BRAND.welcomeBonus} creditado! Código {BRAND.promoCode} aplicado.
            </div>

            <div className="form-field">
              <label htmlFor="amount">Valor do 1º depósito (R$)</label>
              <input
                id="amount"
                type="number"
                min="20"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div style={{ padding: "1rem", background: "var(--bg-input)", borderRadius: "var(--radius-sm)", marginBottom: "1rem" }}>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Método selecionado</p>
              <p style={{ fontWeight: 700, textTransform: "uppercase" }}>{user.paymentMethod}</p>
              <p style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>
                Total com bônus: {formatCurrency(Number(amount) + user.bonusBalance)}
              </p>
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-primary" onClick={handleDeposit} disabled={status === "loading"}>
                {status === "loading" ? "Processando..." : `Confirmar depósito via ${user.paymentMethod.toUpperCase()}`}
              </button>
            </div>
          </>
        )}

        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
          <Link to="/dashboard" style={{ color: "var(--neon-green)" }}>Ir ao dashboard</Link>
        </p>
      </div>
    </div>
  );
}
