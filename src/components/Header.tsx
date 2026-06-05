import "./Header.css";

const NAV = [
  { label: "Esportes", href: "#esportes" },
  { label: "Embaixadores", href: "#embaixadores" },
  { label: "Sugestões", href: "#sugestoes-embaixadores" },
  { label: "Bônus", href: "#bonus" },
  { label: "Cashback", href: "#cashback" },
  { label: "Odds ao vivo", href: "#odds" },
  { label: "Segurança", href: "#cadastro" },
];

export default function Header() {
  return (
    <header className="header">
      <div className="header__inner container">
        <a href="#" className="header__logo" aria-label="BetShow início">
          <span className="header__logo-mark">BS</span>
          <span className="header__logo-text">
            Bet<span>Show</span>
          </span>
        </a>

        <nav className="header__nav" aria-label="Principal">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="header__link">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <a href="#cadastro" className="btn btn-outline header__login">
            Entrar
          </a>
          <a href="#cadastro" className="btn btn-primary">
            Cadastrar CPF
          </a>
        </div>
      </div>
    </header>
  );
}
