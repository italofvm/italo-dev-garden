export type ProjectStatus = "concluido" | "andamento" | "experimento";
export type PostStatus = "semente" | "brotar" | "perene";
export type AdminTab = "projects" | "blog" | "home" | "leads";
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
  imageUrl: string;
  status: ProjectStatus;
  technologies: string;
}

export interface BlogFormState {
  title: string;
  content: string;
  status: PostStatus;
  readTime: string;
  imageUrl: string;
}

export interface HomeFormState {
  bioTitle: string;
  bioDescription: string;
  availableForFreela: boolean;
}

export interface AdminProject {
  id: string;
  title: string;
  description: string;
  repositoryUrl: string;
  deployUrl?: string;
  imageUrl?: string;
  status: ProjectStatus;
  technologies: string[];
  createdAt?: string;
}

export interface AdminPost {
  id: string;
  title: string;
  content: string;
  status: PostStatus;
  readTime: string;
  imageUrl?: string;
  createdAt?: string;
}

export interface AdminLead {
  id: string;
  nome: string;
  email: string;
  mensagem: string;
  createdAt?: string;
}
