import { describe, it, expect, beforeEach, vi } from "vitest";
import { isAdminAuthenticated, logoutAdmin } from "../services/authApi";

// authApi lê localStorage para validar sessão do admin.
// Aqui isolamos cada teste com beforeEach para garantir estado limpo.

describe("isAdminAuthenticated", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("retorna false quando não há token salvo", () => {
    expect(isAdminAuthenticated()).toBe(false);
  });

  it("retorna false quando o token está expirado", () => {
    const expiredTime = String(Date.now() - 1000); // 1 segundo atrás
    localStorage.setItem("admin_token", "token-qualquer");
    localStorage.setItem("admin_token_exp", expiredTime);

    expect(isAdminAuthenticated()).toBe(false);
  });

  it("retorna true quando o token é válido e não expirou", () => {
    const futureTime = String(Date.now() + 60 * 60 * 1000); // 1 hora à frente
    localStorage.setItem("admin_token", "token-valido");
    localStorage.setItem("admin_token_exp", futureTime);

    expect(isAdminAuthenticated()).toBe(true);
  });

  it("retorna false quando há exp futuro mas sem token", () => {
    const futureTime = String(Date.now() + 60 * 60 * 1000);
    localStorage.setItem("admin_token_exp", futureTime);
    // sem admin_token

    expect(isAdminAuthenticated()).toBe(false);
  });
});

describe("logoutAdmin", () => {
  it("remove todos os dados de sessão do localStorage", () => {
    localStorage.setItem("admin_token", "abc123");
    localStorage.setItem("admin_email", "admin@email.com");
    localStorage.setItem("admin_token_exp", "9999999999999");

    logoutAdmin();

    expect(localStorage.getItem("admin_token")).toBeNull();
    expect(localStorage.getItem("admin_email")).toBeNull();
    expect(localStorage.getItem("admin_token_exp")).toBeNull();
  });

  it("não lança erro quando localStorage já está vazio", () => {
    localStorage.clear();
    expect(() => logoutAdmin()).not.toThrow();
  });
});
