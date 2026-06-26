import { fireEvent, render, screen } from "@testing-library/react";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import type { AdminProject } from "../types/admin";

const projectsMock: AdminProject[] = [
  {
    id: "1",
    title: "Projeto Concluído",
    description: "Descrição concluído",
    repositoryUrl: "https://github.com/example/a",
    status: "concluido",
    technologies: ["React", "TypeScript"],
    imageUrl: "https://images.example.com/project-a.png",
  },
  {
    id: "2",
    title: "Projeto em Andamento",
    description: "Descrição andamento",
    repositoryUrl: "https://github.com/example/b",
    status: "andamento",
    technologies: ["Node.js"],
  },
];

describe("ProjectsSection", () => {
  it("renders project cards and fallback image placeholder", () => {
    render(<ProjectsSection projects={projectsMock} />);

    expect(screen.getByText("Projeto Concluído")).toBeInTheDocument();
    expect(screen.getByText("Projeto em Andamento")).toBeInTheDocument();
    expect(
      screen.getByAltText("Preview do projeto Projeto Concluído"),
    ).toBeInTheDocument();
    expect(screen.getByText("sem imagem")).toBeInTheDocument();
  });

  it("filters projects by status", () => {
    render(<ProjectsSection projects={projectsMock} />);

    fireEvent.click(screen.getByRole("button", { name: "Em Andamento" }));

    expect(screen.getByText("Projeto em Andamento")).toBeInTheDocument();
    expect(screen.queryByText("Projeto Concluído")).not.toBeInTheDocument();
  });

  it("shows empty state when no project matches filter", () => {
    render(<ProjectsSection projects={projectsMock} />);

    fireEvent.click(screen.getByRole("button", { name: "Experimentos" }));

    expect(
      screen.getByText("Nenhum projeto nessa categoria ainda. 🌱"),
    ).toBeInTheDocument();
  });
});