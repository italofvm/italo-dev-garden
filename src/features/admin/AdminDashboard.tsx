import { useState } from "react";
import {
  createPost,
  createProject,
  updateHomeConfig,
} from "../../services/adminApi";
import type {
  AdminMessage,
  AdminTab,
  BlogFormState,
  HomeFormState,
  ProjectFormState,
  PostStatus,
  ProjectStatus,
} from "../../types/admin";

const INITIAL_PROJECT_FORM: ProjectFormState = {
  title: "",
  description: "",
  repositoryUrl: "",
  deployUrl: "",
  status: "concluido",
  technologies: "",
  image: null,
};

const INITIAL_BLOG_FORM: BlogFormState = {
  title: "",
  content: "",
  status: "semente",
  readTime: "",
  image: null,
};

const INITIAL_HOME_FORM: HomeFormState = {
  bioTitle: "Olá, eu sou o Italo",
  bioDescription: "Desenvolvedor focado em criar soluções robustas...",
  availableForFreela: true,
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>("projects");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<AdminMessage>({ type: "", text: "" });

  const [projectForm, setProjectForm] =
    useState<ProjectFormState>(INITIAL_PROJECT_FORM);
  const [blogForm, setBlogForm] = useState<BlogFormState>(INITIAL_BLOG_FORM);
  const [homeForm, setHomeForm] = useState<HomeFormState>(INITIAL_HOME_FORM);

  const setError = (text: string) => setMessage({ type: "error", text });
  const setSuccess = (text: string) => setMessage({ type: "success", text });

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      if (projectForm.image && projectForm.image.size > 2 * 1024 * 1024) {
        throw new Error("A imagem deve ter no máximo 2MB.");
      }

      await createProject(projectForm);
      setSuccess("🌱 Projeto salvo com sucesso.");
      setProjectForm(INITIAL_PROJECT_FORM);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Erro ao salvar projeto.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await createPost(blogForm);
      setSuccess("📝 Post salvo com sucesso.");
      setBlogForm(INITIAL_BLOG_FORM);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erro ao salvar post.");
    } finally {
      setLoading(false);
    }
  };

  const handleHomeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await updateHomeConfig(homeForm);
      setSuccess("⚙️ Configuração da home atualizada.");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Erro ao atualizar home.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center border-b border-zinc-800 pb-6 mb-8">
          <h1 className="text-2xl font-mono font-bold text-emerald-400">
            _estudio.secreto
          </h1>

          <div className="flex space-x-2 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
            {(["projects", "blog", "home"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-mono rounded-md transition ${
                  activeTab === tab
                    ? "bg-emerald-500 text-zinc-950 font-bold"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                // {tab}
              </button>
            ))}
          </div>
        </header>

        {message.text && (
          <div
            className={`p-4 rounded-lg mb-6 border text-sm font-mono ${
              message.type === "success"
                ? "bg-emerald-950/30 border-emerald-500 text-emerald-400"
                : "bg-red-950/30 border-red-500 text-red-400"
            }`}
          >
            {message.text}
          </div>
        )}

        {activeTab === "projects" && (
          <form
            onSubmit={handleProjectSubmit}
            className="space-y-4 bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl"
          >
            <input
              value={projectForm.title}
              onChange={(e) =>
                setProjectForm({ ...projectForm, title: e.target.value })
              }
              placeholder="Título"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm"
              required
            />
            <textarea
              value={projectForm.description}
              onChange={(e) =>
                setProjectForm({ ...projectForm, description: e.target.value })
              }
              placeholder="Descrição"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm"
              rows={4}
              required
            />
            <input
              value={projectForm.repositoryUrl}
              onChange={(e) =>
                setProjectForm({
                  ...projectForm,
                  repositoryUrl: e.target.value,
                })
              }
              placeholder="GitHub URL"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm"
              required
            />
            <input
              value={projectForm.deployUrl}
              onChange={(e) =>
                setProjectForm({ ...projectForm, deployUrl: e.target.value })
              }
              placeholder="Deploy URL"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm"
            />
            <select
              value={projectForm.status}
              onChange={(e) =>
                setProjectForm({
                  ...projectForm,
                  status: e.target.value as ProjectStatus,
                })
              }
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm"
            >
              <option value="concluido">Concluído</option>
              <option value="andamento">Andamento</option>
              <option value="experimento">Experimento</option>
            </select>
            <input
              value={projectForm.technologies}
              onChange={(e) =>
                setProjectForm({ ...projectForm, technologies: e.target.value })
              }
              placeholder="React, TypeScript..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setProjectForm({
                  ...projectForm,
                  image: e.target.files?.[0] ?? null,
                })
              }
              className="text-sm text-zinc-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 text-zinc-950 font-bold py-3 rounded-lg font-mono text-sm disabled:opacity-50"
            >
              {loading ? "SALVANDO..." : "SALVAR PROJETO"}
            </button>
          </form>
        )}

        {activeTab === "blog" && (
          <form
            onSubmit={handleBlogSubmit}
            className="space-y-4 bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl"
          >
            <input
              value={blogForm.title}
              onChange={(e) =>
                setBlogForm({ ...blogForm, title: e.target.value })
              }
              placeholder="Título do post"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm"
              required
            />
            <textarea
              value={blogForm.content}
              onChange={(e) =>
                setBlogForm({ ...blogForm, content: e.target.value })
              }
              placeholder="Conteúdo"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm"
              rows={6}
              required
            />
            <select
              value={blogForm.status}
              onChange={(e) =>
                setBlogForm({
                  ...blogForm,
                  status: e.target.value as PostStatus,
                })
              }
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm"
            >
              <option value="semente">Semente</option>
              <option value="brotar">Brotar</option>
              <option value="perene">Perene</option>
            </select>
            <input
              value={blogForm.readTime}
              onChange={(e) =>
                setBlogForm({ ...blogForm, readTime: e.target.value })
              }
              placeholder="Tempo de leitura (ex: 5 min)"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 text-zinc-950 font-bold py-3 rounded-lg font-mono text-sm disabled:opacity-50"
            >
              {loading ? "SALVANDO..." : "SALVAR POST"}
            </button>
          </form>
        )}

        {activeTab === "home" && (
          <form
            onSubmit={handleHomeSubmit}
            className="space-y-4 bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl"
          >
            <input
              value={homeForm.bioTitle}
              onChange={(e) =>
                setHomeForm({ ...homeForm, bioTitle: e.target.value })
              }
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm"
            />
            <textarea
              value={homeForm.bioDescription}
              onChange={(e) =>
                setHomeForm({ ...homeForm, bioDescription: e.target.value })
              }
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm"
              rows={4}
            />
            <button
              type="button"
              onClick={() =>
                setHomeForm({
                  ...homeForm,
                  availableForFreela: !homeForm.availableForFreela,
                })
              }
              className="text-xs font-mono px-3 py-2 border border-zinc-700 rounded-lg"
            >
              availableForFreela: {String(homeForm.availableForFreela)}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 text-zinc-950 font-bold py-3 rounded-lg font-mono text-sm disabled:opacity-50"
            >
              {loading ? "SALVANDO..." : "ATUALIZAR HOME"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
