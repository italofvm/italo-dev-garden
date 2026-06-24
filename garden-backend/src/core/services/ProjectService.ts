import { ProjectSchema, type Project } from "../entities/Project";
import type { IProjectRepository } from "../../ports/repositories/IProjectRepository";

export class ProjectService {
  constructor(private readonly projectRepository: IProjectRepository) {}

  async getAll(): Promise<Project[]> {
    return this.projectRepository.findAll();
  }

  async getById(id: string): Promise<Project> {
    const project = await this.projectRepository.findById(id);
    if (!project) throw new Error("projeto não encontrado");
    return project;
  }

  async create(data: unknown): Promise<Project> {
    const validated = ProjectSchema.parse(data);
    return this.projectRepository.create(validated);
  }

  async update(id: string, data: unknown): Promise<Project> {
    const validated = ProjectSchema.partial().parse(data);
    return this.projectRepository.update(id, validated);
  }

  async delete(id: string): Promise<void> {
    await this.projectRepository.delete(id);
  }
}
