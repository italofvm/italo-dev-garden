import { describe, it, expect, beforeEach } from "vitest";
import { isAdminAuthenticated, logoutAdmin } from "../services/authApi";

// authApi usa sessionStorage para armazenar a sessão do admin.
// sessionStorage é isolado por aba e descartado ao fechar o browser.

describe("isAdminAuthenticated", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("retorna false quando não há token salvo", () => {
    expect(isAdminAuthenticated()).toBe(false);
  });

  it("retorna false quando o token está expirado", () => {
    const expiredTime = String(Date.now() - 1000);
    sessionStorage.setItem("admin_token", "token-qualquer");
    sessionStorage.setItem("admin_token_exp", expiredTime);

    expect(isAdminAuthenticated()).toBe(false);
  });

  it("retorna true quando o token é válido e não expirou", () => {
    const futureTime = String(Date.now() + 60 * 60 * 1000);
    sessionStorage.setItem("admin_token", "token-valido");
    sessionStorage.setItem("admin_token_exp", futureTime);

    expect(isAdminAuthenticated()).toBe(true);
  });

  it("retorna false quando há exp futuro mas sem token", () => {
    const futureTime = String(Date.now() + 60 * 60 * 1000);
    sessionStorage.setItem("admin_token_exp", futureTime);

    expect(isAdminAuthenticated()).toBe(false);
  });
});

describe("logoutAdmin", () => {
  it("remove todos os dados de sessão do sessionStorage", () => {
    sessionStorage.setItem("admin_token", "abc123");
    sessionStorage.setItem("admin_email", "admin@email.com");
    sessionStorage.setItem("admin_token_exp", "9999999999999");

    logoutAdmin();

    expect(sessionStorage.getItem("admin_token")).toBeNull();
    expect(sessionStorage.getItem("admin_email")).toBeNull();
    expect(sessionStorage.getItem("admin_token_exp")).toBeNull();
  });

  it("não lança erro quando sessionStorage já está vazio", () => {
    sessionStorage.clear();
    expect(() => logoutAdmin()).not.toThrow();
  });
});
