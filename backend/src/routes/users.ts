import { Router } from "express";
import { getUserDashboard, listUsers } from "../controllers/userController.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/me", requireAuth, getUserDashboard);
router.get("/", requireAuth, requireAdmin, listUsers);

export default router;
