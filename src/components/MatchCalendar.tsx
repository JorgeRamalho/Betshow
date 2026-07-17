import { useMemo, useState } from "react";
import "./MatchCalendar.css";

const SOFASCORE_URL = "https://www.sofascore.com/";

const SPORTS = [
  { id: "all", label: "Todos" },
  { id: "football", label: "Futebol", sofa: "https://www.sofascore.com/football" },
  { id: "basketball", label: "Basquete", sofa: "https://www.sofascore.com/basketball" },
  { id: "tennis", label: "Tênis", sofa: "https://www.sofascore.com/tennis" },
  { id: "mma", label: "MMA", sofa: "https://www.sofascore.com/mma" },
  { id: "volleyball", label: "Vôlei", sofa: "https://www.sofascore.com/volleyball" },
  { id: "motorsport", label: "F1", sofa: "https://www.sofascore.com/motorsport" },
  { id: "esports", label: "E-Sports", sofa: "https://www.sofascore.com/esports" },
] as const;

type SportId = (typeof SPORTS)[number]["id"];

type CalendarMatch = {
  id: string;
  sport: Exclude<SportId, "all">;
  league: string;
  home: string;
  away: string;
  date: string;
  time: string;
  status: "agendado" | "ao vivo" | "encerrado";
};

/** Agenda demonstrativa — referência de cobertura: SofaScore */
const MATCHES: CalendarMatch[] = [
  {
    id: "1",
    sport: "football",
    league: "Brasileirão",
    home: "Flamengo",
    away: "Palmeiras",
    date: "2026-07-18",
    time: "16:00",
    status: "agendado",
  },
  {
    id: "2",
    sport: "football",
    league: "Premier League",
    home: "Arsenal",
    away: "Liverpool",
    date: "2026-07-18",
    time: "12:30",
    status: "ao vivo",
  },
  {
    id: "3",
    sport: "basketball",
    league: "NBA",
    home: "Lakers",
    away: "Celtics",
    date: "2026-07-18",
    time: "22:00",
    status: "agendado",
  },
  {
    id: "4",
    sport: "tennis",
    league: "ATP",
    home: "Alcaraz",
    away: "Sinner",
    date: "2026-07-19",
    time: "14:00",
    status: "agendado",
  },
  {
    id: "5",
    sport: "mma",
    league: "UFC",
    home: "Pereira",
    away: "Adesanya",
    date: "2026-07-19",
    time: "23:00",
    status: "agendado",
  },
  {
    id: "6",
    sport: "volleyball",
    league: "Superliga",
    home: "Sada Cruzeiro",
    away: "Minas",
    date: "2026-07-20",
    time: "19:30",
    status: "agendado",
  },
  {
    id: "7",
    sport: "motorsport",
    league: "Fórmula 1",
    home: "GP Brasil",
    away: "Corrida",
    date: "2026-07-20",
    time: "15:00",
    status: "agendado",
  },
  {
    id: "8",
    sport: "esports",
    league: "CS2 Major",
    home: "NAVI",
    away: "Vitality",
    date: "2026-07-21",
    time: "17:00",
    status: "agendado",
  },
  {
    id: "9",
    sport: "football",
    league: "Champions League",
    home: "Real Madrid",
    away: "Man. City",
    date: "2026-07-21",
    time: "16:45",
    status: "agendado",
  },
  {
    id: "10",
    sport: "basketball",
    league: "NBB",
    home: "Flamengo",
    away: "Franca",
    date: "2026-07-22",
    time: "20:00",
    status: "agendado",
  },
];

function formatDateLabel(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
}

function sportLabel(id: CalendarMatch["sport"]) {
  return SPORTS.find((s) => s.id === id)?.label ?? id;
}

export default function MatchCalendar() {
  const [sport, setSport] = useState<SportId>("all");

  const filtered = useMemo(() => {
    const list = sport === "all" ? MATCHES : MATCHES.filter((m) => m.sport === sport);
    return [...list].sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));
  }, [sport]);

  const grouped = useMemo(() => {
    const map = new Map<string, CalendarMatch[]>();
    for (const match of filtered) {
      const current = map.get(match.date) ?? [];
      current.push(match);
      map.set(match.date, current);
    }
    return [...map.entries()];
  }, [filtered]);

  const activeSport = SPORTS.find((s) => s.id === sport);

  return (
    <section className="calendar" id="calendario" aria-labelledby="calendar-title">
      <div className="container">
        <header className="calendar__header">
          <div>
            <h2 id="calendar-title" className="section-title">
              Calendário de <span>partidas</span>
            </h2>
            <p className="section-sub">
              Agenda multi-esporte para acompanhar os jogos do dia. Referência de
              cobertura completa:{" "}
              <a
                href={SOFASCORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="calendar__ref-link"
              >
                SofaScore
              </a>
              .
            </p>
          </div>
          <a
            href={SOFASCORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline calendar__sofa-btn"
          >
            Abrir SofaScore
          </a>
        </header>

        <div className="calendar__filters" role="tablist" aria-label="Filtrar por esporte">
          {SPORTS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={sport === item.id}
              className={`calendar__chip${sport === item.id ? " calendar__chip--active" : ""}`}
              onClick={() => setSport(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {activeSport && "sofa" in activeSport && activeSport.sofa && (
          <p className="calendar__sport-ref">
            Ver {activeSport.label} no SofaScore:{" "}
            <a href={activeSport.sofa} target="_blank" rel="noopener noreferrer">
              {activeSport.sofa.replace("https://", "")}
            </a>
          </p>
        )}

        <div className="calendar__board">
          {grouped.length === 0 ? (
            <p className="calendar__empty">Nenhuma partida neste filtro.</p>
          ) : (
            grouped.map(([date, matches]) => (
              <article key={date} className="calendar__day">
                <h3 className="calendar__day-title">{formatDateLabel(date)}</h3>
                <ul className="calendar__list">
                  {matches.map((match) => (
                    <li key={match.id} className="calendar__item">
                      <div className="calendar__meta">
                        <span className="calendar__time">{match.time}</span>
                        <span className="calendar__sport">{sportLabel(match.sport)}</span>
                        <span
                          className={`calendar__status calendar__status--${
                            match.status === "ao vivo"
                              ? "live"
                              : match.status === "encerrado"
                                ? "done"
                                : "soon"
                          }`}
                        >
                          {match.status}
                        </span>
                      </div>
                      <div className="calendar__match">
                        <strong>
                          {match.home} <span>vs</span> {match.away}
                        </strong>
                        <small>{match.league}</small>
                      </div>
                      <a
                        href={SOFASCORE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="calendar__open"
                      >
                        Ver no SofaScore
                      </a>
                    </li>
                  ))}
                </ul>
              </article>
            ))
          )}
        </div>

        <p className="calendar__note">
          Os placares e horários oficiais devem ser confirmados no{" "}
          <a href={SOFASCORE_URL} target="_blank" rel="noopener noreferrer">
            SofaScore
          </a>
          . Esta agenda do BetShow é uma visão rápida para apostas e acompanhamento.
        </p>
      </div>
    </section>
  );
}
