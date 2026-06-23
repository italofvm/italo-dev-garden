import { Activity, MapPin, ArrowUpRight } from "lucide-react";
import { StatusCard } from "../ui";

export function HomeSection() {
  return (
    <section className="space-y-12 page-transition">
      <div className="space-y-6">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight max-w-2xl">
          Desenho sistemas minimalistas e transformo ideias em código limpo.
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-xl leading-relaxed">
          Sou um Desenvolverdor FullStack focado em interfaces fluidas e
          arquitetura moderna.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        <StatusCard
          icon={<Activity className="h-5 w-5" />}
          iconClassName="bg-emerald-500/10 text-emerald-500"
          title="Atividade Atual"
          description="A criar protótipos interativos para WebGL e animações fluidas."
        />
        <StatusCard
          icon={<MapPin className="h-5 w-5" />}
          title="Localização"
          description="Luziânia/GO, Brasil"
        />
      </div>

      <div className="space-y-6 pt-6">
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

            <ArrowUpRight className="h-5 w-5 text-neutral-400 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
          </div>
        </button>
      </div>
    </section>
  );
}
