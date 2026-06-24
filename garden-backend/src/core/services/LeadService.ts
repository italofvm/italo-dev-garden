import { LeadSchema, type Lead } from "../entities/Lead";
import type { ILeadRepository } from "../../ports/repositories/ILeadRepository";

export class LeadService {
  constructor(private readonly leadRepository: ILeadRepository) {}

  async getAll(): Promise<Lead[]> {
    return this.leadRepository.findAll();
  }

  async create(data: unknown): Promise<Lead> {
    const validated = LeadSchema.parse(data);
    return this.leadRepository.create(validated);
  }

  async delete(id: string): Promise<void> {
    return this.leadRepository.delete(id);
  }
}
