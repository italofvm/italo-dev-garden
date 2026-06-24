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
    const data = (await response.json()) as { message?: string };
    return data.message ?? "Error Inesperado na API.";
  } catch {
    return "Error Inesperado na API.";
  }
}

export async function createProject(project: ProjectFormState) {
  const formData = new FormData();
  formData.append("title", project.title);
  formData.append("description", project.description);
  formData.append("repositoryUrl", project.repositoryUrl);
  formData.append("deployUrl", project.deployUrl);
  formData.append("status", project.status);
  formData.append(
    "technologies",
    JSON.stringify(
      project.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    ),
  );

  if (project.image) formData.append("image", project.image);

  const response = await fetch(`${API_URL}/api/projects`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: formData,
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
  const response = await fetch(`${API_URL}/api/home-config`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify(config),
  });

  if (!response.ok) throw new Error(await parseError(response));
}
