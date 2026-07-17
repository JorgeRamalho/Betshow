const STORAGE_KEY = "betshow_auth";

/**
 * - localhost / 127.0.0.1 → API direta na porta 4000
 * - túnel Cloudflare → mesma origem (Vite faz proxy /api → 4000)
 * - produção (Netlify/Pages) → VITE_API_URL
 */
function resolveApiUrl(): string {
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    const isLocal = host === "localhost" || host === "127.0.0.1" || host === "[::1]";
    if (isLocal) return "http://localhost:4000";
    if (host.endsWith("trycloudflare.com") || host.endsWith("ngrok-free.app") || host.endsWith("ngrok.io")) {
      return "";
    }
  }
  return import.meta.env.VITE_API_URL || "http://localhost:4000";
}

const API_URL = resolveApiUrl();

export type ApiResult<T> = {
  ok: boolean;
  status: number;
  data?: T;
  error?: string;
};

export function loadStoredAuth() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function storeAuth(payload: { token: string; user: any } | null) {
  if (payload) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

type ApiFetchOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {},
  includeAuth = true
): Promise<ApiResult<T>> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (includeAuth) {
    const auth = loadStoredAuth();
    if (auth?.token) {
      headers.Authorization = `Bearer ${auth.token}`;
    }
  }

  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    const contentType = response.headers.get("content-type");
    const body = contentType?.includes("application/json")
      ? await response.json().catch(() => null)
      : null;

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        error: body?.error ?? response.statusText,
      };
    }

    return {
      ok: true,
      status: response.status,
      data: body as T,
    };
  } catch {
    return {
      ok: false,
      status: 0,
      error: `Não foi possível conectar à API (${API_URL}). Confirme se o backend está em http://localhost:4000.`,
    };
  }
}
