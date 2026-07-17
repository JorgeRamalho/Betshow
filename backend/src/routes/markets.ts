import { Router } from "express";
import { getMarkets } from "../controllers/marketsController.js";

const router = Router();

router.get("/", getMarkets);

export default router;
