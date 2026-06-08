import { Link } from "react-router-dom";
import { BRAND } from "../data/brand";
import "./Copa2026Banner.css";

export default function Copa2026Banner() {
  return (
    <section className="copa2026" id="copa2026" aria-labelledby="copa-title">
      <div className="container">
        <div className="copa2026__inner">
          <div className="copa2026__content">
            <span className="copa2026__badge">🏆 {BRAND.copa2026.title}</span>
            <h2 id="copa-title" className="copa2026__title">
              A maior Copa · <span>as melhores odds</span>
            </h2>
            <p className="copa2026__desc">
              {BRAND.copa2026.subtitle}. Sede: {BRAND.copa2026.hostCountries}.
              Cadastre-se com código <strong>{BRAND.promoCode}</strong> e ganhe{" "}
              <strong>{BRAND.welcomeBonus}</strong> + {BRAND.cashbackRate} cashback.
            </p>
            <div className="copa2026__actions">
              <Link to="/cadastro" className="btn btn-primary">
                Garantir bônus Copa 2026
              </Link>
              <Link to="/cadastro" className="btn btn-outline">
                {BRAND.betBackOffer}
              </Link>
            </div>
          </div>
          <div className="copa2026__visual" aria-hidden>
            <span className="copa2026__emoji">⚽</span>
            <span className="copa2026__emoji copa2026__emoji--gold">🏆</span>
            <span className="copa2026__emoji copa2026__emoji--cyan">🎯</span>
          </div>
        </div>
      </div>
    </section>
  );
}
