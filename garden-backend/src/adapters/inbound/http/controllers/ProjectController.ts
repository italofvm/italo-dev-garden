import type { Request, Response } from "express";
import { ProjectService } from "../../../../core/services/ProjectService";

export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  getAll = async (_req: Request, res: Response): Promise<void> => {
    const projects = await this.projectService.getAll();
    res.status(200).json(projects);
  };

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const created = await this.projectService.create(req.body);
      res.status(201).json(created);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao criar projeto";
      res.status(400).json({ error: message });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const updated = await this.projectService.update(req.params.id, req.body);
      res.status(200).json(updated);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao atualizar projeto";
      const status = message.toLowerCase().includes("não encontrado") ? 404 : 400;
      res.status(status).json({ error: message });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.projectService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao remover projeto";
      res.status(400).json({ error: message });
    }
  };
}