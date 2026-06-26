import { Router } from "express";
import { ProjectController } from "./controllers/ProjectController";
import { PostController } from "./controllers/PostController";
import { LeadController } from "./controllers/LeadController";
import { ConfigController } from "./controllers/ConfigController";
import { authMiddleware } from "./middlewares/authMiddleware";
import { auditLog } from "./middlewares/auditLog";
import { broadcastChanges } from "./middlewares/broadcastChanges";
import { leadRateLimiter, adminWriteLimiter } from "./middlewares/rateLimiter";
import { ProjectService } from "../../../core/services/ProjectService";
import { PostService } from "../../../core/services/PostService";
import { LeadService } from "../../../core/services/LeadService";
import { ConfigService } from "../../../core/services/ConfigService";
import { FirestoreProjectRepository } from "../../outbound/db/firestore/FirestoreProjectRepository";
import { FirestorePostRepository } from "../../outbound/db/firestore/FirestorePostRepository";
import { FirestoreLeadRepository } from "../../outbound/db/firestore/FirestoreLeadRepository";
import { FirestoreConfigRepository } from "../../outbound/db/firestore/FirestoreConfigRepository";

export function buildRoutes(): Router {
  const router = Router();

  const projectController = new ProjectController(
    new ProjectService(new FirestoreProjectRepository()),
  );
  const postController = new PostController(
    new PostService(new FirestorePostRepository()),
  );
  const leadController = new LeadController(
    new LeadService(new FirestoreLeadRepository()),
  );
  const configController = new ConfigController(
    new ConfigService(new FirestoreConfigRepository()),
  );

  // Middleware aplicado a todas as rotas de escrita autenticadas:
  // 1. authMiddleware — valida token Firebase
  // 2. auditLog — registra a operação (quem, quando, o quê)
  // 3. broadcastChanges — emite evento WebSocket para clientes
  // 4. adminWriteLimiter — limita 30 req/min para evitar abuso
  const adminGuard = [authMiddleware, auditLog, broadcastChanges, adminWriteLimiter];

  router.get("/projects", projectController.getAll);
  router.post("/projects", ...adminGuard, projectController.create);
  router.put("/projects/:id", ...adminGuard, projectController.update);
  router.delete("/projects/:id", ...adminGuard, projectController.delete);

  router.get("/posts", postController.getAll);
  router.post("/posts", ...adminGuard, postController.create);
  router.put("/posts/:id", ...adminGuard, postController.update);
  router.delete("/posts/:id", ...adminGuard, postController.delete);

  router.post("/leads", leadRateLimiter, broadcastChanges, leadController.create);
  router.get("/leads", authMiddleware, leadController.getAll);
  router.delete("/leads/:id", ...adminGuard, leadController.delete);

  router.get("/config", configController.get);
  router.put("/config", ...adminGuard, configController.update);

  return router;
}