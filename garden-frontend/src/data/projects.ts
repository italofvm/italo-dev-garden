import type { Project } from "../types/projects";

export const projects: Project[] = [
  {
    id: "proj-1",
    title: "Controla+",
    description:
      "Micro-SaaS financeiro focado em simplificar o fluxo de caixa para autônomos. Baixíssima latência e consumo de dados otimizado.",
    status: "concluido",
    technologies: ["React", "TypeScript", "Tailwind", "Firebase"],
    repositoryUrl: "https://github.com/italofvm",
    deployUrl: "https://italodevgarden.vercel.app",
  },
  {
    id: "proj-2",
    title: "Anti-Gravity Physics Engine",
    description:
      "Motor vetorial experimental para elementos SVG reativos que respondem à física e ao movimento do mouse em tempo real.",
    status: "experimento",
    technologies: ["Vanilla JS", "SVG", "Canvas API"],
    repositoryUrl: "https://github.com/italofvm",
  },
];
