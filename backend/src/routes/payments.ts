import { Router } from "express";
import {
  createDeposit,
  getBalance,
  handleStripeWebhook,
  listMyTransactions,
  listAllTransactions,
  getFinancialSummary,
} from "../controllers/paymentController.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/deposit", requireAuth, createDeposit);
router.get("/balance", requireAuth, getBalance);
router.get("/transactions", requireAuth, listMyTransactions);
router.get("/transactions/all", requireAuth, requireAdmin, listAllTransactions);
router.get("/summary", requireAuth, requireAdmin, getFinancialSummary);
router.post("/webhook", handleStripeWebhook);

export default router;
