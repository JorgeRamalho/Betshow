import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../components/brand/Logo";
import { useAuth } from "../../contexts/AuthContext";
import { BRAND } from "../../data/brand";
import type { RegisterFormData } from "../../types/user";
import { EMPTY_REGISTER } from "../../types/user";
import {
  formatCPF,
  formatPhone,
  formatCEP,
  isValidCPF,
  isValidEmail,
  isValidPassword,
  isAdult,
  generateMatricula,
} from "../../utils/validators";
import "../../styles/forms.css";

const STEPS = ["Dados pessoais", "Contato", "Segurança", "Pagamento", "Revisão"];

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<RegisterFormData>({
    ...EMPTY_REGISTER,
    matricula: generateMatricula(),
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function update(field: keyof RegisterFormData, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function validateStep(): boolean {
    const e: Record<string, string> = {};
    if (step === 0) {
      if (!form.fullName.trim()) e.fullName = "Nome obrigatório";
      if (!isValidCPF(form.cpf)) e.cpf = "CPF inválido";
      if (!form.birthDate) e.birthDate = "Data de nascimento obrigatória";
      else if (!isAdult(form.birthDate)) {
        e.birthDate = "Cadastro permitido apenas para maiores de 18 anos";
      }
    }
    if (step === 1) {
      if (!isValidEmail(form.email)) e.email = "E-mail inválido";
      if (form.phone.replace(/\D/g, "").length < 10) e.phone = "Telefone inválido";
      if (!form.city.trim()) e.city = "Cidade obrigatória";
    }
    if (step === 2) {
      if (!isValidPassword(form.password)) e.password = "Mín. 8 caracteres, 1 maiúscula e 1 número";
      if (form.password !== form.confirmPassword) e.confirmPassword = "Senhas não coincidem";
    }
    if (step === 3) {
      if (form.paymentMethod === "pix" && !form.pixKey.trim()) e.pixKey = "Chave PIX obrigatória";
      if (form.paymentMethod === "card" && form.cardNumber.replace(/\D/g, "").length < 16) {
        e.cardNumber = "Número do cartão inválido";
      }
    }
    if (step === 4 && !form.acceptTerms) e.acceptTerms = "Aceite os termos para continuar";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (!validateStep()) return;
    if (step < STEPS.length - 1) setStep(step + 1);
    else submit();
  }

  async function submit() {
    setSubmitError("");
    setIsSubmitting(true);

    const success = await register(form);
    setIsSubmitting(false);

    if (success) {
      navigate("/pagamento");
      return;
    }

    setSubmitError("Falha ao registrar. Verifique seus dados e tente novamente.");
  }

  return (
    <div className="form-page">
      <div className="form-card form-card--wide">
        <div className="form-card__head">
          <Logo size="lg" />
          <h1>Criar conta · {BRAND.promoCode}</h1>
          <p>Bônus de {BRAND.welcomeBonus} · Matrícula: {form.matricula}</p>
        </div>

        <div className="form-step-labels">
          {STEPS.map((s, i) => (
            <span key={s} style={{ color: i <= step ? "var(--neon-green)" : undefined }}>
              {s}
            </span>
          ))}
        </div>
        <div className="form-steps">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`form-step${i <= step ? " form-step--active" : ""}${i < step ? " form-step--done" : ""}`}
            />
          ))}
        </div>

        {step === 0 && (
          <>
            <div className="form-field">
              <label htmlFor="fullName">Nome completo</label>
              <input id="fullName" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} aria-invalid={!!errors.fullName} />
              {errors.fullName && <p className="form-field__error">{errors.fullName}</p>}
            </div>
            <div className="form-alert" role="note">
              <strong>Atenção:</strong> o cadastro é exclusivo para pessoas maiores de idade
              (18 anos ou mais), conforme a legislação brasileira.
            </div>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="cpf">CPF</label>
                <input id="cpf" value={form.cpf} onChange={(e) => update("cpf", formatCPF(e.target.value))} placeholder="000.000.000-00" aria-invalid={!!errors.cpf} />
                {errors.cpf && <p className="form-field__error">{errors.cpf}</p>}
              </div>
              <div className="form-field">
                <label htmlFor="birthDate">Data de nascimento</label>
                <input
                  id="birthDate"
                  type="date"
                  value={form.birthDate}
                  max={new Date().toISOString().slice(0, 10)}
                  onChange={(e) => update("birthDate", e.target.value)}
                  aria-invalid={!!errors.birthDate}
                  aria-describedby="birthDate-hint"
                />
                <p id="birthDate-hint" className="form-field__hint">
                  É necessário ter 18 anos ou mais para criar uma conta.
                </p>
                {errors.birthDate && <p className="form-field__error">{errors.birthDate}</p>}
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="matricula">Matrícula</label>
              <input id="matricula" value={form.matricula} readOnly style={{ opacity: 0.7 }} />
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="email">E-mail</label>
                <input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} aria-invalid={!!errors.email} />
                {errors.email && <p className="form-field__error">{errors.email}</p>}
              </div>
              <div className="form-field">
                <label htmlFor="phone">Telefone</label>
                <input id="phone" value={form.phone} onChange={(e) => update("phone", formatPhone(e.target.value))} placeholder="(11) 99999-9999" aria-invalid={!!errors.phone} />
                {errors.phone && <p className="form-field__error">{errors.phone}</p>}
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="street">Endereço</label>
              <input id="street" value={form.street} onChange={(e) => update("street", e.target.value)} placeholder="Rua, avenida..." />
            </div>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="number">Número</label>
                <input id="number" value={form.number} onChange={(e) => update("number", e.target.value)} />
              </div>
              <div className="form-field">
                <label htmlFor="zip">CEP</label>
                <input id="zip" value={form.zip} onChange={(e) => update("zip", formatCEP(e.target.value))} placeholder="00000-000" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="city">Cidade</label>
                <input id="city" value={form.city} onChange={(e) => update("city", e.target.value)} aria-invalid={!!errors.city} />
                {errors.city && <p className="form-field__error">{errors.city}</p>}
              </div>
              <div className="form-field">
                <label htmlFor="state">Estado</label>
                <input id="state" value={form.state} onChange={(e) => update("state", e.target.value.toUpperCase().slice(0, 2))} placeholder="SP" maxLength={2} />
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="form-field">
              <label htmlFor="password">Senha</label>
              <input id="password" type="password" value={form.password} onChange={(e) => update("password", e.target.value)} aria-invalid={!!errors.password} />
              {errors.password && <p className="form-field__error">{errors.password}</p>}
            </div>
            <div className="form-field">
              <label htmlFor="confirmPassword">Confirmar senha</label>
              <input id="confirmPassword" type="password" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} aria-invalid={!!errors.confirmPassword} />
              {errors.confirmPassword && <p className="form-field__error">{errors.confirmPassword}</p>}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="payment-methods">
              {(["pix", "card", "bank"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  className={`payment-method${form.paymentMethod === m ? " payment-method--active" : ""}`}
                  onClick={() => update("paymentMethod", m)}
                >
                  {m === "pix" ? "📱 PIX" : m === "card" ? "💳 Cartão" : "🏦 Banco"}
                </button>
              ))}
            </div>
            {form.paymentMethod === "pix" && (
              <div className="form-field">
                <label htmlFor="pixKey">Chave PIX</label>
                <input id="pixKey" value={form.pixKey} onChange={(e) => update("pixKey", e.target.value)} placeholder="CPF, e-mail ou telefone" aria-invalid={!!errors.pixKey} />
                {errors.pixKey && <p className="form-field__error">{errors.pixKey}</p>}
              </div>
            )}
            {form.paymentMethod === "card" && (
              <>
                <div className="form-field">
                  <label htmlFor="cardNumber">Número do cartão</label>
                  <input id="cardNumber" value={form.cardNumber} onChange={(e) => update("cardNumber", e.target.value)} placeholder="0000 0000 0000 0000" aria-invalid={!!errors.cardNumber} />
                  {errors.cardNumber && <p className="form-field__error">{errors.cardNumber}</p>}
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="cardName">Nome no cartão</label>
                    <input id="cardName" value={form.cardName} onChange={(e) => update("cardName", e.target.value)} />
                  </div>
                  <div className="form-field">
                    <label htmlFor="cardExpiry">Validade</label>
                    <input id="cardExpiry" value={form.cardExpiry} onChange={(e) => update("cardExpiry", e.target.value)} placeholder="MM/AA" />
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {step === 4 && (
          <>
            <div className="form-alert form-alert--success">
              Revise seus dados antes de confirmar o cadastro e ir para o pagamento.
            </div>
            <dl style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.8 }}>
              <dt><strong>Nome:</strong> {form.fullName}</dt>
              <dt><strong>CPF:</strong> {form.cpf}</dt>
              <dt><strong>E-mail:</strong> {form.email}</dt>
              <dt><strong>Telefone:</strong> {form.phone}</dt>
              <dt><strong>Matrícula:</strong> {form.matricula}</dt>
              <dt><strong>Pagamento:</strong> {form.paymentMethod.toUpperCase()}</dt>
              <dt><strong>Bônus:</strong> {BRAND.welcomeBonus} ({BRAND.promoCode})</dt>
            </dl>
            <label className="form-checkbox" style={{ marginTop: "1rem" }}>
              <input type="checkbox" checked={form.acceptTerms} onChange={(e) => update("acceptTerms", e.target.checked)} />
              <span>
                Confirmo ter 18+ anos, aceito termos, KYC e recolhimento de impostos (Lei 14.790/23).
              </span>
            </label>
            {errors.acceptTerms && <p className="form-field__error">{errors.acceptTerms}</p>}
          </>
        )}

        {submitError && <div className="form-alert form-alert--error" role="alert">{submitError}</div>}

        <div className="form-actions">
          {step > 0 && (
            <button type="button" className="btn btn-outline" onClick={() => setStep(step - 1)}>
              Voltar
            </button>
          )}
          <button type="button" className="btn btn-primary" onClick={next} disabled={isSubmitting}>
            {step === STEPS.length - 1 ? "Confirmar cadastro" : "Continuar"}
          </button>
        </div>

        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
          Já tem conta? <Link to="/login" style={{ color: "var(--neon-green)" }}>Entrar</Link>
        </p>
      </div>
    </div>
  );
}
