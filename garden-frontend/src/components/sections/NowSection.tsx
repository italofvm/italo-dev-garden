export function NowSection() {
  const nowItems = [
    {
      category: "📚 Lendo",
      items: [
        "Clean Architecture — Robert C. Martin",
        "The Pragmatic Programmer — Hunt & Thomas",
      ],
    },
    {
      category: "🎧 Ouvindo",
      items: ["Lo-fi beats para codar", "The Developer Tea Podcast"],
    },
    {
      category: "⚙️ Construindo",
      items: [
        "Portfólio pessoal em React + TypeScript",
        "API REST com arquitetura hexagonal",
      ],
    },
    {
      category: "🌱 Aprendendo",
      items: ["Animações CSS avançadas", "Testes com Vitest e Testing Library"],
    },
  ];

  return (
    <section className="space-y-10 page-transition">
      <div className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          Agora
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-xl">
          Uma janela do que estou lendo, ouvindo e construindo nesse momento.
          Inspirado no movimento{" "}
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            /now
          </a>
          .
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {nowItems.map((block) => (
          <div
            key={block.category}
            className="p-5 rounded-2xl border border-lightBorder dark:border-darkBorder bg-lightCard dark:bg-darkCard space-y-3"
          >
            <h3 className="text-sm font-bold">{block.category}</h3>
            <ul className="space-y-1.5">
              {block.items.map((item) => (
                <li
                  key={item}
                  className="text-sm text-neutral-500 dark:text-neutral-400 flex items-start gap-2"
                >
                  <span className="text-accent mt-0.5">›</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="text-xs font-mono text-neutral-400">
        Atualizado em: Julho de 2025
      </p>
    </section>
  );
}
