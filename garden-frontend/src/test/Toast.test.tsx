import { fireEvent, render, screen } from "@testing-library/react";
import { Toast } from "../components/ui/Toast";

describe("Toast", () => {
  it("renders message", () => {
    render(<Toast message="Operação concluída" onClose={() => {}} />);
    expect(screen.getByText("Operação concluída")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = vi.fn();
    render(<Toast message="Fechar teste" onClose={onClose} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("applies classes according to toast type", () => {
    const { rerender } = render(
      <Toast message="OK" type="success" onClose={() => {}} />,
    );
    expect(screen.getByText("OK").parentElement).toHaveClass("bg-green-100");

    rerender(<Toast message="Erro" type="error" onClose={() => {}} />);
    expect(screen.getByText("Erro").parentElement).toHaveClass("bg-red-100");
  });
});