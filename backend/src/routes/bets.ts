import { Router } from "express";
import { placeBet, listMyBets, listAllBets, settleBet } from "../controllers/betController.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", requireAuth, placeBet);
router.get("/me", requireAuth, listMyBets);
router.get("/", requireAuth, requireAdmin, listAllBets);
router.patch("/:id/settle", requireAuth, requireAdmin, settleBet);

export default router;
