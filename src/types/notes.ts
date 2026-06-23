export type NoteStatus = "semente" | "brotar" | "perene";

export interface Note {
  id: string;
  title: string;
  status: NoteStatus;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
}

export const statusLabels: Record<NoteStatus, string> = {
  semente: "🌱 Semente (Rascunhos)",
  brotar: "🌿 Brotar (Em Progresso)",
  perene: "🌳 Perene (Concluído)",
};

export const statusColors: Record<NoteStatus, string> = {
  semente: "text-accent bg-accent/10",
  brotar: "text-amber-500 bg-amber-500/10",
  perene: "text-emerald-500 bg-emerald-500/10",
};
