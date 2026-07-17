import { apiFetch } from "./api";

export type MarketQuote = {
  key: string;
  label: string;
  value: number | null;
  changePct: number | null;
  kind: "fx" | "index";
};

export type MarketsPayload = {
  updatedAt: string;
  items: MarketQuote[];
};

async function fetchFxFallback(): Promise<MarketQuote[]> {
  const response = await fetch(
    "https://economia.awesomeapi.com.br/json/last/USD-BRL,USD-BRLT"
  );
  if (!response.ok) throw new Error("FX fallback failed");
  const data = await response.json();

  return [
    {
      key: "usd-comercial",
      label: "Dólar comercial",
      value: data.USDBRL ? Number(data.USDBRL.bid) : null,
      changePct: data.USDBRL ? Number(data.USDBRL.pctChange) : null,
      kind: "fx",
    },
    {
      key: "usd-turismo",
      label: "Dólar turismo",
      value: data.USDBRLT ? Number(data.USDBRLT.bid) : null,
      changePct: data.USDBRLT ? Number(data.USDBRLT.pctChange) : null,
      kind: "fx",
    },
  ];
}

export async function loadMarkets(): Promise<MarketsPayload> {
  const fromApi = await apiFetch<MarketsPayload>("/api/markets", {}, false);
  if (fromApi.ok && fromApi.data?.items?.length) {
    return fromApi.data;
  }

  const fx = await fetchFxFallback();
  return {
    updatedAt: new Date().toISOString(),
    items: fx,
  };
}
