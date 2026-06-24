import { z } from "zod";

export const PostSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, "Título deve ter no mínimo 3 caracteres"),
  content: z.string().min(10, "Conteúdo deve ter no mínimo 10 caracteres"),
  status: z.enum(["semente", "brotar", "perene"]),
  readTime: z.string(),
  imageUrl: z.string().url().optional(),
  createdAt: z.date().optional(),
});

export type Post = z.infer<typeof PostSchema>;
