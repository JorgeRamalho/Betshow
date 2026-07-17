import { Response } from "express";
import { query, withTransaction } from "../db/index.js";
import { AuthRequest } from "../middleware/authMiddleware.js";

const SETTLE_STATUSES = new Set(["won", "lost", "cashout", "cancelled"]);

function mapBet(row: any) {
  return {
    id: String(row.id),
    userId: String(row.user_id),
    userName: row.full_name ?? "",
    event: row.event_name,
    league: row.league ?? "",
    market: row.market,
    selection: row.selection,
    odd: Number(row.odd),
    stake: Number(row.stake),
    potentialReturn: Number(row.potential_return),
    status: row.status,
    placedAt: row.placed_at,
    settledAt: row.settled_at ?? undefined,
  };
}

export async function placeBet(req: any, res: Response) {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user?.userId;
    const { eventName, market, selection, odd, stake } = req.body;

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado." });
    }

    if (!eventName || !market || !selection || !odd || !stake) {
      return res.status(400).json({ error: "Campos da aposta incompletos." });
    }

    const oddNum = Number(odd);
    const stakeNum = Number(stake);

    if (!(oddNum > 1) || !(stakeNum > 0)) {
      return res.status(400).json({ error: "Odd ou valor de aposta inválido." });
    }

    const potentialReturn = Number((oddNum * stakeNum).toFixed(2));

    const bet = await withTransaction(async (client) => {
      const userResult = await client.query(
        "SELECT id, balance, full_name FROM users WHERE id = $1 FOR UPDATE",
        [userId]
      );

      if (userResult.rows.length === 0) {
        throw Object.assign(new Error("Usuário não encontrado."), { status: 404 });
      }

      const balance = Number(userResult.rows[0].balance);
      if (balance < stakeNum) {
        throw Object.assign(new Error("Saldo insuficiente para esta aposta."), { status: 400 });
      }

      await client.query("UPDATE users SET balance = balance - $1 WHERE id = $2", [stakeNum, userId]);

      const inserted = await client.query(
        `INSERT INTO bets
          (user_id, event_name, market, selection, odd, stake, potential_return, status, placed_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending', NOW())
         RETURNING *`,
        [userId, eventName, market, selection, oddNum, stakeNum, potentialReturn]
      );

      await client.query(
        `INSERT INTO transactions (user_id, type, amount, status, method, description, created_at)
         VALUES ($1, 'bet', $2, 'completed', 'balance', $3, NOW())`,
        [userId, stakeNum, `Aposta #${inserted.rows[0].id} · ${eventName}`]
      );

      return {
        ...inserted.rows[0],
        full_name: userResult.rows[0].full_name,
      };
    });

    const balanceRows = await query("SELECT balance, bonus_balance FROM users WHERE id = $1", [userId]);

    res.status(201).json({
      bet: mapBet(bet),
      balance: Number(balanceRows[0].balance),
      bonusBalance: Number(balanceRows[0].bonus_balance),
    });
  } catch (error: any) {
    console.error("Place bet error:", error);
    const status = error?.status ?? 500;
    res.status(status).json({ error: error?.message ?? "Falha ao registrar aposta." });
  }
}

export async function listMyBets(req: any, res: Response) {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado." });
    }

    const rows = await query(
      `SELECT b.*, u.full_name
       FROM bets b
       JOIN users u ON u.id = b.user_id
       WHERE b.user_id = $1
       ORDER BY b.placed_at DESC
       LIMIT 100`,
      [userId]
    );

    res.json({ bets: rows.map(mapBet) });
  } catch (error) {
    console.error("List my bets error:", error);
    res.status(500).json({ error: "Falha ao listar apostas." });
  }
}

export async function listAllBets(req: any, res: Response) {
  try {
    const rows = await query(
      `SELECT b.*, u.full_name
       FROM bets b
       JOIN users u ON u.id = b.user_id
       ORDER BY b.placed_at DESC
       LIMIT 200`
    );

    res.json({ bets: rows.map(mapBet) });
  } catch (error) {
    console.error("List all bets error:", error);
    res.status(500).json({ error: "Falha ao listar apostas." });
  }
}

export async function settleBet(req: any, res: Response) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!SETTLE_STATUSES.has(status)) {
      return res.status(400).json({ error: "Status de liquidação inválido." });
    }

    const settled = await withTransaction(async (client) => {
      const betResult = await client.query(
        "SELECT * FROM bets WHERE id = $1 FOR UPDATE",
        [id]
      );

      if (betResult.rows.length === 0) {
        throw Object.assign(new Error("Aposta não encontrada."), { status: 404 });
      }

      const bet = betResult.rows[0];
      if (bet.status !== "pending") {
        throw Object.assign(new Error("Aposta já foi liquidada."), { status: 400 });
      }

      await client.query("UPDATE bets SET status = $1 WHERE id = $2", [status, id]);

      if (status === "won" || status === "cashout") {
        const payout = Number(bet.potential_return);
        await client.query("UPDATE users SET balance = balance + $1 WHERE id = $2", [
          payout,
          bet.user_id,
        ]);
        await client.query(
          `INSERT INTO transactions (user_id, type, amount, status, method, description, created_at)
           VALUES ($1, 'win', $2, 'completed', 'balance', $3, NOW())`,
          [bet.user_id, payout, `Prêmio aposta #${bet.id} · ${bet.event_name}`]
        );
      }

      if (status === "cancelled") {
        const stake = Number(bet.stake);
        await client.query("UPDATE users SET balance = balance + $1 WHERE id = $2", [
          stake,
          bet.user_id,
        ]);
        await client.query(
          `INSERT INTO transactions (user_id, type, amount, status, method, description, created_at)
           VALUES ($1, 'deposit', $2, 'completed', 'balance', $3, NOW())`,
          [bet.user_id, stake, `Estorno aposta #${bet.id} cancelada`]
        );
      }

      const updated = await client.query(
        `SELECT b.*, u.full_name
         FROM bets b
         JOIN users u ON u.id = b.user_id
         WHERE b.id = $1`,
        [id]
      );

      return updated.rows[0];
    });

    res.json({ bet: mapBet(settled) });
  } catch (error: any) {
    console.error("Settle bet error:", error);
    const status = error?.status ?? 500;
    res.status(status).json({ error: error?.message ?? "Falha ao liquidar aposta." });
  }
}
