import { useEffect, useMemo, useState, type ComponentType } from "react";
import { useNavigate } from "react-router-dom";
import {
  FolderGit2,
  House,
  LogOut,
  Mail,
  Menu,
  Moon,
  NotebookText,
  Pencil,
  RefreshCw,
  Sun,
  Trash2,
  X,
} from "lucide-react";
import {
  createPost,
  createProject,
  deleteLead,
  deletePost,
  deleteProject,
  getHomeConfig,
  listLeads,
  listPosts,
  listProjects,
  updateHomeConfig,
  updatePost,
  updateProject,
} from "../../services/adminApi";
import { logoutAdmin } from "../../services/authApi";
import type {
  AdminLead,
  AdminMessage,
  AdminPost,
  AdminProject,
  AdminTab,
  BlogFormState,
  HomeFormState,
  PostStatus,
  ProjectFormState,
  ProjectStatus,
} from "../../types/admin";

const INITIAL_PROJECT_FORM: ProjectFormState = {
  title: "",
  description: "",
  repositoryUrl: "",
  deployUrl: "",
  imageUrl: "",
  status: "concluido",
  technologies: "",
};

const INITIAL_BLOG_FORM: BlogFormState = {
  title: "",
  content: "",
  status: "semente",
  readTime: "",
  imageUrl: "",
};

const INITIAL_HOME_FORM: HomeFormState = {
  bioTitle: "Olá, eu sou o Italo",
  bioDescription: "Desenvolvedor focado em criar soluções robustas...",
  availableForFreela: true,
};

const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  concluido: "Concluído",
  andamento: "Em andamento",
  experimento: "Experimento",
};

const PROJECT_STATUS_COLORS: Record<ProjectStatus, string> = {
  concluido: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
  andamento: "text-sky-500 bg-sky-500/10 border-sky-500/30",
  experimento: "text-amber-500 bg-amber-500/10 border-amber-500/30",
};

const POST_STATUS_LABELS: Record<PostStatus, string> = {
  semente: "🌱 Semente",
  brotar: "🌿 Brotar",
  perene: "🌳 Perene",
};

const POST_STATUS_COLORS: Record<PostStatus, string> = {
  semente: "text-yellow-500 bg-yellow-500/10 border-yellow-500/30",
  brotar: "text-green-500 bg-green-500/10 border-green-500/30",
  perene: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
};

const inputCls =
  "w-full rounded-xl border border-lightBorder dark:border-darkBorder bg-lightCard dark:bg-darkCard px-3 py-2.5 text-sm text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-accent transition-colors";

const selectCls =
  "w-full rounded-xl border border-lightBorder dark:border-darkBorder bg-lightCard dark:bg-darkCard px-3 py-2.5 text-sm text-neutral-800 dark:text-neutral-100 focus:outline-none focus:border-accent transition-colors";

const panelCls =
  "rounded-2xl border border-lightBorder dark:border-darkBorder bg-lightCard dark:bg-darkCard p-5";

const cardCls =
  "rounded-2xl border border-lightBorder dark:border-darkBorder bg-lightCard dark:bg-darkCard p-4";

interface TabMeta {
  key: AdminTab;
  label: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  count?: number;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdminTab>("projects");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = window.localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<AdminMessage>({ type: "", text: "" });
  const [refreshing, setRefreshing] = useState(false);

  const [projectForm, setProjectForm] =
    useState<ProjectFormState>(INITIAL_PROJECT_FORM);
  const [blogForm, setBlogForm] = useState<BlogFormState>(INITIAL_BLOG_FORM);
  const [homeForm, setHomeForm] = useState<HomeFormState>(INITIAL_HOME_FORM);

  const [editingProject, setEditingProject] = useState<AdminProject | null>(
    null,
  );
  const [editingPost, setEditingPost] = useState<AdminPost | null>(null);

  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [leads, setLeads] = useState<AdminLead[]>([]);

  const tabs: TabMeta[] = useMemo(
    () => [
      {
        key: "projects",
        label: "Projetos",
        icon: FolderGit2,
        count: projects.length,
      },
      { key: "blog", label: "Blog", icon: NotebookText, count: posts.length },
      { key: "home", label: "Home", icon: House },
      { key: "leads", label: "Leads", icon: Mail, count: leads.length },
    ],
    [projects.length, posts.length, leads.length],
  );

  const setError = (text: string) => setMessage({ type: "error", text });
  const setSuccess = (text: string) => setMessage({ type: "success", text });
  const clearMessage = () => setMessage({ type: "", text: "" });

  const refreshData = async () => {
    setRefreshing(true);
    try {
      const [projectData, postData, leadData, configData] = await Promise.all([
        listProjects(),
        listPosts(),
        listLeads(),
        getHomeConfig(),
      ]);
      setProjects(projectData);
      setPosts(postData);
      setLeads(leadData);
      setHomeForm(configData);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Erro ao carregar dados.",
      );
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    void refreshData();
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const switchTab = (tab: AdminTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    clearMessage();
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login", { replace: true });
  };

  const startEditProject = (project: AdminProject) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title,
      description: project.description,
      repositoryUrl: project.repositoryUrl,
      deployUrl: project.deployUrl ?? "",
      imageUrl: project.imageUrl ?? "",
      status: project.status,
      technologies: project.technologies.join(", "),
    });
    clearMessage();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEditProject = () => {
    setEditingProject(null);
    setProjectForm(INITIAL_PROJECT_FORM);
    clearMessage();
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    clearMessage();
    try {
      if (editingProject) {
        await updateProject(editingProject.id, projectForm);
        setSuccess("Projeto atualizado com sucesso.");
        setEditingProject(null);
      } else {
        await createProject(projectForm);
        setSuccess("Projeto criado com sucesso.");
      }
      setProjectForm(INITIAL_PROJECT_FORM);
      await refreshData();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Erro ao salvar projeto.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Remover este projeto?")) return;
    try {
      await deleteProject(id);
      setSuccess("Projeto removido.");
      if (editingProject?.id === id) cancelEditProject();
      await refreshData();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Erro ao remover projeto.",
      );
    }
  };

  const startEditPost = (post: AdminPost) => {
    setEditingPost(post);
    setBlogForm({
      title: post.title,
      content: post.content,
      status: post.status,
      readTime: post.readTime,
      imageUrl: post.imageUrl ?? "",
    });
    clearMessage();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEditPost = () => {
    setEditingPost(null);
    setBlogForm(INITIAL_BLOG_FORM);
    clearMessage();
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    clearMessage();
    try {
      if (editingPost) {
        await updatePost(editingPost.id, blogForm);
        setSuccess("Post atualizado com sucesso.");
        setEditingPost(null);
      } else {
        await createPost(blogForm);
        setSuccess("Post criado com sucesso.");
      }
      setBlogForm(INITIAL_BLOG_FORM);
      await refreshData();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erro ao salvar post.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm("Remover este post?")) return;
    try {
      await deletePost(id);
      setSuccess("Post removido.");
      if (editingPost?.id === id) cancelEditPost();
      await refreshData();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Erro ao remover post.",
      );
    }
  };

  const handleHomeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    clearMessage();
    try {
      await updateHomeConfig(homeForm);
      setSuccess("Configuração da home atualizada.");
      await refreshData();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Erro ao atualizar home.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm("Remover esta mensagem?")) return;
    try {
      await deleteLead(id);
      setSuccess("Mensagem removida.");
      await refreshData();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Erro ao remover mensagem.",
      );
    }
  };

  const renderProjects = () => (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 items-start">
      <section className={`${panelCls} space-y-4`}>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-wide">
            {editingProject ? "Editando projeto" : "Novo projeto"}
          </h2>
          {editingProject && (
            <button
              type="button"
              onClick={cancelEditProject}
              className="text-xs text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 transition"
            >
              Cancelar
            </button>
          )}
        </div>

        <form onSubmit={handleProjectSubmit} className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs text-neutral-500">Título *</label>
            <input
              value={projectForm.title}
              onChange={(e) =>
                setProjectForm({ ...projectForm, title: e.target.value })
              }
              className={inputCls}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-neutral-500">Descrição *</label>
            <textarea
              value={projectForm.description}
              onChange={(e) =>
                setProjectForm({ ...projectForm, description: e.target.value })
              }
              className={inputCls}
              rows={3}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-neutral-500">Repositório *</label>
            <input
              value={projectForm.repositoryUrl}
              onChange={(e) =>
                setProjectForm({
                  ...projectForm,
                  repositoryUrl: e.target.value,
                })
              }
              className={inputCls}
              placeholder="https://github.com/..."
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs text-neutral-500">Deploy</label>
              <input
                value={projectForm.deployUrl}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, deployUrl: e.target.value })
                }
                className={inputCls}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-neutral-500">Imagem</label>
              <input
                value={projectForm.imageUrl}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, imageUrl: e.target.value })
                }
                className={inputCls}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs text-neutral-500">Status</label>
              <select
                value={projectForm.status}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    status: e.target.value as ProjectStatus,
                  })
                }
                className={selectCls}
              >
                <option value="concluido">Concluído</option>
                <option value="andamento">Em andamento</option>
                <option value="experimento">Experimento</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-neutral-500">Tecnologias *</label>
              <input
                value={projectForm.technologies}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, technologies: e.target.value })
                }
                className={inputCls}
                placeholder="React, TypeScript..."
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-accent text-white font-semibold py-2.5 text-sm hover:opacity-90 transition disabled:opacity-50"
          >
            {loading
              ? "Salvando..."
              : editingProject
                ? "Atualizar projeto"
                : "Criar projeto"}
          </button>
        </form>
      </section>

      <section className={`${panelCls} space-y-3`}>
        <h2 className="text-sm font-semibold tracking-wide">
          Lista de projetos ({projects.length})
        </h2>
        <div className="space-y-2">
          {projects.length === 0 ? (
            <p className="text-sm text-neutral-500 p-4">Nenhum projeto ainda.</p>
          ) : (
            projects.map((item) => (
              <div
                key={item.id}
                className={`${cardCls} transition-colors ${
                  editingProject?.id === item.id
                    ? "border-amber-500/40 bg-amber-500/5"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm truncate">{item.title}</p>
                    <p className="text-xs text-neutral-500 mt-1 line-clamp-1">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span
                        className={`text-xs px-2 py-0.5 rounded border ${PROJECT_STATUS_COLORS[item.status]}`}
                      >
                        {PROJECT_STATUS_LABELS[item.status]}
                      </span>
                      {item.technologies.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-xs px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-900 rounded text-neutral-500"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => startEditProject(item)}
                      className="p-1.5 rounded-md border border-lightBorder dark:border-darkBorder text-neutral-500 hover:text-amber-500 transition"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleDeleteProject(item.id)}
                      className="p-1.5 rounded-md border border-lightBorder dark:border-darkBorder text-neutral-500 hover:text-red-500 transition"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );

  const renderBlog = () => (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 items-start">
      <section className={`${panelCls} space-y-4`}>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-wide">
            {editingPost ? "Editando post" : "Novo post"}
          </h2>
          {editingPost && (
            <button
              type="button"
              onClick={cancelEditPost}
              className="text-xs text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 transition"
            >
              Cancelar
            </button>
          )}
        </div>

        <form onSubmit={handleBlogSubmit} className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs text-neutral-500">Título *</label>
            <input
              value={blogForm.title}
              onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
              className={inputCls}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-neutral-500">Conteúdo *</label>
            <textarea
              value={blogForm.content}
              onChange={(e) =>
                setBlogForm({ ...blogForm, content: e.target.value })
              }
              className={inputCls}
              rows={7}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs text-neutral-500">Status</label>
              <select
                value={blogForm.status}
                onChange={(e) =>
                  setBlogForm({
                    ...blogForm,
                    status: e.target.value as PostStatus,
                  })
                }
                className={selectCls}
              >
                <option value="semente">🌱 Semente</option>
                <option value="brotar">🌿 Brotar</option>
                <option value="perene">🌳 Perene</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-neutral-500">Tempo de leitura *</label>
              <input
                value={blogForm.readTime}
                onChange={(e) =>
                  setBlogForm({ ...blogForm, readTime: e.target.value })
                }
                className={inputCls}
                placeholder="5 min"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-neutral-500">Imagem</label>
            <input
              value={blogForm.imageUrl}
              onChange={(e) =>
                setBlogForm({ ...blogForm, imageUrl: e.target.value })
              }
              className={inputCls}
              placeholder="https://..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-accent text-white font-semibold py-2.5 text-sm hover:opacity-90 transition disabled:opacity-50"
          >
            {loading
              ? "Salvando..."
              : editingPost
                ? "Atualizar post"
                : "Criar post"}
          </button>
        </form>
      </section>

      <section className={`${panelCls} space-y-3`}>
        <h2 className="text-sm font-semibold tracking-wide">
          Lista de posts ({posts.length})
        </h2>
        <div className="space-y-2">
          {posts.length === 0 ? (
            <p className="text-sm text-neutral-500 p-4">Nenhum post ainda.</p>
          ) : (
            posts.map((item) => (
              <div
                key={item.id}
                className={`${cardCls} transition-colors ${
                  editingPost?.id === item.id
                    ? "border-amber-500/40 bg-amber-500/5"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm truncate">{item.title}</p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span
                        className={`text-xs px-2 py-0.5 rounded border ${POST_STATUS_COLORS[item.status]}`}
                      >
                        {POST_STATUS_LABELS[item.status]}
                      </span>
                      <span className="text-xs text-neutral-500">{item.readTime}</span>
                    </div>
                  </div>

                  <div className="flex gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => startEditPost(item)}
                      className="p-1.5 rounded-md border border-lightBorder dark:border-darkBorder text-neutral-500 hover:text-amber-500 transition"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleDeletePost(item.id)}
                      className="p-1.5 rounded-md border border-lightBorder dark:border-darkBorder text-neutral-500 hover:text-red-500 transition"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );

  const renderHome = () => (
    <div className="max-w-xl">
      <section className={`${panelCls} space-y-4`}>
        <h2 className="text-sm font-semibold tracking-wide">Configuração da home</h2>
        <form onSubmit={handleHomeSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs text-neutral-500">Título da bio</label>
            <input
              value={homeForm.bioTitle}
              onChange={(e) =>
                setHomeForm({ ...homeForm, bioTitle: e.target.value })
              }
              className={inputCls}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-neutral-500">Descrição da bio</label>
            <textarea
              value={homeForm.bioDescription}
              onChange={(e) =>
                setHomeForm({ ...homeForm, bioDescription: e.target.value })
              }
              className={inputCls}
              rows={4}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-neutral-500">Disponível para freela</label>
            <button
              type="button"
              onClick={() =>
                setHomeForm({
                  ...homeForm,
                  availableForFreela: !homeForm.availableForFreela,
                })
              }
              className={`w-full rounded-xl border px-3 py-2.5 text-sm transition ${
                homeForm.availableForFreela
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-500"
                  : "border-lightBorder dark:border-darkBorder text-neutral-500"
              }`}
            >
              {homeForm.availableForFreela ? "Disponível" : "Indisponível"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-accent text-white font-semibold py-2.5 text-sm hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Salvando..." : "Atualizar home"}
          </button>
        </form>
      </section>
    </div>
  );

  const renderLeads = () => (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold tracking-wide">
        Mensagens recebidas ({leads.length})
      </h2>

      {leads.length === 0 ? (
        <div className={`${panelCls} text-center text-sm text-neutral-500`}>
          Nenhuma mensagem recebida ainda.
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
          {leads.map((lead) => (
            <div key={lead.id} className={cardCls}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm">{lead.nome}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">{lead.email}</p>
                </div>
                <button
                  type="button"
                  onClick={() => void handleDeleteLead(lead.id)}
                  className="p-1.5 rounded-md border border-lightBorder dark:border-darkBorder text-neutral-500 hover:text-red-500 transition"
                >
                  <Trash2 size={13} />
                </button>
              </div>

              <p className="text-sm mt-3 leading-relaxed border-t border-lightBorder dark:border-darkBorder pt-3">
                {lead.mensagem}
              </p>

              {lead.createdAt && (
                <p className="text-xs text-neutral-500 mt-3">
                  {new Date(lead.createdAt).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );

  const summaryText = refreshing
    ? "Sincronizando dados..."
    : `${projects.length} projetos · ${posts.length} posts · ${leads.length} leads`;

  return (
    <div className="min-h-screen bg-lightBg dark:bg-darkBg text-neutral-800 dark:text-neutral-100">
      <div className="mx-auto flex max-w-7xl">
        <aside className="hidden lg:flex w-72 shrink-0 border-r border-lightBorder dark:border-darkBorder p-5 sticky top-0 h-screen flex-col gap-6">
          <div>
            <p className="text-xs font-mono text-accent">/admin</p>
            <h1 className="text-lg font-bold mt-1">Painel de Controle</h1>
            <p className="text-xs text-neutral-500 mt-2">{summaryText}</p>
          </div>

          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => switchTab(tab.key)}
                  className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition ${
                    activeTab === tab.key
                      ? "bg-accent text-white"
                      : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon size={15} />
                    {tab.label}
                  </span>
                  {typeof tab.count === "number" && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10">
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="mt-auto flex flex-col gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-lightBorder dark:border-darkBorder px-3 py-2.5 text-sm hover:border-accent transition"
            >
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
              {theme === "dark" ? "Tema claro" : "Tema escuro"}
            </button>
            <button
              type="button"
              onClick={() => void refreshData()}
              disabled={refreshing}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-lightBorder dark:border-darkBorder px-3 py-2.5 text-sm hover:border-accent transition disabled:opacity-50"
            >
              <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
              Atualizar
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-lightBorder dark:border-darkBorder px-3 py-2.5 text-sm text-red-500 hover:border-red-500/40 transition"
            >
              <LogOut size={14} />
              Sair
            </button>
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <header className="lg:hidden sticky top-0 z-20 border-b border-lightBorder dark:border-darkBorder bg-lightBg/90 dark:bg-darkBg/90 backdrop-blur-sm">
            <div className="px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-mono text-accent">/admin</p>
                <h1 className="text-sm font-semibold">Painel de Controle</h1>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="p-2 rounded-lg border border-lightBorder dark:border-darkBorder"
              >
                {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>

            {mobileMenuOpen && (
              <div className="px-4 pb-3 space-y-2 border-t border-lightBorder dark:border-darkBorder">
                <div className="pt-2 grid grid-cols-2 gap-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => switchTab(tab.key)}
                        className={`rounded-xl px-3 py-2 text-sm flex items-center justify-between ${
                          activeTab === tab.key
                            ? "bg-accent text-white"
                            : "border border-lightBorder dark:border-darkBorder"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Icon size={14} />
                          {tab.label}
                        </span>
                        {typeof tab.count === "number" && (
                          <span className="text-[10px]">{tab.count}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className="rounded-xl border border-lightBorder dark:border-darkBorder px-3 py-2 text-sm flex items-center justify-center gap-1"
                  >
                    {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
                    Tema
                  </button>
                  <button
                    type="button"
                    onClick={() => void refreshData()}
                    disabled={refreshing}
                    className="rounded-xl border border-lightBorder dark:border-darkBorder px-3 py-2 text-sm"
                  >
                    {refreshing ? "Atualizando..." : "Atualizar"}
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-xl border border-red-500/40 text-red-500 px-3 py-2 text-sm"
                  >
                    Sair
                  </button>
                </div>
              </div>
            )}
          </header>

          <main className="p-4 md:p-6 lg:p-8 space-y-5">
            <section className={panelCls}>
              <h2 className="text-lg font-semibold">
                {tabs.find((t) => t.key === activeTab)?.label}
              </h2>
              <p className="text-sm text-neutral-500 mt-1">{summaryText}</p>
            </section>

            {message.text && (
              <section
                className={`rounded-xl border p-3 text-sm flex items-center justify-between gap-3 ${
                  message.type === "success"
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                    : "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400"
                }`}
              >
                <span>{message.text}</span>
                <button type="button" onClick={clearMessage}>
                  <X size={14} />
                </button>
              </section>
            )}

            {activeTab === "projects" && renderProjects()}
            {activeTab === "blog" && renderBlog()}
            {activeTab === "home" && renderHome()}
            {activeTab === "leads" && renderLeads()}
          </main>
        </div>
      </div>
    </div>
  );
}
