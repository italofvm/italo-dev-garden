import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { NotFound } from "../pages/NotFound";

const navigateMock = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return { ...actual, useNavigate: () => navigateMock };
});

function renderNotFound() {
  return render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  );
}

describe("NotFound", () => {
  it("exibe o código 404", () => {
    renderNotFound();
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("exibe a mensagem de página não encontrada", () => {
    renderNotFound();
    expect(screen.getByText("Página não encontrada")).toBeInTheDocument();
  });

  it("tem botão de Ir para o Início", () => {
    renderNotFound();
    expect(
      screen.getByRole("button", { name: /Ir para o Início/i })
    ).toBeInTheDocument();
  });

  it("tem botão de Voltar", () => {
    renderNotFound();
    expect(
      screen.getByRole("button", { name: /Voltar/i })
    ).toBeInTheDocument();
  });

  it("botão Início chama navigate('/')", async () => {
    const user = userEvent.setup();
    renderNotFound();
    await user.click(screen.getByRole("button", { name: /Ir para o Início/i }));
    expect(navigateMock).toHaveBeenCalledWith("/");
  });
});
