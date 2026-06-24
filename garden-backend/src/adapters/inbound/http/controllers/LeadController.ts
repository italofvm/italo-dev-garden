import type { Request, Response } from "express";
import { LeadService } from "../../../../core/services/LeadService";

export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  getAll = async (_req: Request, res: Response): Promise<void> => {
    const leads = await this.leadService.getAll();
    res.status(200).json(leads);
  };

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const created = await this.leadService.create(req.body);
      res.status(201).json(created);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao criar lead";
      res.status(400).json({ error: message });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.leadService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao remover lead";
      res.status(400).json({ error: message });
    }
  };
}