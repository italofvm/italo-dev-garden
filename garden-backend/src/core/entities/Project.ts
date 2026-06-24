import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, "Titulo deve ter no mínimo 3 caracteres"),
  description: z.string().min(10, "Descrição deve ter no mínimo 10 caracteres"),
  status: z.enum(["concluido", "andamento", "experimento"]),
  technologies: z
    .array(z.string())
    .min(1, "Deve ter pelo menos uma tecnologia"),
  repositoryUrl: z.string().url("Deve ser uma URL válida"),
  deployUrl: z.string().url("Deve ser uma URL válida").optional(),
  imageUrl: z.string().url().optional(),
  createdAt: z.date().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;
