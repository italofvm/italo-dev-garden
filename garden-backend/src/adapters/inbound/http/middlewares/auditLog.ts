import type { NextFunction, Response } from "express";
import type { AuthenticatedRequest } from "./authMiddleware";

// Audit log: registra cada operação de escrita autenticada com timestamp,
// IP do cliente, método HTTP, rota e UID do usuário autenticado.
// Útil para rastrear quem fez o quê e quando, mesmo sendo single-user.
export function auditLog(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction,
): void {
  const ip =
    (req.headers["x-forwarded-for"] as string | undefined)?.split(",")[0].trim() ??
    req.socket?.remoteAddress ??
    "unknown";

  const uid = req.user?.uid ?? "unauthenticated";
  const timestamp = new Date().toISOString();

  // eslint-disable-next-line no-console
  console.log(
    JSON.stringify({
      type: "AUDIT",
      timestamp,
      method: req.method,
      path: req.path,
      uid,
      ip,
    }),
  );

  next();
}
