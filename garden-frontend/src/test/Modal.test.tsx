import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "../components/ui/Modal";

// Modal usa createPortal — em jsdom o portal renderiza no document.body.
// Testamos: não renderiza quando fechado, renderiza conteúdo quando aberto,
// e chama onClose ao clicar no backdrop ou no botão X.

describe("Modal", () => {
  it("não renderiza nada quando isOpen=false", () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()}>
        <p>Conteúdo secreto</p>
      </Modal>,
    );

    expect(screen.queryByText("Conteúdo secreto")).not.toBeInTheDocument();
  });

  it("renderiza o conteúdo e o título quando isOpen=true", () => {
    render(
      <Modal isOpen={true} title="Meu Modal" onClose={vi.fn()}>
        <p>Texto do modal</p>
      </Modal>,
    );

    expect(screen.getByText("Meu Modal")).toBeInTheDocument();
    expect(screen.getByText("Texto do modal")).toBeInTheDocument();
  });

  it("chama onClose ao clicar no botão X", () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>Conteúdo</p>
      </Modal>,
    );

    fireEvent.click(screen.getByLabelText("Fechar modal"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("chama onClose ao clicar no backdrop (fora do conteúdo)", () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>Conteúdo</p>
      </Modal>,
    );

    // O backdrop tem role="dialog"
    const backdrop = screen.getByRole("dialog");
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("não chama onClose ao clicar dentro do conteúdo do modal", () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>Conteúdo interno</p>
      </Modal>,
    );

    fireEvent.click(screen.getByText("Conteúdo interno"));
    expect(onClose).not.toHaveBeenCalled();
  });
});
