import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { ProjectsSection } from "../components/sections/ProjectsSection";

// Mock do react-router-dom para evitar contexto de rota
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

describe("ProjectsSection", () => {
  it("renderiza o título da seção", () => {
    render(<ProjectsSection />);
    expect(screen.getByText("Projetos")).toBeInTheDocument();
  });

  it("exibe todos os projetos por padrão (filtro 'Todos')", () => {
    render(<ProjectsSection />);
    // Botão Todos deve estar presente
    expect(screen.getByRole("button", { name: "Todos" })).toBeInTheDocument();
  });

  it("filtra projetos ao clicar em 'Concluídos'", async () => {
    const user = userEvent.setup();
    render(<ProjectsSection />);

    await user.click(screen.getByRole("button", { name: "Concluídos" }));

    // Badge "Em Andamento" dos cards de projeto não deve aparecer
    // (os botões de filtro continuam visíveis — checamos só os badges via role)
    const badges = screen.queryAllByText("Em Andamento");
    // Só o botão de filtro pode existir, não um badge de card
    badges.forEach((el) => {
      expect(el.tagName).toBe("BUTTON");
    });
  });

  it("exibe mensagem quando nenhum projeto se encaixa no filtro", async () => {
    const user = userEvent.setup();
    render(<ProjectsSection />);

    // Clica em 'Em Andamento' (não há projetos nessa categoria nos dados mock)
    await user.click(screen.getByRole("button", { name: "Em Andamento" }));

    expect(
      screen.queryByText(/Nenhum projeto nessa categoria/i)
    ).toBeInTheDocument();
  });
});
