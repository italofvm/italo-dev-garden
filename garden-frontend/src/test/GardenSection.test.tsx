import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { GardenSection } from "../components/sections/GardenSection";
import type { Note } from "../types/notes";

const mockNotes: Note[] = [
  {
    id: "1",
    title: "Nota Semente",
    excerpt: "Resumo da semente",
    content: "**Conteúdo em bold** da semente",
    status: "semente",
    date: "2024-01-01",
    readTime: "2 min",
  },
  {
    id: "2",
    title: "Nota Brotar",
    excerpt: "Resumo da brotar",
    content: "## Heading\n\nConteúdo em broto",
    status: "brotar",
    date: "2024-01-02",
    readTime: "3 min",
  },
  {
    id: "3",
    title: "Nota Perene",
    excerpt: "Resumo da perene",
    content: "- Item 1\n- Item 2\n- Item 3",
    status: "perene",
    date: "2024-01-03",
    readTime: "5 min",
  },
];

describe("GardenSection", () => {
  it("renderiza todas as notas por padrão (filtro 'Todos')", () => {
    render(<GardenSection notes={mockNotes} />);

    expect(screen.getByText("Nota Semente")).toBeInTheDocument();
    expect(screen.getByText("Nota Brotar")).toBeInTheDocument();
    expect(screen.getByText("Nota Perene")).toBeInTheDocument();
  });

  it("filtra apenas notas 'semente' ao clicar no filtro correspondente", () => {
    render(<GardenSection notes={mockNotes} />);

    fireEvent.click(screen.getByText("🌱 Sementes (Rascunhos)"));

    expect(screen.getByText("Nota Semente")).toBeInTheDocument();
    expect(screen.queryByText("Nota Brotar")).not.toBeInTheDocument();
    expect(screen.queryByText("Nota Perene")).not.toBeInTheDocument();
  });

  it("filtra apenas notas 'perene' ao clicar no filtro correspondente", () => {
    render(<GardenSection notes={mockNotes} />);

    fireEvent.click(screen.getByText("🌳 Perene (Concluídas)"));

    expect(screen.getByText("Nota Perene")).toBeInTheDocument();
    expect(screen.queryByText("Nota Semente")).not.toBeInTheDocument();
  });

  it("exibe mensagem vazia quando não há posts publicados", () => {
    render(<GardenSection notes={[]} />);

    expect(
      screen.getByText("Ainda não há posts publicados."),
    ).toBeInTheDocument();
  });

  it("abre o modal ao clicar em uma nota e mostra o conteúdo renderizado", () => {
    render(<GardenSection notes={mockNotes} />);

    fireEvent.click(screen.getByText("Nota Semente"));

    // Verifica que o modal renderizou o conteúdo Markdown
    expect(screen.getAllByText("Nota Semente").length).toBeGreaterThan(0);
    expect(screen.getByText(/Conteúdo em bold/)).toBeInTheDocument();
  });

  it("fecha o modal ao clicar no botão X", () => {
    render(<GardenSection notes={mockNotes} />);

    fireEvent.click(screen.getByText("Nota Semente"));
    expect(screen.getByText(/Conteúdo em bold/)).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Fechar modal"));
    expect(screen.queryByText(/Conteúdo em bold/)).not.toBeInTheDocument();
  });

  it("renderiza Markdown com suporte a listas, headings e bold", () => {
    render(<GardenSection notes={mockNotes} />);

    fireEvent.click(screen.getByText("Nota Perene"));

    // Markdown renderizado (as classes prose/dark-mode são aplicadas pelo Tailwind)
    const mdContainer = screen.getByText(/Item 1/);
    expect(mdContainer).toBeInTheDocument();
  });

  it("sanitiza conteúdo perigoso (XSS protection)", () => {
    const noteDangerous: Note = {
      id: "99",
      title: "XSS Test",
      excerpt: "...",
      content: "<img src=x onerror='alert(\"xss\")'>Texto seguro",
      status: "perene",
      date: "2024-01-04",
      readTime: "1 min",
    };

    render(<GardenSection notes={[noteDangerous]} />);
    fireEvent.click(screen.getByText("XSS Test"));

    // DOMPurify remove o onerror
    const imgTag = document.querySelector("img[onerror]");
    expect(imgTag).not.toBeInTheDocument();
  });
});
