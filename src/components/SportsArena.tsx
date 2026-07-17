import "./SportsArena.css";

const SPORTS = [
  {
    name: "Futebol",
    img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=700&q=80&fit=crop",
    events: "1.200+ jogos/mês",
    accent: "green",
    closeup: true,
  },
  {
    name: "Basquete",
    img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=700&q=80&fit=crop",
    events: "NBA · NBB · Euro",
    accent: "gold",
    closeup: true,
  },
  {
    name: "MMA & UFC",
    img: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=400&q=80",
    events: "Cards exclusivos",
    accent: "magenta",
    closeup: false,
  },
  {
    name: "E-Sports",
    img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80",
    events: "CS2 · LoL · Valorant",
    accent: "cyan",
    closeup: false,
  },
];

export default function SportsArena() {
  return (
    <section className="sports" id="esportes" aria-labelledby="sports-title">
      <div className="sports__bg-text" aria-hidden>
        BET
      </div>
      <div className="container">
        <header className="sports__header">
          <h2 id="sports-title" className="section-title">
            Todos os esportes, <span>uma só paixão</span>
          </h2>
          <p className="section-sub">
            Do estádio ao octógono, do parquet ao servidor — mercados
            profundos para torcedor e expert.
          </p>
        </header>

        <div className="sports__grid">
          {SPORTS.map((sport) => (
            <article
              key={sport.name}
              className={`sports__card sports__card--${sport.accent}${sport.closeup ? " sports__card--closeup" : ""}`}
            >
              <img src={sport.img} alt={sport.name} width={300} height={200} loading="lazy" />
              <div className="sports__gradient" aria-hidden />
              <div className="sports__overlay">
                <h3>{sport.name}</h3>
                <p>{sport.events}</p>
                <a href="#cadastro" className="sports__link">
                  Explorar mercados
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
