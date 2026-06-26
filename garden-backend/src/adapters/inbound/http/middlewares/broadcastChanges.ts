import type { NextFunction, Response } from "express";
import { broadcastUpdate } from "../../outbound/socket/socketManager";
import type { AuthenticatedRequest } from "./authMiddleware";

export function broadcastChanges(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction,
): void {
  // Interceptar resposta para emitir evento após sucesso
  const originalJson = _res.json;

  _res.json = function (body: unknown) {
    // Só emitir se foi sucesso (2xx)
    if (_res.statusCode >= 200 && _res.statusCode < 300) {
      const method = req.method;
      const path = req.path;

      // Determinar qual recurso foi modificado
      if (path.includes("/projects")) {
        broadcastUpdate("projects:updated");
      } else if (path.includes("/posts")) {
        broadcastUpdate("posts:updated");
      } else if (path.includes("/config")) {
        broadcastUpdate("config:updated");
      } else if (path.includes("/leads")) {
        broadcastUpdate("leads:updated");
      }
    }

    return originalJson.call(this, body);
  };

  next();
}
