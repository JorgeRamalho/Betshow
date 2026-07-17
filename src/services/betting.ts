import { apiFetch } from "./api";
import type { Bet } from "../types/bet";
import type { UserBetStats } from "../types/bet";
import type { Transaction, FinancialSummary } from "../types/payment";
import type { UserProfile } from "../types/user";

export type PlaceBetPayload = {
  eventName: string;
  market: string;
  selection: string;
  odd: number;
  stake: number;
};

export async function placeBet(payload: PlaceBetPayload) {
  return apiFetch<{ bet: Bet; balance: number; bonusBalance: number }>("/api/bets", {
    method: "POST",
    body: payload,
  });
}

export async function fetchMyBets() {
  return apiFetch<{ bets: Bet[] }>("/api/bets/me");
}

export async function fetchAllBets() {
  return apiFetch<{ bets: Bet[] }>("/api/bets");
}

export async function settleBet(id: string, status: Bet["status"]) {
  return apiFetch<{ bet: Bet }>(`/api/bets/${id}/settle`, {
    method: "PATCH",
    body: { status },
  });
}

export async function fetchMyTransactions() {
  return apiFetch<{ transactions: Transaction[] }>("/api/payments/transactions");
}

export async function fetchAllTransactions() {
  return apiFetch<{ transactions: Transaction[] }>("/api/payments/transactions/all");
}

export async function fetchFinancialSummary() {
  return apiFetch<{ summary: FinancialSummary }>("/api/payments/summary");
}

export async function fetchUserDashboard() {
  return apiFetch<{ user: Partial<UserProfile>; stats: UserBetStats }>("/api/users/me");
}

export async function fetchUsers() {
  return apiFetch<{
    users: Array<{
      id: string;
      name: string;
      email: string;
      balance: number;
      bets: number;
      status: string;
      role: string;
    }>;
  }>("/api/users");
}

export async function fetchBalance() {
  return apiFetch<{ balance: number; bonusBalance: number; cashbackEarned: number }>(
    "/api/payments/balance"
  );
}
