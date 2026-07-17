import "./SportsTicker.css";

const SPORTS = [
  "FUTEBOL",
  "BASQUETE",
  "MMA",
  "TÊNIS",
  "E-SPORTS",
  "VÔLEI",
  "F1",
  "COPA",
  "CHAMPIONS",
  "NBA",
  "UFC",
] as const;

/** Repetições dentro de cada grupo para cobrir telas largas sem buraco. */
const GROUP_REPEAT = 3;

function TickerGroup() {
  const items = Array.from({ length: GROUP_REPEAT }, () => SPORTS).flat();

  return (
    <div className="sports-ticker__group">
      {items.map((sport, index) => (
        <span key={`${sport}-${index}`} className="sports-ticker__item">
          {sport}
          <span className="sports-ticker__dot" aria-hidden>
            ·
          </span>
        </span>
      ))}
    </div>
  );
}

export default function SportsTicker() {
  return (
    <section className="sports-ticker" aria-label="Esportes disponíveis">
      <div className="sports-ticker__track" aria-hidden>
        <TickerGroup />
        <TickerGroup />
      </div>
    </section>
  );
}
