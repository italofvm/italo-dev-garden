import type { AdminPost, AdminProject, HomeFormState } from "../types/admin";

const API_URL = import.meta.env.VITE_API_URL;

async function parseError(response: Response) {
  try {
    const data = (await response.json()) as { message?: string; error?: string };
    return data.error ?? data.message ?? "Erro inesperado na API.";
  } catch {
    return "Erro inesperado na API.";
  }
}

export async function getPublicProjects(): Promise<AdminProject[]> {
  const response = await fetch(`${API_URL}/api/projects`);
  if (!response.ok) throw new Error(await parseError(response));
  return (await response.json()) as AdminProject[];
}

export async function getPublicPosts(): Promise<AdminPost[]> {
  const response = await fetch(`${API_URL}/api/posts`);
  if (!response.ok) throw new Error(await parseError(response));
  return (await response.json()) as AdminPost[];
}

export async function getPublicConfig(): Promise<HomeFormState> {
  const response = await fetch(`${API_URL}/api/config`);
  if (!response.ok) throw new Error(await parseError(response));
  return (await response.json()) as HomeFormState;
}
