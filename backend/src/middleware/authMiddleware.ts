import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/jwtService.js";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token de autenticação não encontrado." });
  }

  try {
    const token = authHeader.replace("Bearer ", "");
    const payload = verifyToken(token);

    (req as AuthRequest).user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const authReq = req as AuthRequest;
  if (!authReq.user || authReq.user.role !== "admin") {
    return res.status(403).json({ error: "Acesso negado. Requer administrador." });
  }

  next();
}
