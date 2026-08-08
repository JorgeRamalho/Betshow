import { Link } from "react-router-dom";

export type LegalPageId = "termos" | "privacidade" | "cookies" | "jogo-responsavel";

const LEGAL_LINKS: { id: LegalPageId; to: string; label: string }[] = [
  { id: "termos", to: "/termos", label: "Termos" },
  { id: "privacidade", to: "/privacidade", label: "Privacidade" },
  { id: "cookies", to: "/cookies", label: "Cookies" },
  { id: "jogo-responsavel", to: "/jogo-responsavel", label: "Jogo responsável" },
];

type LegalNavProps = {
  current: LegalPageId;
};

export default function LegalNav({ current }: LegalNavProps) {
  return (
    <div className="legal-page__nav">
      <Link to="/" className="legal-page__back">
        ← Voltar ao início
      </Link>
      <nav className="legal-page__links" aria-label="Páginas legais">
        {LEGAL_LINKS.map((link) => (
          <Link
            key={link.id}
            to={link.to}
            aria-current={link.id === current ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
