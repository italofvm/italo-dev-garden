import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Request, Response, NextFunction } from "express";
import { authMiddleware } from "../adapters/inbound/http/middlewares/authMiddleware";

// Mockamos firebase-admin/auth e config/firebase para não precisar
// de credenciais reais nos testes. O authMiddleware só nos interessa
// em termos de: sem header → 401, token inválido → 401, token válido → next().

vi.mock("firebase-admin/auth", () => ({
  getAuth: vi.fn().mockReturnValue({
    verifyIdToken: vi.fn(),
  }),
}));

vi.mock("../config/firebase", () => ({
  getDb: vi.fn(),
}));

import { getAuth } from "firebase-admin/auth";

function makeReqRes(authHeader?: string) {
  const req = {
    headers: authHeader ? { authorization: authHeader } : {},
  } as Request;

  const json = vi.fn();
  const status = vi.fn().mockReturnValue({ json });
  const res = { status, json } as unknown as Response;

  const next = vi.fn() as NextFunction;

  return { req, res, next, statusFn: status, jsonFn: json };
}

describe("authMiddleware", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retorna 401 quando não há header Authorization", async () => {
    const { req, res, next, statusFn, jsonFn } = makeReqRes();

    await authMiddleware(req, res, next);

    expect(statusFn).toHaveBeenCalledWith(401);
    expect(jsonFn).toHaveBeenCalledWith({ error: "Token não informado" });
    expect(next).not.toHaveBeenCalled();
  });

  it("retorna 401 quando o header não começa com 'Bearer '", async () => {
    const { req, res, next, statusFn } = makeReqRes("Basic abc123");

    await authMiddleware(req, res, next);

    expect(statusFn).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("retorna 401 quando o token é inválido (verifyIdToken lança)", async () => {
    const verifyIdToken = vi.fn().mockRejectedValue(new Error("token inválido"));
    vi.mocked(getAuth).mockReturnValue({ verifyIdToken } as ReturnType<typeof getAuth>);

    const { req, res, next, statusFn, jsonFn } = makeReqRes("Bearer token-ruim");

    await authMiddleware(req, res, next);

    expect(statusFn).toHaveBeenCalledWith(401);
    expect(jsonFn).toHaveBeenCalledWith({ error: "Token inválido" });
    expect(next).not.toHaveBeenCalled();
  });

  it("chama next() e anexa user quando o token é válido", async () => {
    const fakeDecoded = { uid: "user-123", email: "admin@test.com" };
    const verifyIdToken = vi.fn().mockResolvedValue(fakeDecoded);
    vi.mocked(getAuth).mockReturnValue({ verifyIdToken } as ReturnType<typeof getAuth>);

    const { req, res, next } = makeReqRes("Bearer token-valido");

    await authMiddleware(req as any, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect((req as any).user).toEqual(fakeDecoded);
  });
});
