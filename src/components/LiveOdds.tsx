import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { placeBet } from "../services/betting";
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
    league: "Brasileirão",
    home: "Flamengo",
    away: "Palmeiras",
    time: "61'",
    score: "1 - 1",
    odds: [2.2, 3.15, 3.05],
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
    league: "NBB",
    home: "Flamengo Basquete",
    away: "Franca",
    time: "Q2 3:10",
    score: "42 - 39",
    odds: [1.85, null, 1.95],
    hot: false,
  },
  {
    league: "ATP Miami",
    home: "Alcaraz",
    away: "Sinner",
    time: "Set 2",
    score: "6-4 · 3-3",
    odds: [1.72, null, 2.15],
    hot: true,
  },
  {
    league: "Superliga Vôlei",
    home: "Sada Cruzeiro",
    away: "Minas",
    time: "3º set",
    score: "1 - 1",
    odds: [1.9, null, 1.88],
    hot: false,
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
  {
    league: "Fórmula 1 · GP Brasil",
    home: "Verstappen",
    away: "Norris",
    time: "Volta 38",
    score: "P1 · P2",
    odds: [1.45, null, 2.85],
    hot: true,
  },
  {
    league: "CS2 · Major",
    home: "NAVI",
    away: "Vitality",
    time: "Map 2",
    score: "1 - 0",
    odds: [1.98, null, 1.82],
    hot: false,
  },
  {
    league: "LoL Worlds",
    home: "T1",
    away: "Gen.G",
    time: "Game 3",
    score: "1 - 1",
    odds: [1.88, null, 1.92],
    hot: true,
  },
  {
    league: "La Liga",
    home: "Barcelona",
    away: "Atlético",
    time: "20:00",
    score: "—",
    odds: [1.8, 3.5, 4.2],
    hot: false,
  },
  {
    league: "Premier League",
    home: "Arsenal",
    away: "Liverpool",
    time: "17:30",
    score: "—",
    odds: [2.55, 3.4, 2.65],
    hot: true,
  },
] as const;

const SELECTION_LABELS = ["1", "X", "2"] as const;

type Match = (typeof MATCHES)[number];

export default function LiveOdds() {
  const { isAuthenticated, updateUser } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [busyKey, setBusyKey] = useState<string | null>(null);

  async function handleBet(match: Match, oddIndex: number, odd: number) {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const stakeRaw = window.prompt(
      `Valor da aposta em R$ para ${match.home} vs ${match.away} (${SELECTION_LABELS[oddIndex]} @ ${odd.toFixed(2)})`,
      "20"
    );

    if (stakeRaw === null) return;

    const stake = Number(stakeRaw.replace(",", "."));
    if (!(stake > 0)) {
      setMessage("Informe um valor de aposta válido.");
      return;
    }

    const key = `${match.home}-${match.away}-${oddIndex}`;
    setBusyKey(key);
    setMessage("");

    const result = await placeBet({
      eventName: `${match.home} vs ${match.away}`,
      market: match.league,
      selection: SELECTION_LABELS[oddIndex],
      odd,
      stake,
    });

    setBusyKey(null);

    if (!result.ok || !result.data) {
      setMessage(result.error ?? "Falha ao registrar aposta. Faça login e verifique o saldo.");
      return;
    }

    updateUser({
      balance: result.data.balance,
      bonusBalance: result.data.bonusBalance,
    });
    setMessage(`Aposta registrada: ${match.home} vs ${match.away} · R$ ${stake.toFixed(2)}`);
  }

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
          {message && (
            <p className="odds__feedback" role="status">
              {message}
            </p>
          )}
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
              {MATCHES.map((m) => {
                const firstOdd = m.odds.find((o) => o !== null) ?? 1.5;
                const firstIndex = m.odds.findIndex((o) => o !== null);

                return (
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
                          <button
                            type="button"
                            className="odds__btn"
                            disabled={busyKey === `${m.home}-${m.away}-${i}`}
                            onClick={() => handleBet(m, i, o)}
                          >
                            {o.toFixed(2)}
                          </button>
                        ) : (
                          <span className="odds__na">—</span>
                        )}
                      </td>
                    ))}
                    <td>
                      <button
                        type="button"
                        className="odds__bet btn btn-primary"
                        disabled={busyKey !== null}
                        onClick={() => handleBet(m, firstIndex, Number(firstOdd))}
                      >
                        Apostar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
