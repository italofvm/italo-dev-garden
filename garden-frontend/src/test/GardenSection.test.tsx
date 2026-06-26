import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { GardenSection } from "../components/sections/GardenSection";
import type { Note } from "../types/notes";

// Notas de exemplo cobrindo os três status possíveis.
const mockNotes: Note[] = [
  {
    id: "1",
    title: "Nota Semente",
    excerpt: "Resumo da semente",
    content: "Conteúdo completo da semente",
    status: "semente",
    date: "2024-01-01",
    readTime: "2 min",
  },
  {
    id: "2",
    title: "Nota Brotar",
    excerpt: "Resumo da brotar",
    content: "Conteúdo completo em broto",
    status: "brotar",
    date: "2024-01-02",
    readTime: "3 min",
  },
  {
    id: "3",
    title: "Nota Perene",
    excerpt: "Resumo da perene",
    content: "Conteúdo completo perene",
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

  it("abre o modal ao clicar em uma nota e mostra o conteúdo", () => {
    render(<GardenSection notes={mockNotes} />);

    fireEvent.click(screen.getByText("Nota Semente"));

    // O modal mostra o título e o conteúdo completo
    expect(screen.getAllByText("Nota Semente").length).toBeGreaterThan(0);
    expect(
      screen.getByText("Conteúdo completo da semente"),
    ).toBeInTheDocument();
  });

  it("fecha o modal ao clicar no botão X", () => {
    render(<GardenSection notes={mockNotes} />);

    fireEvent.click(screen.getByText("Nota Semente"));
    expect(
      screen.getByText("Conteúdo completo da semente"),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Fechar modal"));
    expect(
      screen.queryByText("Conteúdo completo da semente"),
    ).not.toBeInTheDocument();
  });

  it("remove tags HTML do conteúdo antes de exibir (proteção XSS)", () => {
    const noteWithHtml: Note = {
      id: "99",
      title: "Com HTML",
      excerpt: "...",
      content: "<script>alert('xss')</script>Texto limpo",
      status: "perene",
      date: "2024-01-04",
      readTime: "1 min",
    };

    render(<GardenSection notes={[noteWithHtml]} />);
    fireEvent.click(screen.getByText("Com HTML"));

    // stripHtml remove a tag mas mantém o texto do interior; o conteúdo
    // final é "alert('xss') Texto limpo" — verificamos que a tag em si
    // foi removida e que o texto "Texto limpo" aparece em algum ponto.
    expect(screen.getByText(/Texto limpo/)).toBeInTheDocument();
    expect(document.querySelector("script")).not.toBeInTheDocument();
  });
});
