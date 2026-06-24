import { Timestamp } from "firebase-admin/firestore";
import { getDb } from "../../../../config/firebase";
import type { Lead } from "../../../../core/entities/Lead";
import type { ILeadRepository } from "../../../../ports/repositories/ILeadRepository";

function mapLead(docId: string, data: Record<string, unknown>): Lead {
  const rawCreatedAt = data.createdAt as Timestamp | Date | undefined;

  return {
    id: docId,
    nome: data.nome as string,
    email: data.email as string,
    mensagem: data.mensagem as string,
    createdAt:
      rawCreatedAt instanceof Timestamp
        ? rawCreatedAt.toDate()
        : (rawCreatedAt as Date | undefined),
  };
}

export class FirestoreLeadRepository implements ILeadRepository {
  private readonly collection = getDb().collection("leads");

  async findAll(): Promise<Lead[]> {
    const snapshot = await this.collection.orderBy("createdAt", "desc").get();
    return snapshot.docs.map((doc) => mapLead(doc.id, doc.data()));
  }

  async create(lead: Lead): Promise<Lead> {
    const payload = {
      ...lead,
      createdAt: lead.createdAt ?? new Date(),
    };

    const ref = await this.collection.add(payload);
    const created = await ref.get();
    return mapLead(created.id, created.data() as Record<string, unknown>);
  }

  async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }
}
