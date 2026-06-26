import { useCallback, useEffect, useState } from "react";
import type { AdminProject, HomeFormState } from "../types/admin";
import type { Note } from "../types/notes";
import {
  getPublicConfig,
  getPublicPosts,
  getPublicProjects,
} from "../services/publicApi";

const FALLBACK_CONFIG: HomeFormState = {
  bioTitle: "Olá, eu sou o Italo",
  bioDescription: "Desenvolvedor focado em criar soluções robustas e escaláveis.",
  availableForFreela: true,
};

function toExcerpt(content: string): string {
  const withoutTags = content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (!withoutTags) return "Sem resumo disponível.";
  return withoutTags.length > 140
    ? `${withoutTags.slice(0, 140).trimEnd()}...`
    : withoutTags;
}

function toDateLabel(value?: string): string {
  if (!value) return "Sem data";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "Sem data";
  return parsed.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

interface UsePublicContentResult {
  projects: AdminProject[];
  notes: Note[];
  config: HomeFormState;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function usePublicContent(): UsePublicContentResult {
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [config, setConfig] = useState<HomeFormState>(FALLBACK_CONFIG);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [projectData, postData, configData] = await Promise.all([
        getPublicProjects(),
        getPublicPosts(),
        getPublicConfig(),
      ]);

      const mappedNotes: Note[] = postData.map((post) => ({
        id: post.id,
        title: post.title,
        status: post.status,
        date: toDateLabel(post.createdAt),
        readTime: post.readTime,
        excerpt: toExcerpt(post.content),
        content: post.content,
      }));

      setProjects(projectData);
      setNotes(mappedNotes);
      setConfig(configData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar conteúdo.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  return { projects, notes, config, loading, error, refetch };
}
