import type { Note } from "../types/notes";

export const notes: Note[] = [
  {
    id: "note-1",
    title: "Gerir Estado Sem Redux: A Minha Abordagem Prática",
    status: "perene",
    date: "12 Jun 2026",
    readTime: "4 min",
    excerpt:
      "Redux é excelente, mas por vezes precisamos apenas de algo que não requeira vinte ficheiros de configuração adicionais.",
    content: `
      <p>Muitas vezes entramos em pânico e instalamos bibliotecas massivas logo no início do projeto.</p>
      <p><strong>A minha solução de eleição:</strong> começar simples com Context API + hooks bem tipados e só evoluir quando houver dor real.</p>
      <p>Com um estado central pequeno, ações explícitas e componentes desacoplados, já se resolve boa parte dos cenários sem complexidade desnecessária.</p>
    `,
  },
  {
    id: "note-2",
    title: "Tailwind VS Styled-Components no ecossistema atual",
    status: "brotar",
    date: "08 Jun 2026",
    readTime: "3 min",
    excerpt:
      "Escrever utilitários no markup ou CSS-in-TS com tema central? Trade-offs de performance e DX em escala.",
    content: `
      <p>O debate não é sobre certo ou errado, e sim sobre contexto.</p>
      <p><strong>Tailwind</strong> acelera muito a entrega e facilita consistência visual.</p>
      <p><strong>CSS-in-TS</strong> oferece composição e tipagem avançada para design systems mais robustos.</p>
    `,
  },
  {
    id: "note-3",
    title: "Conceito: Micro-frontends focados em animação reativa",
    status: "semente",
    date: "25 Mai 2026",
    readTime: "1 min",
    excerpt:
      "Notas iniciais sobre sincronizar animações entre múltiplos micro-frontends em tempo real.",
    content: `
      <p>A principal dificuldade é manter timelines sincronizadas entre apps independentes.</p>
      <p>Estou estudando um event bus baseado em <code>requestAnimationFrame</code> para orquestrar entradas e saídas com timestamps compartilhados.</p>
    `,
  },
];
