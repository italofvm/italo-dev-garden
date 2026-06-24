import { Timestamp } from "firebase-admin/firestore";
import { getDb } from "../../../../config/firebase";
import type { Post } from "../../../../core/entities/Post";
import type { IPostRepository } from "../../../../ports/repositories/IPostRepository";

function mapPost(docId: string, data: Record<string, unknown>): Post {
  const rawCreatedAt = data.createdAt as Timestamp | Date | undefined;

  return {
    id: docId,
    title: data.title as string,
    content: data.content as string,
    status: data.status as Post["status"],
    readTime: data.readTime as string,
    imageUrl: data.imageUrl as string | undefined,
    createdAt:
      rawCreatedAt instanceof Timestamp
        ? rawCreatedAt.toDate()
        : (rawCreatedAt as Date | undefined),
  };
}

export class FirestorePostRepository implements IPostRepository {
  private get collection() {
    return getDb().collection("posts");
  }

  async findAll(): Promise<Post[]> {
    const snapshot = await this.collection.orderBy("createdAt", "desc").get();
    return snapshot.docs.map((doc) => mapPost(doc.id, doc.data()));
  }

  async findById(id: string): Promise<Post | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) return null;
    return mapPost(doc.id, doc.data() as Record<string, unknown>);
  }

  async create(post: Post): Promise<Post> {
    const payload = {
      ...post,
      createdAt: post.createdAt ?? new Date(),
    };

    const ref = await this.collection.add(payload);
    const created = await ref.get();
    return mapPost(created.id, created.data() as Record<string, unknown>);
  }

  async update(id: string, post: Partial<Post>): Promise<Post> {
    const ref = this.collection.doc(id);
    const existing = await ref.get();

    if (!existing.exists) {
      throw new Error("Post não encontrado");
    }

    await ref.update(post);
    const updated = await ref.get();
    return mapPost(updated.id, updated.data() as Record<string, unknown>);
  }

  async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }
}
