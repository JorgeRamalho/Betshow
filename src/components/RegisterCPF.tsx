import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { SUPPORT_AVATAR } from "../data/avatars";
import "./RegisterCPF.css";

function formatCPF(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  return digits
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function isValidCPF(cpf: string): boolean {
  const digits = cpf.replace(/\D/g, "");
  if (digits.length !== 11 || /^(\d)\1+$/.test(digits)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(digits[i], 10) * (10 - i);
  let rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(digits[9], 10)) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(digits[i], 10) * (11 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  return rest === parseInt(digits[10], 10);
}

export default function RegisterCPF() {
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isValidCPF(cpf)) {
      setStatus("error");
      return;
    }
    setStatus("ok");
  }

  return (
    <section className="register" id="cadastro" aria-labelledby="register-title">
      <div className="register__glow" aria-hidden />
      <div className="container register__inner">
        <div className="register__info">
          <h2 id="register-title" className="section-title">
            Cadastro com <span>CPF verificado</span>
          </h2>
          <p className="section-sub">
            Conta única, identidade validada e depósitos protegidos. Processo
            rápido, em conformidade com a regulamentação brasileira.
          </p>

          <ul className="register__checks">
            <li>Verificação facial opcional em 30s</li>
            <li>Pix instantâneo para depósito e saque</li>
            <li>Retenção de impostos conforme legislação GOV</li>
            <li>Dados nunca vendidos a terceiros</li>
          </ul>

          <div className="register__seals">
            <span>🔒 SSL 256-bit</span>
            <span>✓ SPA/MF</span>
            <span>18+</span>
          </div>
        </div>

        <form className="register__form" onSubmit={handleSubmit} noValidate>
          <div className="register__form-head">
            <Avatar src={SUPPORT_AVATAR.src} alt={SUPPORT_AVATAR.alt} size="lg" ring="cyan" />
            <div>
              <h3>Criar conta grátis</h3>
              <p className="register__form-sub">Bônus BETSHOW500 · atendimento humano</p>
            </div>
          </div>

          <label htmlFor="cpf">CPF</label>
          <input
            id="cpf"
            type="text"
            inputMode="numeric"
            placeholder="000.000.000-00"
            value={cpf}
            onChange={(e) => {
              setCpf(formatCPF(e.target.value));
              setStatus("idle");
            }}
            aria-invalid={status === "error"}
            aria-describedby={status === "error" ? "cpf-error" : undefined}
            required
          />
          {status === "error" && (
            <p id="cpf-error" className="register__error" role="alert">
              CPF inválido. Verifique os números digitados.
            </p>
          )}

          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="register__terms">
            <input type="checkbox" required />
            <span>
              Confirmo ter 18+ anos, aceito os termos e autorizo verificação de
              identidade (KYC) e recolhimento de impostos conforme Lei 14.790/23.
            </span>
          </label>

          <button type="submit" className="btn btn-primary register__submit">
            Verificar CPF e criar conta
          </button>

          {status === "ok" && (
            <p className="register__success" role="status">
              CPF validado! <Link to="/cadastro">Complete seu cadastro</Link> para ativar a conta.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
