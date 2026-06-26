import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  NavigationProvider,
  useNavigation,
} from "../app/providers/NavigationProvider";

// Componente auxiliar que expõe o contexto na UI para facilitar os asserts.
function NavConsumer() {
  const { activeTab, setActiveTab } = useNavigation();
  return (
    <div>
      <span data-testid="tab">{activeTab}</span>
      <button onClick={() => setActiveTab("garden")}>Ir para Garden</button>
      <button onClick={() => setActiveTab("lab")}>Ir para Lab</button>
    </div>
  );
}

describe("NavigationProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("inicia com tab 'home' quando não há valor no localStorage", () => {
    render(
      <NavigationProvider>
        <NavConsumer />
      </NavigationProvider>,
    );

    expect(screen.getByTestId("tab").textContent).toBe("home");
  });

  it("restaura a tab salva no localStorage ao montar", () => {
    localStorage.setItem("active_tab", "garden");

    render(
      <NavigationProvider>
        <NavConsumer />
      </NavigationProvider>,
    );

    expect(screen.getByTestId("tab").textContent).toBe("garden");
  });

  it("ignora valor inválido no localStorage e usa 'home'", () => {
    localStorage.setItem("active_tab", "aba-inventada");

    render(
      <NavigationProvider>
        <NavConsumer />
      </NavigationProvider>,
    );

    expect(screen.getByTestId("tab").textContent).toBe("home");
  });

  it("persiste a tab escolhida no localStorage ao mudar", () => {
    render(
      <NavigationProvider>
        <NavConsumer />
      </NavigationProvider>,
    );

    fireEvent.click(screen.getByText("Ir para Lab"));

    expect(screen.getByTestId("tab").textContent).toBe("lab");
    expect(localStorage.getItem("active_tab")).toBe("lab");
  });

  it("useNavigation lança erro fora do provider", () => {
    // Suprimir o erro do React no console durante o teste
    const consoleSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    function BadConsumer() {
      useNavigation(); // deve lançar
      return null;
    }

    expect(() =>
      render(<BadConsumer />),
    ).toThrow("useNavigation must be used within a NavigationProvider");

    consoleSpy.mockRestore();
  });
});
