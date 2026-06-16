const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";
const STORAGE_KEY = "betshow_auth";

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

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const contentType = response.headers.get("content-type");
  const body = contentType?.includes("application/json") ? await response.json().catch(() => null) : null;

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
}
