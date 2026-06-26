import { describe, it, expect } from "vitest";
import { ProjectSchema } from "../core/entities/Project";
import { PostSchema } from "../core/entities/Post";

// Testes de validação das entities com Zod.
// Verificamos que dados válidos passam e dados inválidos produzem erros claros.

describe("ProjectSchema", () => {
  const validProject = {
    title: "Meu Projeto",
    description: "Uma descrição com mais de dez caracteres",
    status: "concluido" as const,
    technologies: ["React", "TypeScript"],
    repositoryUrl: "https://github.com/user/projeto",
  };

  it("valida um projeto correto sem erros", () => {
    const result = ProjectSchema.safeParse(validProject);
    expect(result.success).toBe(true);
  });

  it("falha quando o título tem menos de 3 caracteres", () => {
    const result = ProjectSchema.safeParse({ ...validProject, title: "Ab" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toMatch(/3 caracteres/i);
    }
  });

  it("falha quando a descrição tem menos de 10 caracteres", () => {
    const result = ProjectSchema.safeParse({ ...validProject, description: "Curta" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toMatch(/10 caracteres/i);
    }
  });

  it("falha quando o status não é um dos valores permitidos", () => {
    const result = ProjectSchema.safeParse({ ...validProject, status: "outro" });
    expect(result.success).toBe(false);
  });

  it("falha quando technologies está vazio", () => {
    const result = ProjectSchema.safeParse({ ...validProject, technologies: [] });
    expect(result.success).toBe(false);
  });

  it("falha quando repositoryUrl não é uma URL válida", () => {
    const result = ProjectSchema.safeParse({ ...validProject, repositoryUrl: "nao-e-url" });
    expect(result.success).toBe(false);
  });

  it("aceita deployUrl e imageUrl opcionais quando omitidos", () => {
    const result = ProjectSchema.safeParse(validProject);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.deployUrl).toBeUndefined();
      expect(result.data.imageUrl).toBeUndefined();
    }
  });
});

describe("PostSchema", () => {
  const validPost = {
    title: "Meu Post",
    content: "Conteúdo com mais de dez caracteres para ser válido",
    status: "semente" as const,
    readTime: "3 min",
  };

  it("valida um post correto sem erros", () => {
    const result = PostSchema.safeParse(validPost);
    expect(result.success).toBe(true);
  });

  it("falha quando o título tem menos de 3 caracteres", () => {
    const result = PostSchema.safeParse({ ...validPost, title: "Ab" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toMatch(/3 caracteres/i);
    }
  });

  it("falha quando o conteúdo tem menos de 10 caracteres", () => {
    const result = PostSchema.safeParse({ ...validPost, content: "Curto" });
    expect(result.success).toBe(false);
  });

  it("aceita todos os status válidos", () => {
    for (const status of ["semente", "brotar", "perene"] as const) {
      const result = PostSchema.safeParse({ ...validPost, status });
      expect(result.success).toBe(true);
    }
  });

  it("falha com status inválido", () => {
    const result = PostSchema.safeParse({ ...validPost, status: "rascunho" });
    expect(result.success).toBe(false);
  });
});
