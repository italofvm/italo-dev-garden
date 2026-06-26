import type { NextFunction, Request, Response } from "express";
import type { DecodedIdToken } from "firebase-admin/auth";
import { getAuth } from "firebase-admin/auth";
import { getDb } from "../../../../config/firebase";

export interface AuthenticatedRequest extends Request {
  user?: DecodedIdToken;
}

export async function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "Token não informado" });
      return;
    }

    const token = authHeader.slice("Bearer ".length);

    // Garante app Firebase inicializado antes de validar token
    getDb();

    const decoded = await getAuth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Token inválido" });
  }
}