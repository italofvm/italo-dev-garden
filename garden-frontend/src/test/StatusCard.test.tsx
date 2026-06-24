import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { StatusCard } from "../components/ui/StatusCard";

describe("StatusCard", () => {
  it("renderiza o título corretamente", () => {
    render(<StatusCard icon={<span>🌱</span>} title="Atividade Atual" />);
    expect(screen.getByText("Atividade Atual")).toBeInTheDocument();
  });

  it("renderiza a descrição quando fornecida", () => {
    render(
      <StatusCard
        icon={<span>📍</span>}
        title="Localização"
        description="Luziânia/GO, Brasil"
      />
    );
    expect(screen.getByText("Luziânia/GO, Brasil")).toBeInTheDocument();
  });

  it("não quebra sem descrição", () => {
    const { container } = render(
      <StatusCard icon={<span>🌱</span>} title="Sem descrição" />
    );
    expect(container).toBeTruthy();
  });
});
