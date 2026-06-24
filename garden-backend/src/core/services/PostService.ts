import { PostSchema, type Post } from "../entities/Post";
import type { IPostRepository } from "../../ports/repositories/IPostRepository";

export class PostService {
  constructor(private readonly postRepository: IPostRepository) {}

  async getAll(): Promise<Post[]> {
    return this.postRepository.findAll();
  }

  async getById(id: string): Promise<Post> {
    const post = await this.postRepository.findById(id);
    if (!post) throw new Error("Post não encontrado");
    return post;
  }

  async create(data: unknown): Promise<Post> {
    const validated = PostSchema.parse(data);
    return this.postRepository.create(validated);
  }

  async update(id: string, data: unknown): Promise<Post> {
    const validated = PostSchema.partial().parse(data);
    return this.postRepository.update(id, validated);
  }

  async delete(id: string): Promise<void> {
    return this.postRepository.delete(id);
  }
}
