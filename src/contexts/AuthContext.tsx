import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { UserProfile } from "../types/user";

const STORAGE_KEY = "betshow_auth";

type AuthState = {
  user: UserProfile | null;
  isAuthenticated: boolean;
};

type AuthContextValue = AuthState & {
  login: (email: string, password: string) => Promise<boolean>;
  loginAsAdmin: (email: string, password: string) => Promise<boolean>;
  register: (user: UserProfile) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const DEMO_ADMIN: UserProfile = {
  id: "admin-001",
  matricula: "BS-ADMIN-001",
  fullName: "Administrador BetShow",
  cpf: "000.000.000-00",
  birthDate: "1990-01-01",
  email: "admin@betshow.com",
  phone: "(11) 99999-0000",
  address: { street: "Av. Paulista", number: "1000", city: "São Paulo", state: "SP", zip: "01310-100" },
  paymentMethod: "pix",
  role: "admin",
  balance: 0,
  bonusBalance: 0,
  cashbackEarned: 0,
  createdAt: new Date().toISOString(),
  kycVerified: true,
};

function loadStoredUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UserProfile) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(loadStoredUser);

  const persist = useCallback((u: UserProfile | null) => {
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
    setUser(u);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const stored = loadStoredUser();
    if (stored && stored.email === email && password.length >= 6) {
      persist(stored);
      return true;
    }
    return false;
  }, [persist]);

  const loginAsAdmin = useCallback(async (email: string, password: string) => {
    if (email === "admin@betshow.com" && password === "Admin@2026") {
      persist(DEMO_ADMIN);
      return true;
    }
    return false;
  }, [persist]);

  const register = useCallback((newUser: UserProfile) => {
    persist(newUser);
  }, [persist]);

  const logout = useCallback(() => persist(null), [persist]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        loginAsAdmin,
        register,
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
