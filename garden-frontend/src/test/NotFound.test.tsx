import { render, screen } from "@testing-library/react";
import { NotFound } from "../pages/NotFound";

describe("NotFound", () => {
  it("renders 404 page content", () => {
    render(<NotFound />);

    expect(screen.getByRole("heading", { name: "404" })).toBeInTheDocument();
    expect(screen.getByText("Página não encontrada")).toBeInTheDocument();
  });
});