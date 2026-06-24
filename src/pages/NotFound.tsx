import { useNavigate } from "react-router-dom";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-lightBg dark:bg-darkBg text-neutral-800 dark:text-neutral-200 font-sans flex items-center justify-center px-6">
      <div className="text-center space-y-6 page-transition max-w-md">
        <p className="text-8xl font-mono font-bold text-accent/20 select-none">
          404
        </p>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Página não encontrada
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
            Esse caminho não existe no jardim digital. Talvez seja uma semente
            ainda não plantada. 🌱
          </p>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 rounded-xl border border-lightBorder dark:border-darkBorder text-sm font-medium hover:border-accent transition-colors"
          >
            ← Voltar
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accentHover text-white text-sm font-medium transition-colors"
          >
            Ir para o Início
          </button>
        </div>

        <p className="text-xs font-mono text-neutral-400">
          italo.dev / 404
        </p>
      </div>
    </div>
  );
}
