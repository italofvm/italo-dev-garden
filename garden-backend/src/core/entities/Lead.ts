import { z } from "zod";

export const LeadSchema = z.object({
  id: z.string().optional(),
  nome: z.string().min(2, "Nome muito curto"),
  email: z.string().email("E-mail inválido"),
  mensagem: z.string().min(10, "Mensagem muito curta"),
  createdAt: z.date().optional(),
});

export type Lead = z.infer<typeof LeadSchema>;
