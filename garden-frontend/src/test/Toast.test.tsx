import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Toast } from "../components/ui/Toast";

describe("Toast", () => {
  it("não renderiza nada quando open=false", () => {
    const { container } = render(<Toast open={false} message="Copiado!" />);
    expect(container.firstChild).toBeNull();
  });

  it("renderiza a mensagem quando open=true", () => {
    render(<Toast open={true} message="E-mail copiado!" />);
    expect(screen.getByText("E-mail copiado!")).toBeInTheDocument();
  });

  it("tem role=alert para acessibilidade", () => {
    render(<Toast open={true} message="Copiado!" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
