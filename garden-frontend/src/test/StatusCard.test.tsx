import { render, screen } from "@testing-library/react";
import { StatusCard } from "../components/ui/StatusCard";

describe("StatusCard", () => {
  it("renders title, description and icon", () => {
    render(
      <StatusCard
        icon={<span data-testid="status-icon">i</span>}
        title="Atividade Atual"
        description="Construindo funcionalidades"
      />,
    );

    expect(screen.getByText("Atividade Atual")).toBeInTheDocument();
    expect(screen.getByText("Construindo funcionalidades")).toBeInTheDocument();
    expect(screen.getByTestId("status-icon")).toBeInTheDocument();
  });

  it("applies custom icon className", () => {
    render(
      <StatusCard
        icon={<span>i</span>}
        title="Localização"
        iconClassName="bg-red-500 text-white"
      />,
    );

    const iconWrapper = screen.getByText("i").parentElement;
    expect(iconWrapper).toHaveClass("bg-red-500");
    expect(iconWrapper).toHaveClass("text-white");
  });
});