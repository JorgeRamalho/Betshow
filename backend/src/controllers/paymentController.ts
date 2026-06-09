import { Response } from "express";
import Stripe from "stripe";
import { query } from "../db/index.js";
import { AuthRequest } from "../middleware/authMiddleware.js";
import { STRIPE_SECRET_KEY } from "../config.js";
import { sendEmail } from "../services/emailService.js";

const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2023-08-16" }) : null;

export async function createDeposit(req: any, res: Response) {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user?.userId;
    const { amount, method } = req.body;

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
        metadata: { userId },
        description: "Depósito BetShow",
      });

      return res.json({ status: "requires_payment_method", clientSecret: paymentIntent.client_secret });
    }

    const depositReference = `DEP-${Date.now()}`;
    await query("UPDATE users SET balance = balance + $1 WHERE id = $2", [amount, userId]);
    const userRows = await query("SELECT email FROM users WHERE id = $1", [userId]);
    const email = userRows.length > 0 ? userRows[0].email : null;

    if (email) {
      await sendEmail(
        email,
        "Depósito confirmado",
        `Seu depósito de R$ ${amount.toFixed(2)} foi registrado com sucesso. Referência: ${depositReference}`
      );
    }

    res.json({ status: "completed", amount, reference: depositReference, method: method || "pix" });
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

    const rows = await query("SELECT balance, bonus_balance, cashback_earned FROM users WHERE id = $1", [userId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Get balance error:", error);
    res.status(500).json({ error: "Falha ao buscar saldo." });
  }
}

export async function handleStripeWebhook(req: any, res: Response) {
  console.log("Stripe webhook endpoint called.");
  res.json({ received: true });
}
