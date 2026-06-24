import { Router } from "express";
import { ProjectController } from "./controllers/ProjectController";
import { PostController } from "./controllers/PostController";
import { LeadController } from "./controllers/LeadController";
import { ConfigController } from "./controllers/ConfigController";
import { authMiddleware } from "./middlewares/authMiddleware";
import { leadRateLimiter } from "./middlewares/rateLimiter";
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

  router.get("/projects", projectController.getAll);
  router.post("/projects", authMiddleware, projectController.create);
  router.put("/projects/:id", authMiddleware, projectController.update);
  router.delete("/projects/:id", authMiddleware, projectController.delete);

  router.get("/posts", postController.getAll);
  router.post("/posts", authMiddleware, postController.create);
  router.put("/posts/:id", authMiddleware, postController.update);
  router.delete("/posts/:id", authMiddleware, postController.delete);

  router.post("/leads", leadRateLimiter, leadController.create);
  router.get("/leads", authMiddleware, leadController.getAll);
  router.delete("/leads/:id", authMiddleware, leadController.delete);

  router.get("/config", configController.get);
  router.put("/config", authMiddleware, configController.update);

  return router;
}