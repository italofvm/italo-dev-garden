import type { Request, Response } from "express";
import { ConfigService } from "../../../../core/services/ConfigService";

export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  get = async (_req: Request, res: Response): Promise<void> => {
    const config = await this.configService.get();
    res.status(200).json(config);
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const updated = await this.configService.update(req.body);
      res.status(200).json(updated);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao atualizar config";
      res.status(400).json({ error: message });
    }
  };
}