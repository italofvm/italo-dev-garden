import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AdminProtectedRoute } from "../features/admin/AdminProtectedRoute";

// AdminProtectedRoute chama isAdminAuthenticated().
// Controlamos o estado via localStorage para simular autenticado/não autenticado.

function renderWithRouter(authenticated: boolean) {
  if (authenticated) {
    localStorage.setItem("admin_token", "valid-token");
    localStorage.setItem("admin_token_exp", String(Date.now() + 3600_000));
  } else {
    localStorage.clear();
  }

  return render(
    <MemoryRouter initialEntries={["/admin"]}>
      <Routes>
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <div>Painel Admin</div>
            </AdminProtectedRoute>
          }
        />
        <Route path="/admin/login" element={<div>Página de Login</div>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("AdminProtectedRoute", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renderiza o conteúdo protegido quando o usuário está autenticado", () => {
    renderWithRouter(true);
    expect(screen.getByText("Painel Admin")).toBeInTheDocument();
  });

  it("redireciona para /admin/login quando não há sessão", () => {
    renderWithRouter(false);
    expect(screen.getByText("Página de Login")).toBeInTheDocument();
    expect(screen.queryByText("Painel Admin")).not.toBeInTheDocument();
  });
});
