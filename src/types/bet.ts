export type BetStatus = "pending" | "won" | "lost" | "cashout" | "cancelled";

export type Bet = {
  id: string;
  userId: string;
  userName: string;
  event: string;
  league: string;
  market: string;
  selection: string;
  odd: number;
  stake: number;
  potentialReturn: number;
  status: BetStatus;
  placedAt: string;
  settledAt?: string;
};

export type UserBetStats = {
  totalBets: number;
  winRate: number;
  totalStaked: number;
  totalReturns: number;
  profitLoss: number;
  activeBets: number;
  favoriteSport: string;
  copa2026Bets: number;
};
