import type { Post } from "../../core/entities/Post";

export interface IPostRepository {
  findAll(): Promise<Post[]>;
  findById(id: string): Promise<Post | null>;
  create(post: Post): Promise<Post>;
  update(id: string, post: Partial<Post>): Promise<Post>;
  delete(id: string): Promise<void>;
}
