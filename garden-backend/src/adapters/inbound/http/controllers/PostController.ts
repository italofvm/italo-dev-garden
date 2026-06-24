import type { Request, Response } from "express";
import { PostService } from "../../../../core/services/PostService";

export class PostController {
  constructor(private readonly postService: PostService) {}

  getAll = async (_req: Request, res: Response): Promise<void> => {
    const posts = await this.postService.getAll();
    res.status(200).json(posts);
  };

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const created = await this.postService.create(req.body);
      res.status(201).json(created);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao criar post";
      res.status(400).json({ error: message });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const updated = await this.postService.update(req.params.id, req.body);
      res.status(200).json(updated);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao atualizar post";
      const status = message.toLowerCase().includes("não encontrado") ? 404 : 400;
      res.status(status).json({ error: message });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.postService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao remover post";
      res.status(400).json({ error: message });
    }
  };
}