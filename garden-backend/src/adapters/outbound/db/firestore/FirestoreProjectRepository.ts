import { Timestamp } from "firebase-admin/firestore";
import { getDb } from "../../../../config/firebase";
import type { Project } from "../../../../core/entities/Project";
import type { IProjectRepository } from "../../../../ports/repositories/IProjectRepository";

function mapProject(docId: string, data: Record<string, unknown>): Project {
  const rawCreatedAt = data.createdAt as Timestamp | Date | undefined;

  return {
    id: docId,
    title: data.title as string,
    description: data.description as string,
    status: data.status as Project["status"],
    technologies: (data.technologies as string[]) ?? [],
    repositoryUrl: data.repositoryUrl as string,
    deployUrl: data.deployUrl as string | undefined,
    imageUrl: data.imageUrl as string | undefined,
    createdAt:
      rawCreatedAt instanceof Timestamp
        ? rawCreatedAt.toDate()
        : (rawCreatedAt as Date | undefined),
  };
}

export class FirestoreProjectRepository implements IProjectRepository {
  private readonly collection = getDb().collection("projects");

  async findAll(): Promise<Project[]> {
    const snapshot = await this.collection.orderBy("createdAt", "desc").get();
    return snapshot.docs.map((doc) => mapProject(doc.id, doc.data()));
  }

  async findById(id: string): Promise<Project | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) return null;
    return mapProject(doc.id, doc.data() as Record<string, unknown>);
  }

  async create(project: Project): Promise<Project> {
    const payload = {
      ...project,
      createdAt: project.createdAt ?? new Date(),
    };

    const ref = await this.collection.add(payload);
    const created = await ref.get();
    return mapProject(created.id, created.data() as Record<string, unknown>);
  }

  async update(id: string, project: Partial<Project>): Promise<Project> {
    const ref = this.collection.doc(id);
    const existing = await ref.get();

    if (!existing.exists) {
      throw new Error("Projeto não encontrado");
    }

    await ref.update(project);
    const updated = await ref.get();
    return mapProject(updated.id, updated.data() as Record<string, unknown>);
  }

  async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }
}
