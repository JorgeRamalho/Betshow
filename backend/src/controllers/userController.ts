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
      "SELECT id, matricula, full_name, email, role, balance, bonus_balance, cashback_earned, kyc_verified, created_at FROM users WHERE id = $1",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const user = rows[0];
    const stats = {
      totalBets: 0,
      winRate: 0,
      profitLoss: 0,
      activeBets: 0,
      favoriteSport: "Futebol",
      copa2026Bets: 0,
    };

    res.json({ user, stats });
  } catch (error) {
    console.error("User dashboard error:", error);
    res.status(500).json({ error: "Falha ao carregar dados do usuário." });
  }
}

export async function listUsers(req: any, res: Response) {
  try {
    const rows = await query(
      "SELECT id, matricula, full_name, email, phone, role, balance, bonus_balance, cashback_earned, kyc_verified FROM users ORDER BY created_at DESC"
    );
    res.json({ users: rows });
  } catch (error) {
    console.error("List users error:", error);
    res.status(500).json({ error: "Falha ao listar usuários." });
  }
}
