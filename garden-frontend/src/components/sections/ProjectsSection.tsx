import { useState } from "react";
import { ExternalLink, GitBranch } from "lucide-react";
import { projects } from "../../data/projects";
import {
  statusColors,
  statusLabels,
  type ProjectStatus,
} from "../../types/projects";

type Filter = "todos" | ProjectStatus;

const filters: { id: Filter; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "concluido", label: "Concluídos" },
  { id: "andamento", label: "Em Andamento" },
  { id: "experimento", label: "Experimentos" },
];

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<Filter>("todos");

  const filtered =
    activeFilter === "todos"
      ? projects
      : projects.filter((p) => p.status === activeFilter);

  return (
    <section className="space-y-10 page-transition">
      <div className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          Projetos
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-xl">
          Trabalhos que saíram do papel — de experimentos a produtos em
          produção.
        </p>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setActiveFilter(f.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 cursor-pointer ${
              activeFilter === f.id
                ? "bg-accent text-white border-accent"
                : "border-lightBorder dark:border-darkBorder text-neutral-400 hover:border-accent hover:text-accent"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.length === 0 ? (
          <p className="text-sm text-neutral-400 col-span-2">
            Nenhum projeto nessa categoria ainda. 🌱
          </p>
        ) : (
          filtered.map((project) => (
            <article
              key={project.id}
              className="group rounded-2xl border border-lightBorder dark:border-darkBorder bg-lightCard dark:bg-darkCard p-6 flex flex-col gap-4 hover:border-accent dark:hover:border-accent transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-bold group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <span
                  className={`shrink-0 px-2 py-0.5 rounded-full border text-[10px] font-mono font-bold uppercase tracking-wider ${statusColors[project.status]}`}
                >
                  {statusLabels[project.status]}
                </span>
              </div>

              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed flex-grow">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900 text-[11px] font-mono text-neutral-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 pt-2 text-xs font-mono border-t border-lightBorder dark:border-darkBorder">
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-accent flex items-center gap-1.5 transition-colors"
                >
                  <GitBranch className="h-3.5 w-3.5" />
                  Código
                </a>

                {project.deployUrl && (
                  <a
                    href={project.deployUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accentHover flex items-center gap-1.5 transition-colors font-semibold"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Acessar
                  </a>
                )}
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
