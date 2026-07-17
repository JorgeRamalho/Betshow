import { Request, Response } from "express";
import { query } from "../db/index.js";
import { AuthRequest } from "../middleware/authMiddleware.js";

export async function getUserDashboard(req: Request, res: Response) {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado." });
    }

    const rows = await query(
      `SELECT id, matricula, full_name, email, role, balance, bonus_balance, cashback_earned, kyc_verified, created_at
       FROM users WHERE id = $1`,
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const user = rows[0];

    const [betStats] = await query(
      `SELECT
         COUNT(*)::int AS total_bets,
         COUNT(*) FILTER (WHERE status = 'pending')::int AS active_bets,
         COUNT(*) FILTER (WHERE status = 'won')::int AS won_bets,
         COALESCE(SUM(stake), 0) AS total_staked,
         COALESCE(SUM(CASE WHEN status IN ('won', 'cashout') THEN potential_return ELSE 0 END), 0) AS total_returns,
         COUNT(*) FILTER (
           WHERE LOWER(event_name) LIKE '%copa%' OR LOWER(market) LIKE '%copa%'
         )::int AS copa_bets
       FROM bets
       WHERE user_id = $1`,
      [userId]
    );

    const totalBets = Number(betStats.total_bets);
    const wonBets = Number(betStats.won_bets);
    const totalStaked = Number(betStats.total_staked);
    const totalReturns = Number(betStats.total_returns);
    const settled = await query(
      `SELECT COUNT(*)::int AS settled_count
       FROM bets
       WHERE user_id = $1 AND status IN ('won', 'lost', 'cashout')`,
      [userId]
    );
    const settledCount = Number(settled[0]?.settled_count ?? 0);

    const favorite = await query(
      `SELECT market, COUNT(*)::int AS qty
       FROM bets
       WHERE user_id = $1
       GROUP BY market
       ORDER BY qty DESC
       LIMIT 1`,
      [userId]
    );

    const stats = {
      totalBets,
      winRate: settledCount > 0 ? Number(((wonBets / settledCount) * 100).toFixed(1)) : 0,
      totalStaked,
      totalReturns,
      profitLoss: Number((totalReturns - totalStaked).toFixed(2)),
      activeBets: Number(betStats.active_bets),
      favoriteSport: favorite[0]?.market ?? "Futebol",
      copa2026Bets: Number(betStats.copa_bets),
    };

    res.json({
      user: {
        id: String(user.id),
        matricula: user.matricula,
        fullName: user.full_name,
        email: user.email,
        role: user.role,
        balance: Number(user.balance),
        bonusBalance: Number(user.bonus_balance),
        cashbackEarned: Number(user.cashback_earned),
        kycVerified: Boolean(user.kyc_verified),
        createdAt: user.created_at,
      },
      stats,
    });
  } catch (error) {
    console.error("User dashboard error:", error);
    res.status(500).json({ error: "Falha ao carregar dados do usuário." });
  }
}

export async function listUsers(req: any, res: Response) {
  try {
    const rows = await query(
      `SELECT
         u.id,
         u.matricula,
         u.full_name,
         u.email,
         u.phone,
         u.role,
         u.balance,
         u.bonus_balance,
         u.cashback_earned,
         u.kyc_verified,
         u.created_at,
         COUNT(b.id)::int AS bets_count
       FROM users u
       LEFT JOIN bets b ON b.user_id = u.id
       GROUP BY u.id
       ORDER BY u.created_at DESC`
    );

    res.json({
      users: rows.map((u) => ({
        id: String(u.id),
        matricula: u.matricula,
        name: u.full_name,
        fullName: u.full_name,
        email: u.email,
        phone: u.phone,
        role: u.role,
        balance: Number(u.balance),
        bonusBalance: Number(u.bonus_balance),
        cashbackEarned: Number(u.cashback_earned),
        kycVerified: Boolean(u.kyc_verified),
        bets: Number(u.bets_count),
        status: u.kyc_verified ? "verificado" : "pendente",
        createdAt: u.created_at,
      })),
    });
  } catch (error) {
    console.error("List users error:", error);
    res.status(500).json({ error: "Falha ao listar usuários." });
  }
}
