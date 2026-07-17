import { Request, Response } from "express";

type QuoteItem = {
  key: string;
  label: string;
  value: number | null;
  changePct: number | null;
  kind: "fx" | "index";
};

async function fetchJson(url: string) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "BetShow/1.0",
    },
  });
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
  return response.json();
}

async function fetchFx(): Promise<QuoteItem[]> {
  const data = await fetchJson(
    "https://economia.awesomeapi.com.br/json/last/USD-BRL,USD-BRLT"
  );

  const commercial = data.USDBRL;
  const tourism = data.USDBRLT;

  return [
    {
      key: "usd-comercial",
      label: "Dólar comercial",
      value: commercial ? Number(commercial.bid) : null,
      changePct: commercial ? Number(commercial.pctChange) : null,
      kind: "fx",
    },
    {
      key: "usd-turismo",
      label: "Dólar turismo",
      value: tourism ? Number(tourism.bid) : null,
      changePct: tourism ? Number(tourism.pctChange) : null,
      kind: "fx",
    },
  ];
}

async function fetchYahooIndex(
  symbol: string,
  key: string,
  label: string
): Promise<QuoteItem> {
  const encoded = encodeURIComponent(symbol);
  const data = await fetchJson(
    `https://query1.finance.yahoo.com/v8/finance/chart/${encoded}?interval=1d&range=5d`
  );
  const meta = data?.chart?.result?.[0]?.meta;
  const price = Number(meta?.regularMarketPrice ?? NaN);
  const previous = Number(meta?.chartPreviousClose ?? meta?.previousClose ?? NaN);
  const changePct =
    Number.isFinite(price) && Number.isFinite(previous) && previous !== 0
      ? ((price - previous) / previous) * 100
      : null;

  return {
    key,
    label,
    value: Number.isFinite(price) ? price : null,
    changePct,
    kind: "index",
  };
}

export async function getMarkets(_req: Request, res: Response) {
  try {
    const [fx, ibov, sp500, nasdaq, dow] = await Promise.all([
      fetchFx(),
      fetchYahooIndex("^BVSP", "ibovespa", "Ibovespa"),
      fetchYahooIndex("^GSPC", "sp500", "S&P 500"),
      fetchYahooIndex("^IXIC", "nasdaq", "Nasdaq"),
      fetchYahooIndex("^DJI", "dow", "Dow Jones"),
    ]);

    res.json({
      updatedAt: new Date().toISOString(),
      items: [...fx, ibov, sp500, nasdaq, dow],
    });
  } catch (error) {
    console.error("Markets error:", error);
    res.status(502).json({ error: "Não foi possível atualizar as cotações." });
  }
}
