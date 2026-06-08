export type TransactionType = "deposit" | "withdrawal" | "bet" | "win" | "bonus" | "cashback";

export type TransactionStatus = "pending" | "completed" | "failed" | "processing";

export type Transaction = {
  id: string;
  userId: string;
  userName: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  method: string;
  description: string;
  createdAt: string;
};

export type FinancialSummary = {
  totalDeposits: number;
  totalWithdrawals: number;
  totalBetsVolume: number;
  totalPayouts: number;
  platformRevenue: number;
  pendingWithdrawals: number;
  activeUsers: number;
  newUsersToday: number;
};
