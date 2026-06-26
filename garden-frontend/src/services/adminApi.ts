import type {
  HomeFormState,
  ProjectFormState,
  BlogFormState,
  AdminProject,
  AdminPost,
  AdminLead,
} from "../types/admin";

const API_URL = import.meta.env.VITE_API_URL;

function getAuthToken() {
  return localStorage.getItem("admin_token");
}

async function parseError(response: Response) {
  try {
    const data = (await response.json()) as {
      message?: string;
      error?: string;
    };
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
      imageUrl: project.imageUrl || undefined,
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
      imageUrl: post.imageUrl || undefined,
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

export async function listProjects(): Promise<AdminProject[]> {
  const response = await fetch(`${API_URL}/api/projects`);
  if (!response.ok) throw new Error(await parseError(response));
  return (await response.json()) as AdminProject[];
}

export async function listPosts(): Promise<AdminPost[]> {
  const response = await fetch(`${API_URL}/api/posts`);
  if (!response.ok) throw new Error(await parseError(response));
  return (await response.json()) as AdminPost[];
}

export async function listLeads(): Promise<AdminLead[]> {
  const response = await fetch(`${API_URL}/api/leads`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  if (!response.ok) throw new Error(await parseError(response));
  return (await response.json()) as AdminLead[];
}

export async function getHomeConfig(): Promise<HomeFormState> {
  const response = await fetch(`${API_URL}/api/config`);
  if (!response.ok) throw new Error(await parseError(response));
  return (await response.json()) as HomeFormState;
}

export async function updateProject(id: string, project: ProjectFormState) {
  const technologies = project.technologies
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const response = await fetch(`${API_URL}/api/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify({
      title: project.title,
      description: project.description,
      repositoryUrl: project.repositoryUrl,
      deployUrl: project.deployUrl || undefined,
      imageUrl: project.imageUrl || undefined,
      status: project.status,
      technologies,
    }),
  });

  if (!response.ok) throw new Error(await parseError(response));
}

export async function updatePost(id: string, post: BlogFormState) {
  const response = await fetch(`${API_URL}/api/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify({
      title: post.title,
      content: post.content,
      status: post.status,
      readTime: post.readTime,
      imageUrl: post.imageUrl || undefined,
    }),
  });

  if (!response.ok) throw new Error(await parseError(response));
}

export async function deleteProject(id: string) {
  const response = await fetch(`${API_URL}/api/projects/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  if (!response.ok) throw new Error(await parseError(response));
}

export async function deletePost(id: string) {
  const response = await fetch(`${API_URL}/api/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  if (!response.ok) throw new Error(await parseError(response));
}

export async function deleteLead(id: string) {
  const response = await fetch(`${API_URL}/api/leads/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  if (!response.ok) throw new Error(await parseError(response));
}
