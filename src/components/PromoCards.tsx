import "./PromoCards.css";

const PROMOS = [
  {
    id: "bonus",
    tag: "Bônus",
    title: "Até R$ 500 no 1º depósito",
    desc: "Dobre sua banca com rollover justo. Código BETSHOW500 no cadastro.",
    gradient: "gold",
    figure: "🎯",
    cta: "Resgatar bônus",
  },
  {
    id: "cashback",
    tag: "Cashback",
    title: "15% de volta toda semana",
    desc: "Perdeu na rodada? Receba cashback automático na segunda-feira.",
    gradient: "green",
    figure: "♻️",
    cta: "Ativar cashback",
  },
  {
    id: "safe",
    tag: "Apostas seguras",
    title: "Proteção total da banca",
    desc: "Cash out antecipado, seguro de múltipla e limites personalizáveis.",
    gradient: "cyan",
    figure: "🛡️",
    cta: "Saiba mais",
  },
];

export default function PromoCards() {
  return (
    <section className="promos" id="bonus" aria-labelledby="promos-title">
      <div className="container">
        <header className="promos__header">
          <h2 id="promos-title" className="section-title">
            Vantagens que <span>prendem você</span>
          </h2>
          <p className="section-sub">
            Bônus agressivos, cashback real e ferramentas para apostar com
            inteligência — sem letras miúdas escondidas.
          </p>
        </header>

        <div className="promos__grid">
          {PROMOS.map((promo) => (
            <article
              key={promo.id}
              id={promo.id === "cashback" ? "cashback" : undefined}
              className={`promos__card promos__card--${promo.gradient}`}
            >
              <span className="promos__tag">{promo.tag}</span>
              <span className="promos__figure" aria-hidden>
                {promo.figure}
              </span>
              <h3>{promo.title}</h3>
              <p>{promo.desc}</p>
              <a href="#cadastro" className="promos__cta">
                {promo.cta}
                <span aria-hidden>→</span>
              </a>
              <div className="promos__shape" aria-hidden />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
