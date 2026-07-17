import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { UserProfile, RegisterFormData } from "../types/user";
import { apiFetch } from "../services/api";

const STORAGE_KEY = "betshow_auth";

type StoredAuth = {
  token: string;
  user: UserProfile;
};

type AuthContextValue = {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginAsAdmin: (email: string, password: string) => Promise<boolean>;
  register: (form: RegisterFormData) => Promise<boolean>;
  updateUser: (patch: Partial<UserProfile>) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function normalizeUser(raw: any): UserProfile {
  return {
    id: String(raw.id),
    matricula: raw.matricula ?? "",
    fullName: raw.fullName ?? raw.full_name ?? "",
    cpf: raw.cpf ?? "",
    birthDate: raw.birthDate ?? raw.birth_date ?? "",
    email: raw.email ?? "",
    phone: raw.phone ?? "",
    address:
      typeof raw.address === "object" && raw.address
        ? raw.address
        : {
            street: typeof raw.address === "string" ? raw.address : "",
            number: "",
            city: "",
            state: "",
            zip: "",
          },
    paymentMethod: raw.paymentMethod ?? raw.payment_method ?? "pix",
    role: raw.role === "admin" ? "admin" : "user",
    balance: Number(raw.balance ?? 0),
    bonusBalance: Number(raw.bonusBalance ?? raw.bonus_balance ?? 0),
    cashbackEarned: Number(raw.cashbackEarned ?? raw.cashback_earned ?? 0),
    createdAt: raw.createdAt ?? raw.created_at ?? new Date().toISOString(),
    kycVerified: Boolean(raw.kycVerified ?? raw.kyc_verified),
  };
}

function loadStoredAuth(): StoredAuth | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredAuth;
    return {
      token: parsed.token,
      user: normalizeUser(parsed.user),
    };
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<StoredAuth | null>(loadStoredAuth);

  const persistAuth = useCallback((value: StoredAuth | null) => {
    if (value) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
    setAuth(value);
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const result = await apiFetch<{ token: string; user: UserProfile }>(
        "/api/auth/login",
        {
          method: "POST",
          body: { email, password },
        },
        false
      );

      if (!result.ok || !result.data) {
        return false;
      }

      persistAuth({
        token: result.data.token,
        user: normalizeUser(result.data.user),
      });
      return true;
    },
    [persistAuth]
  );

  const loginAsAdmin = useCallback(
    async (email: string, password: string) => {
      const result = await apiFetch<{ token: string; user: UserProfile }>(
        "/api/auth/login",
        {
          method: "POST",
          body: { email, password },
        },
        false
      );

      if (result.ok && result.data && result.data.user?.role === "admin") {
        persistAuth({
          token: result.data.token,
          user: normalizeUser(result.data.user),
        });
        return true;
      }

      // Fallback local apenas em desenvolvimento, se o seed ainda não rodou
      if (
        import.meta.env.DEV &&
        email === "admin@betshow.com" &&
        password === "Admin@2026"
      ) {
        persistAuth({
          token: "demo-admin-token",
          user: normalizeUser({
            id: "admin-001",
            matricula: "BS-ADMIN-001",
            fullName: "Administrador BetShow",
            cpf: "000.000.000-00",
            birthDate: "1990-01-01",
            email: "admin@betshow.com",
            phone: "(11) 99999-0000",
            address: {
              street: "Av. Paulista",
              number: "1000",
              city: "São Paulo",
              state: "SP",
              zip: "01310-100",
            },
            paymentMethod: "pix",
            role: "admin",
            balance: 0,
            bonusBalance: 0,
            cashbackEarned: 0,
            createdAt: new Date().toISOString(),
            kycVerified: true,
          }),
        });
        return true;
      }

      return false;
    },
    [persistAuth]
  );

  const register = useCallback(
    async (form: RegisterFormData) => {
      const address = `${form.street}, ${form.number}, ${form.city} - ${form.state}, ${form.zip}`;
      const payload = {
        fullName: form.fullName,
        cpf: form.cpf,
        birthDate: form.birthDate,
        email: form.email,
        phone: form.phone,
        address,
        paymentMethod: form.paymentMethod,
        password: form.password,
      };

      const result = await apiFetch<{ token: string; user: UserProfile }>(
        "/api/auth/register",
        {
          method: "POST",
          body: payload,
        },
        false
      );

      if (!result.ok || !result.data) {
        return false;
      }

      persistAuth({
        token: result.data.token,
        user: normalizeUser(result.data.user),
      });
      return true;
    },
    [persistAuth]
  );

  const updateUser = useCallback(
    (patch: Partial<UserProfile>) => {
      if (!auth) return;
      const updated = { token: auth.token, user: { ...auth.user, ...patch } };
      persistAuth(updated);
    },
    [auth, persistAuth]
  );

  const logout = useCallback(() => persistAuth(null), [persistAuth]);

  return (
    <AuthContext.Provider
      value={{
        user: auth?.user ?? null,
        isAuthenticated: !!auth,
        login,
        loginAsAdmin,
        register,
        updateUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
