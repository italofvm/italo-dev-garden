export type ProjectStatus = "concluido" | "andamento" | "experimento";
export type PostStatus = "semente" | "brotar" | "perene";
export type AdminTab = "projects" | "blog" | "home";
export type MessageType = "success" | "error" | "";

export interface AdminMessage {
  type: MessageType;
  text: string;
}

export interface ProjectFormState {
  title: string;
  description: string;
  repositoryUrl: string;
  deployUrl: string;
  status: ProjectStatus;
  technologies: string;
  image: File | null;
}

export interface BlogFormState {
  title: string;
  content: string;
  status: PostStatus;
  readTime: string;
  image: File | null;
}

export interface HomeFormState {
  bioTitle: string;
  bioDescription: string;
  availableForFreela: boolean;
}
