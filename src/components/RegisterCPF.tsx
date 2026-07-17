import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { SUPPORT_AVATAR } from "../data/avatars";
import { formatCPF, isValidCPF, isAdult } from "../utils/validators";
import "./RegisterCPF.css";

type FormStatus = "idle" | "ok" | "cpf-error" | "birth-error" | "underage";

export default function RegisterCPF() {
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!isValidCPF(cpf)) {
      setStatus("cpf-error");
      return;
    }

    if (!birthDate) {
      setStatus("birth-error");
      return;
    }

    if (!isAdult(birthDate)) {
      setStatus("underage");
      return;
    }

    setStatus("ok");
  }

  function clearStatus() {
    setStatus("idle");
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

          <div className="register__age-alert" role="note">
            <strong>Atenção:</strong> o cadastro é exclusivo para pessoas maiores
            de idade (18 anos ou mais), conforme a legislação brasileira.
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
              clearStatus();
            }}
            aria-invalid={status === "cpf-error"}
            aria-describedby={status === "cpf-error" ? "cpf-error" : undefined}
            required
          />
          {status === "cpf-error" && (
            <p id="cpf-error" className="register__error" role="alert">
              CPF inválido. Verifique os números digitados.
            </p>
          )}

          <label htmlFor="birthDate">Data de nascimento</label>
          <input
            id="birthDate"
            type="date"
            value={birthDate}
            max={new Date().toISOString().slice(0, 10)}
            onChange={(e) => {
              setBirthDate(e.target.value);
              clearStatus();
            }}
            aria-invalid={status === "birth-error" || status === "underage"}
            aria-describedby="birthDate-hint birthDate-error"
            required
          />
          <p id="birthDate-hint" className="register__hint">
            É necessário ter 18 anos ou mais para criar uma conta.
          </p>
          {status === "birth-error" && (
            <p id="birthDate-error" className="register__error" role="alert">
              Informe sua data de nascimento.
            </p>
          )}
          {status === "underage" && (
            <p id="birthDate-error" className="register__error" role="alert">
              Cadastro permitido apenas para maiores de 18 anos.
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
