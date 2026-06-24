import type { Lead } from "../../core/entities/Lead";

export interface ILeadRepository {
  findAll(): Promise<Lead[]>;
  create(lead: Lead): Promise<Lead>;
  delete(id: string): Promise<void>;
}
