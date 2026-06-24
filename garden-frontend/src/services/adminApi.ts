import type {
  HomeFormState,
  ProjectFormState,
  BlogFormState,
} from "../types/admin";

const API_URL = import.meta.env.VITE_API_URL;

function getAuthToken() {
  return localStorage.getItem("admin_token");
}

async function parseError(response: Response) {
  try {
    const data = (await response.json()) as { message?: string; error?: string };
    return data.error ?? data.message ?? "Erro inesperado na API.";
  } catch {
    return "Erro inesperado na API.";
  }
}

export async function createProject(project: ProjectFormState) {
  const technologies = project.technologies
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const response = await fetch(`${API_URL}/api/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify({
      title: project.title,
      description: project.description,
      repositoryUrl: project.repositoryUrl,
      deployUrl: project.deployUrl || undefined,
      status: project.status,
      technologies,
    }),
  });

  if (!response.ok) throw new Error(await parseError(response));
}

export async function createPost(post: BlogFormState) {
  const response = await fetch(`${API_URL}/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify({
      title: post.title,
      content: post.content,
      status: post.status,
      readTime: post.readTime,
    }),
  });

  if (!response.ok) throw new Error(await parseError(response));
}

export async function updateHomeConfig(config: HomeFormState) {
  const response = await fetch(`${API_URL}/api/config`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify(config),
  });

  if (!response.ok) throw new Error(await parseError(response));
}

export async function createLead(input: {
  nome: string;
  email: string;
  mensagem: string;
}) {
  const response = await fetch(`${API_URL}/api/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) throw new Error(await parseError(response));
}
