import "./LiveOdds.css";

const MATCHES = [
  {
    league: "Champions League",
    home: "Real Madrid",
    away: "Man. City",
    time: "72'",
    score: "2 - 1",
    odds: [1.95, 3.6, 3.2],
    hot: true,
  },
  {
    league: "NBA",
    home: "Lakers",
    away: "Celtics",
    time: "Q3 4:20",
    score: "78 - 81",
    odds: [2.1, null, 1.75],
    hot: false,
  },
  {
    league: "Brasileirão",
    home: "Corinthians",
    away: "São Paulo",
    time: "15:00",
    score: "—",
    odds: [2.45, 3.1, 2.8],
    hot: true,
  },
  {
    league: "UFC 312",
    home: "Pereira",
    away: "Adesanya",
    time: "Main",
    score: "—",
    odds: [1.55, null, 2.4],
    hot: true,
  },
];

export default function LiveOdds() {
  return (
    <section className="odds" id="odds" aria-labelledby="odds-title">
      <div className="container">
        <header className="odds__header">
          <h2 id="odds-title" className="section-title">
            Odds <span>ao vivo</span> agora
          </h2>
          <p className="section-sub">
            Linhas atualizadas em tempo real — clique e aposte em um toque.
          </p>
        </header>

        <div className="odds__table-wrap">
          <table className="odds__table">
            <thead>
              <tr>
                <th>Partida</th>
                <th>Placar</th>
                <th>1</th>
                <th>X</th>
                <th>2</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {MATCHES.map((m) => (
                <tr key={`${m.home}-${m.away}`} className={m.hot ? "odds__row--hot" : ""}>
                  <td>
                    <span className="odds__league">{m.league}</span>
                    <strong>
                      {m.home} <span>vs</span> {m.away}
                    </strong>
                    <span className="odds__time">{m.time}</span>
                  </td>
                  <td className="odds__score">{m.score}</td>
                  {m.odds.map((o, i) => (
                    <td key={i}>
                      {o !== null ? (
                        <button type="button" className="odds__btn">
                          {o.toFixed(2)}
                        </button>
                      ) : (
                        <span className="odds__na">—</span>
                      )}
                    </td>
                  ))}
                  <td>
                    <button type="button" className="odds__bet btn btn-primary">
                      Apostar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
