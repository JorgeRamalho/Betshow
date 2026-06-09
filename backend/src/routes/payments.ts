import { Router } from "express";
import { createDeposit, getBalance, handleStripeWebhook } from "../controllers/paymentController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/deposit", requireAuth, createDeposit);
router.get("/balance", requireAuth, getBalance);
router.post("/webhook", handleStripeWebhook);

export default router;
