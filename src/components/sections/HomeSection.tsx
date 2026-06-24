import { Activity, ArrowUpRight, MapPin } from "lucide-react";
import { StatusCard } from "../ui";

const techStack = [
  { name: "React", color: "text-cyan-400" },
  { name: "TypeScript", color: "text-blue-400" },
  { name: "Node.js", color: "text-emerald-400" },
  { name: "Tailwind", color: "text-sky-400" },
  { name: "Firebase", color: "text-amber-400" },
  { name: "PostgreSQL", color: "text-indigo-400" },
];

export function HomeSection() {
  return (
    <section className="space-y-12 page-transition">
      {/* Hero */}
      <div className="flex flex-col-reverse md:flex-row items-start justify-between gap-8">
        <div className="space-y-6 flex-1">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight max-w-2xl">
            Desenho sistemas minimalistas e transformo ideias em código limpo.
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-xl leading-relaxed">
            Sou um Desenvolvedor FullStack focado em interfaces fluidas e
            arquitetura moderna.
          </p>
        </div>

        {/* Avatar */}
        <div className="shrink-0">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-accent to-indigo-400 flex items-center justify-center text-white font-bold text-3xl shadow-lg shadow-accent/20 select-none">
            I
          </div>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatusCard
          icon={<Activity className="h-5 w-5" />}
          iconClassName="bg-emerald-500/10 text-emerald-500"
          title="Atividade Atual"
          description="Construindo portfólio em React + TypeScript com arquitetura hexagonal."
        />
        <StatusCard
          icon={<MapPin className="h-5 w-5" />}
          title="Localização"
          description="Luziânia/GO, Brasil"
        />
      </div>

      {/* Stack de Tecnologias */}
      <div className="space-y-4">
        <h2 className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
          Stack Principal
        </h2>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech.name}
              className={`px-3 py-1.5 rounded-lg border border-lightBorder dark:border-darkBorder bg-lightCard dark:bg-darkCard text-xs font-mono font-medium ${tech.color} hover:border-accent transition-colors cursor-default`}
            >
              {tech.name}
            </span>
          ))}
        </div>
      </div>

      {/* Desenvolvimento Recente */}
      <div className="space-y-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
          Desenvolvimentos Recentes
        </h2>

        <button
          type="button"
          className="w-full text-left group border-b border-lightBorder dark:border-darkBorder pb-8 hover:border-accent dark:hover:border-accent transition-colors duration-300"
        >
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-2">
              <span className="text-xs font-mono text-accent">
                Estudo de Caso #01
              </span>
              <h3 className="text-xl font-semibold group-hover:text-accent transition-colors">
                Motor de Física Leve para SVG
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-2xl">
                Como otimizei cálculo vetorial no DOM para manter 60 FPS em
                mobile.
              </p>
            </div>

            <ArrowUpRight className="h-5 w-5 text-neutral-400 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
          </div>
        </button>
      </div>
    </section>
  );
}
