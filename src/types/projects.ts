export type ProjectStatus = "concluido" | "andamento" | "experimento";

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  technologies: string[];
  repositoryUrl: string;
  deployUrl?: string;
}

export const statusLabels: Record<ProjectStatus, string> = {
  concluido: "Concluído",
  andamento: "Em Andamento",
  experimento: "Experimento",
};

export const statusColors: Record<ProjectStatus, string> = {
  concluido: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  andamento: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  experimento: "text-accent bg-accent/10 border-accent/20",
};
