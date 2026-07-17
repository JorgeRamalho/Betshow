import { Response } from "express";
import Stripe from "stripe";
import { query, withTransaction } from "../db/index.js";
import { AuthRequest } from "../middleware/authMiddleware.js";
import { STRIPE_SECRET_KEY } from "../config.js";
import { sendEmail } from "../services/emailService.js";

const stripe = STRIPE_SECRET_KEY
  ? new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2022-11-15" })
  : null;

function mapTransaction(row: any) {
  return {
    id: String(row.id),
    userId: String(row.user_id),
    userName: row.full_name ?? row.user_name ?? "",
    type: row.type,
    amount: Number(row.amount),
    status: row.status,
    method: row.method,
    description: row.description ?? "",
    createdAt: row.created_at,
  };
}

export async function createDeposit(req: any, res: Response) {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user?.userId;
    const { amount, method } = req.body;
    const depositMethod = method || "pix";

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado." });
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Valor de depósito inválido." });
    }

    if (stripe) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: "brl",
        payment_method_types: ["card"],
        metadata: { userId: String(userId), method: depositMethod },
        description: "Depósito BetShow",
      });

      return res.json({ status: "requires_payment_method", clientSecret: paymentIntent.client_secret });
    }

    const depositReference = `DEP-${Date.now()}`;

    await withTransaction(async (client) => {
      await client.query("UPDATE users SET balance = balance + $1 WHERE id = $2", [amount, userId]);
      await client.query(
        `INSERT INTO transactions (user_id, type, amount, status, method, description, created_at)
         VALUES ($1, 'deposit', $2, 'completed', $3, $4, NOW())`,
        [userId, amount, depositMethod, `Depósito ${depositReference}`]
      );
    });

    const userRows = await query("SELECT email, balance, bonus_balance FROM users WHERE id = $1", [userId]);
    const email = userRows.length > 0 ? userRows[0].email : null;

    if (email) {
      await sendEmail(
        email,
        "Depósito confirmado",
        `Seu depósito de R$ ${Number(amount).toFixed(2)} foi registrado com sucesso. Referência: ${depositReference}`
      );
    }

    res.json({
      status: "completed",
      amount: Number(amount),
      reference: depositReference,
      method: depositMethod,
      balance: userRows[0] ? Number(userRows[0].balance) : undefined,
      bonusBalance: userRows[0] ? Number(userRows[0].bonus_balance) : undefined,
    });
  } catch (error) {
    console.error("Create deposit error:", error);
    res.status(500).json({ error: "Falha ao processar depósito." });
  }
}

export async function getBalance(req: any, res: Response) {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado." });
    }

    const rows = await query(
      "SELECT balance, bonus_balance, cashback_earned FROM users WHERE id = $1",
      [userId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    res.json({
      balance: Number(rows[0].balance),
      bonusBalance: Number(rows[0].bonus_balance),
      cashbackEarned: Number(rows[0].cashback_earned),
    });
  } catch (error) {
    console.error("Get balance error:", error);
    res.status(500).json({ error: "Falha ao buscar saldo." });
  }
}

export async function listMyTransactions(req: any, res: Response) {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado." });
    }

    const rows = await query(
      `SELECT t.*, u.full_name
       FROM transactions t
       JOIN users u ON u.id = t.user_id
       WHERE t.user_id = $1
       ORDER BY t.created_at DESC
       LIMIT 100`,
      [userId]
    );

    res.json({ transactions: rows.map(mapTransaction) });
  } catch (error) {
    console.error("List my transactions error:", error);
    res.status(500).json({ error: "Falha ao listar movimentações." });
  }
}

export async function listAllTransactions(req: any, res: Response) {
  try {
    const rows = await query(
      `SELECT t.*, u.full_name
       FROM transactions t
       JOIN users u ON u.id = t.user_id
       ORDER BY t.created_at DESC
       LIMIT 200`
    );

    res.json({ transactions: rows.map(mapTransaction) });
  } catch (error) {
    console.error("List all transactions error:", error);
    res.status(500).json({ error: "Falha ao listar movimentações." });
  }
}

export async function getFinancialSummary(req: any, res: Response) {
  try {
    const [agg] = await query(`
      SELECT
        COALESCE(SUM(CASE WHEN type = 'deposit' AND status = 'completed' THEN amount ELSE 0 END), 0) AS total_deposits,
        COALESCE(SUM(CASE WHEN type = 'withdrawal' AND status = 'completed' THEN amount ELSE 0 END), 0) AS total_withdrawals,
        COALESCE(SUM(CASE WHEN type = 'bet' AND status = 'completed' THEN amount ELSE 0 END), 0) AS total_bets_volume,
        COALESCE(SUM(CASE WHEN type = 'win' AND status = 'completed' THEN amount ELSE 0 END), 0) AS total_payouts,
        COALESCE(SUM(CASE WHEN type = 'withdrawal' AND status = 'pending' THEN amount ELSE 0 END), 0) AS pending_withdrawals
      FROM transactions
    `);

    const [usersAgg] = await query(`
      SELECT
        COUNT(*) FILTER (WHERE role = 'user') AS active_users,
        COUNT(*) FILTER (WHERE role = 'user' AND created_at::date = CURRENT_DATE) AS new_users_today
      FROM users
    `);

    const totalDeposits = Number(agg.total_deposits);
    const totalWithdrawals = Number(agg.total_withdrawals);
    const totalBetsVolume = Number(agg.total_bets_volume);
    const totalPayouts = Number(agg.total_payouts);

    res.json({
      summary: {
        totalDeposits,
        totalWithdrawals,
        totalBetsVolume,
        totalPayouts,
        platformRevenue: Math.max(0, totalBetsVolume - totalPayouts),
        pendingWithdrawals: Number(agg.pending_withdrawals),
        activeUsers: Number(usersAgg.active_users),
        newUsersToday: Number(usersAgg.new_users_today),
      },
    });
  } catch (error) {
    console.error("Financial summary error:", error);
    res.status(500).json({ error: "Falha ao carregar resumo financeiro." });
  }
}

export async function handleStripeWebhook(req: any, res: Response) {
  console.log("Stripe webhook endpoint called.");
  res.json({ received: true });
}
