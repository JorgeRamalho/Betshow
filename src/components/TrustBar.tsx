import type { ReactElement } from "react";
import "./TrustBar.css";

const TRUST_ITEMS = [
  {
    icon: "shield",
    title: "Site 100% seguro",
    desc: "SSL + criptografia ponta a ponta",
  },
  {
    icon: "cpf",
    title: "CPF verificado",
    desc: "KYC rápido e antifraude ativo",
  },
  {
    icon: "platform",
    title: "Plataforma 100%",
    desc: "Uptime garantido, sem quedas",
  },
  {
    icon: "gov",
    title: "Imposto GOV",
    desc: "Conformidade Lei 14.790/23",
  },
  {
    icon: "lock",
    title: "Apostas seguras",
    desc: "Limites responsáveis + autoexclusão",
  },
];

function TrustIcon({ type }: { type: string }) {
  const paths: Record<string, ReactElement> = {
    shield: (
      <path
        d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6l-8-4z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    ),
    cpf: (
      <>
        <rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
    platform: (
      <path
        d="M4 6h16v12H4V6zm0 4h16M8 6V4h8v2"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    ),
    gov: (
      <>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
    lock: (
      <path
        d="M8 11V8a4 4 0 118 0v3M6 11h12v9H6v-9z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    ),
  };
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden>
      {paths[type]}
    </svg>
  );
}

export default function TrustBar() {
  return (
    <section className="trust" aria-label="Selos de confiança">
      <div className="container trust__grid">
        {TRUST_ITEMS.map((item) => (
          <article key={item.title} className="trust__item">
            <div className="trust__icon">
              <TrustIcon type={item.icon} />
            </div>
            <div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
