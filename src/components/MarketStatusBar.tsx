import { useEffect, useState } from "react";
import { loadMarkets, type MarketQuote } from "../services/markets";
import "./MarketStatusBar.css";

function formatValue(item: MarketQuote) {
  if (item.value == null || Number.isNaN(item.value)) return "—";
  if (item.kind === "fx") {
    return item.value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    });
  }
  return item.value.toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

function formatChange(changePct: number | null) {
  if (changePct == null || Number.isNaN(changePct)) return "—";
  const sign = changePct > 0 ? "+" : "";
  return `${sign}${changePct.toFixed(2)}%`;
}

function changeClass(changePct: number | null) {
  if (changePct == null || Number.isNaN(changePct) || changePct === 0) {
    return "market-status__change--flat";
  }
  return changePct > 0 ? "market-status__change--up" : "market-status__change--down";
}

function QuoteCard({ item }: { item: MarketQuote }) {
  return (
    <article className="market-status__item">
      <span className="market-status__label">{item.label}</span>
      <strong className="market-status__value">{formatValue(item)}</strong>
      <span className={`market-status__change ${changeClass(item.changePct)}`}>
        {formatChange(item.changePct)}
      </span>
    </article>
  );
}

function formatTodayLabel(date = new Date()) {
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function MarketStatusBar() {
  const [items, setItems] = useState<MarketQuote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [todayLabel, setTodayLabel] = useState(() => formatTodayLabel());

  useEffect(() => {
    let alive = true;

    async function refresh() {
      try {
        const data = await loadMarkets();
        if (!alive) return;
        setItems(data.items);
        setTodayLabel(formatTodayLabel());
        setError("");
      } catch {
        if (!alive) return;
        setTodayLabel(formatTodayLabel());
        setError("Cotações indisponíveis no momento");
      } finally {
        if (alive) setLoading(false);
      }
    }

    refresh();
    const timer = window.setInterval(refresh, 60_000);
    return () => {
      alive = false;
      window.clearInterval(timer);
    };
  }, []);

  const track = (items.length ? items : placeholderItems).filter(Boolean);
  // Duplica o grupo para loop contínuo sem “salto”
  const loopItems = [...track, ...track, ...track];
  const statusLine = loading
    ? "Atualizando cotações…"
    : error
      ? error
      : `Ao vivo · ${todayLabel} · 24hrs`;

  return (
    <section className="market-status" aria-label="Barra de status de mercados">
      <div className="market-status__inner">
        <div className="market-status__brand">
          <span className="market-status__live" aria-hidden />
          <div>
            <strong>Mercados agora</strong>
            <small>{statusLine}</small>
          </div>
        </div>

        <div className="market-status__viewport" aria-hidden={false}>
          <div className="market-status__track" role="list">
            {loopItems.map((item, index) => (
              <div key={`${item.key}-${index}`} className="market-status__slot" role="listitem">
                <QuoteCard item={item} />
                <span className="market-status__sep" aria-hidden>
                  •
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const placeholderItems: MarketQuote[] = [
  { key: "usd-comercial", label: "Dólar comercial", value: null, changePct: null, kind: "fx" },
  { key: "usd-turismo", label: "Dólar turismo", value: null, changePct: null, kind: "fx" },
  { key: "ibovespa", label: "Ibovespa", value: null, changePct: null, kind: "index" },
  { key: "sp500", label: "S&P 500", value: null, changePct: null, kind: "index" },
  { key: "nasdaq", label: "Nasdaq", value: null, changePct: null, kind: "index" },
  { key: "dow", label: "Dow Jones", value: null, changePct: null, kind: "index" },
];
